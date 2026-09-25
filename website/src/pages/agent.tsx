"use client";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { MessageMarkdown } from "@/components/ui/message-markdown";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { mistral } from "@/lib/ai";
import { CREDIT_CARDS, CreditCardTypes } from "@/lib/CREDIT_DATA";
import { cn, SYSTEM_PROMPT } from "@/lib/utils";
import { useAuth } from "@/provider/auth-provider";
import { useMutation } from "@tanstack/react-query";
import { streamText } from "ai";
import { Check, ChevronsUpDownIcon, Copy, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";

interface Message {
  role: "user" | "assistant";
  content: string;
  id: string;
}

export default function Agent() {
  const { user } = useAuth();
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [, setRetryCount] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesRef = useRef<Message[]>([]);
  const params = useSearchParams();
  const data = params[0].get("data");
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedCard, setSelectedCard] = useState<CreditCardTypes | null>(null);
  const parsedData: CreditCardTypes[] = (() => {
    try {
      if (data) {
        const parsed = JSON.parse(data);
        return Array.isArray(parsed) ? (parsed as CreditCardTypes[]) : [];
      }
      if (typeof window !== "undefined") {
        const stored = localStorage.getItem("creditCardResults");
        if (stored) {
          const parsedStored = JSON.parse(stored);
          return Array.isArray(parsedStored) ? (parsedStored as CreditCardTypes[]) : [];
        }
      }
    } catch {
      // ignore parse errors
    }
    return [];
  })();

  // console.log(parsedData);

  // Check if credit card data is available (localStorage or URL param)
  const creditCardData =
    typeof window !== "undefined" ? localStorage.getItem("agentCreditcardRecommedatinoData") : null;
  const individualCreditCardData =
    typeof window !== "undefined" ? localStorage.getItem("individualCreditCardData") : null;
  const hasDataParam =
    typeof window !== "undefined" ? new URLSearchParams(window.location.search).has("data") : false;
  const id = new URLSearchParams(window.location.search).get("id");
  const hasCreditCardData = creditCardData !== null || hasDataParam;
  const hasIndividualCreditCardData = individualCreditCardData !== null && id !== null;

  const filteredCreditCards = search.trim()
    ? CREDIT_CARDS.filter((card) => card.name.toLowerCase().includes(search.trim().toLowerCase()))
    : [];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    messagesRef.current = messages; // Keep ref in sync with state
  }, [messages]);

  useEffect(() => {
    if (id) {
      const found = CREDIT_CARDS.find((c) => String(c.id) === String(id));
      if (found) setSelectedCard(found);
    }
  }, [id]);

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      toast.success("Message copied to clipboard");
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      toast.error("Failed to copy message to clipboard", {
        description: (err as Error).message,
      });
    }
  };

  const generateResponse = useMutation({
    mutationFn: async (input: string) => {
      const maxRetries = 3;
      let lastError: Error | null = null;

      for (let attempt = 0; attempt < maxRetries; attempt++) {
        try {
          // Get latest messages from ref (which is kept in sync with state)
          // onMutate already added the user message and empty assistant message
          const latestMessages = messagesRef.current;

          // Extract fresh data from URL params (as backup, SYSTEM_PROMPT also checks this)
          let currentData: CreditCardTypes[] | null = null;
          if (typeof window !== "undefined") {
            const params = new URLSearchParams(window.location.search);
            const dataParam = params.get("data");
            if (dataParam) {
              try {
                currentData = JSON.parse(dataParam);
              } catch (e) {
                // Ignore parse errors
              }
            }
          }

          // Convert messages to format expected by AI SDK (excluding empty assistant messages)
          // Filter out the last empty assistant message that was just added in onMutate
          const conversationHistory = latestMessages
            .slice(0, -1) // Remove the last empty assistant message
            .filter((msg) => msg.content.trim().length > 0)
            .map((msg) => ({
              role: msg.role as "user" | "assistant",
              content: msg.content,
            }));

          // The user input is already in latestMessages from onMutate, so we have full history
          const messagesWithInput = conversationHistory;

          // console.log("[SYSTEM_PROMPT] Current Data:", currentData || data);

          const { textStream } = streamText({
            // model: gemini("gemini-2.0-flash-exp"),
            model: mistral("mistral-large-latest"),
            messages: messagesWithInput,
            system: SYSTEM_PROMPT(),
            temperature: 0.7,
          });

          let accumulatedResponse = "";
          for await (const chunk of textStream) {
            accumulatedResponse += chunk;
            setMessages((prev) => {
              const newMessages = [...prev];
              if (newMessages.length > 0) {
                newMessages[newMessages.length - 1].content = accumulatedResponse;
              }
              messagesRef.current = newMessages; // Keep ref in sync
              return newMessages;
            });
          }

          // Reset retry count on success
          setRetryCount(0);
          return accumulatedResponse;
        } catch (error) {
          lastError = error as Error;
          console.error(`Attempt ${attempt + 1} failed:`, error);

          // If it's a model not found error, don't retry
          if (error instanceof Error && error.message.includes("not found")) {
            throw new Error(
              "Model configuration error. Please check the setup guide and try using 'gemini-pro' or 'gemini-2.0-flash-exp'",
            );
          }

          // Check if it's a 4xx error (API key or rate limit)
          if (
            error instanceof Error &&
            (error.message.includes("4") || error.message.includes("API"))
          ) {
            // Wait before retrying (exponential backoff)
            await new Promise((resolve) => setTimeout(resolve, Math.pow(2, attempt) * 1000));
          } else {
            // For other errors, don't retry
            break;
          }
        }
      }

      // If all retries failed, throw the last error
      throw new Error(lastError?.message || "Failed to generate response after multiple attempts");
    },
    onMutate: (input: string) => {
      const userId = `user-${Date.now()}`;
      const assistantId = `assistant-${Date.now()}`;
      const newMessages = [
        ...messagesRef.current,
        { role: "user" as const, content: input, id: userId },
        { role: "assistant" as const, content: "", id: assistantId },
      ];
      messagesRef.current = newMessages; // Update ref synchronously
      setMessages(newMessages);
      setInputText("");
    },
    onError: (error: Error) => {
      console.error("Generation error:", error);

      // Remove the empty assistant message
      const updatedMessages = messagesRef.current.slice(0, -1);
      messagesRef.current = updatedMessages;
      setMessages(updatedMessages);

      // Add error message based on error type
      let errorMessage = "I apologize, but I encountered an error processing your request.";

      if (error.message.includes("not found")) {
        errorMessage =
          "Model configuration error. Please check your API setup. Try using model: 'gemini-pro' instead.";
      } else if (error.message.includes("API key")) {
        errorMessage =
          "API key error. Please verify your VITE_GEMINI_API_KEY is correctly set in .env file.";
      } else if (error.message.includes("rate limit")) {
        errorMessage = "Rate limit reached. Please wait a moment and try again.";
      } else if (error.message.includes("4")) {
        errorMessage = "API request failed. Please check your API key and try again.";
      }

      const errorMessages = [
        ...messagesRef.current,
        {
          role: "assistant" as const,
          content: errorMessage + "\n\n" + error.message,
          id: `error-${Date.now()}`,
        },
      ];
      messagesRef.current = errorMessages;
      setMessages(errorMessages);

      toast.error("Error generating response", {
        description: errorMessage,
      });

      setRetryCount((prev) => prev + 1);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || generateResponse.isPending) return;
    generateResponse.mutate(inputText);
  };

  const handleRetry = () => {
    if (messages.length >= 2) {
      const lastUserMessage = messages[messages.length - 2];
      if (lastUserMessage.role === "user") {
        const updatedMessages = messagesRef.current.slice(0, -1); // Remove error message
        messagesRef.current = updatedMessages;
        setMessages(updatedMessages);
        generateResponse.mutate(lastUserMessage.content);
      }
    }
  };

  return (
    <>
      {messages.length === 0 ? (
        <main className="relative mx-auto flex max-w-2xl flex-1 flex-col items-start justify-start px-4 pb-3">
          <div className="my-20 space-y-1">
            <div className="flex w-full flex-col items-start justify-start space-y-1 text-left">
              <h1
                data-testid="app-title"
                className="text-muted-foreground text-left text-3xl font-normal tracking-tighter text-pretty"
              >
                Hello <span className="text-primary font-medium">{user?.firstName || "there"}</span>
                !
              </h1>
              <h1
                data-testid="app-sub-title"
                className="text-muted-foreground text-left text-3xl font-normal tracking-tighter text-pretty"
              >
                Start your journey with Cilibze.
              </h1>
            </div>
          </div>{" "}
          <div className="fixed right-0 bottom-6 left-0 z-[50] mx-auto w-full max-w-2xl bg-transparent px-4 pt-0 pb-0 md:px-0">
            <div className="group bg-card flex flex-col items-center justify-center rounded-2xl">
              <div className="group-focus-within:border-primary/20 relative flex w-full flex-1 flex-col rounded-2xl border transition-all duration-200 ease-in-out">
                <form onSubmit={handleSubmit} className="flex h-full flex-col">
                  <div className="flex-1">
                    <Textarea
                      className={cn(
                        "border-default bg-card text-primary ring-offset-background dark:bg-card relative m-0 box-border flex h-fit w-full resize-none overflow-y-auto rounded-2xl border-0 p-3 text-[0.95rem] transition-all duration-200 outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-50",
                        generateResponse.isPending && "opacity-60",
                      )}
                      placeholder="Type your message…"
                      aria-label="Message input"
                      aria-multiline="true"
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      onKeyDown={(e) => {
                        if (
                          (e.key === "Enter" && !e.shiftKey) ||
                          (e.ctrlKey && e.key === "Enter")
                        ) {
                          e.preventDefault();
                          handleSubmit(e as unknown as React.FormEvent);
                        }
                      }}
                      // disabled={generateResponse.isPending}
                      maxLength={2000}
                      spellCheck={true}
                      autoFocus={false}
                      // Remove min-h-fit/p-0 since using classic sizing
                    />
                  </div>
                  <div className="mt-auto flex items-center justify-between gap-2 p-2">
                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="secondary"
                          size="sm"
                          role="combobox"
                          aria-expanded={open}
                          type="button"
                          className="flex w-fit items-center justify-between"
                        >
                          {selectedCard ? (
                            <div className="flex items-center gap-2">
                              {selectedCard?.image && (
                                <img
                                  src={selectedCard.image}
                                  alt={selectedCard.name}
                                  className="size-5 rounded object-contain"
                                />
                              )}
                              {selectedCard?.name}
                            </div>
                          ) : (
                            "Select Card"
                          )}
                          <ChevronsUpDownIcon className="ml-2 size-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent align="start" className="w-full min-w-64 rounded-lg p-0">
                        <Command>
                          <CommandInput
                            placeholder="Search credit cards..."
                            value={search}
                            onValueChange={setSearch}
                          />
                          <CommandList>
                            <CommandEmpty>No card found.</CommandEmpty>
                            <CommandGroup className="pt-0">
                              {(filteredCreditCards.length > 0
                                ? filteredCreditCards
                                : CREDIT_CARDS
                              ).map((creditcard) => (
                                <CommandItem
                                  key={creditcard.id}
                                  value={creditcard.name}
                                  onSelect={() => {
                                    setSelectedCard(creditcard);
                                    setOpen(false);
                                    const params = new URLSearchParams(window.location.search);
                                    params.set("id", String(creditcard.id));
                                    const newUrl = `${window.location.pathname}?${params.toString()}`;
                                    window.history.pushState({}, "", newUrl);
                                  }}
                                  className="flex items-center justify-between"
                                >
                                  <span className="flex items-center gap-2">
                                    {creditcard.image && (
                                      <img
                                        src={creditcard.image}
                                        alt={creditcard.name}
                                        className="mr-2 size-5 rounded object-contain"
                                      />
                                    )}
                                    {creditcard.name}
                                  </span>
                                  {selectedCard?.id === creditcard.id && (
                                    <Check className="text-primary size-4" />
                                  )}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>

                    <Button
                      type="submit"
                      size="icon"
                      className={cn(
                        "text-background relative isolate flex size-8 items-center justify-center overflow-hidden rounded-full transition-all duration-200 ease-in-out",
                        generateResponse.isPending && "opacity-60",
                      )}
                      disabled={generateResponse.isPending || !inputText.trim()}
                    >
                      {generateResponse.isPending ? (
                        // Simple processing dot as classic UI
                        <span className="bg-primary h-4 w-4 animate-pulse rounded-full" />
                      ) : (
                        // Arrow up classic icon (consider using ArrowUp if already imported)
                        <svg
                          className="size-5"
                          viewBox="0 0 20 20"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2.5}
                        >
                          <path
                            d="M10 16V4M10 4l-4 4M10 4l4 4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </main>
      ) : (
        <main className="relative mx-auto flex max-w-3xl flex-1 flex-col items-center justify-start pb-40 md:px-4">
          {hasCreditCardData || hasIndividualCreditCardData || messages.length > 0 ? (
            <>
              <div
                className={cn(
                  "scrollbar-hide w-full max-w-2xl space-y-4 overflow-hidden overflow-y-auto rounded-2xl backdrop-blur-sm",
                  messages.length > 0 && "h-fit",
                )}
              >
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      "flex w-full",
                      message.role === "user" ? "justify-end" : "justify-start",
                    )}
                  >
                    {message.role === "user" ? (
                      <div
                        className={cn(
                          "prose dark:prose-invert prose-p:whitespace-break-spaces prose-code:m-0 prose-code:whitespace-break-spaces prose-pre:m-0 prose-pre:w-full prose-pre:p-0 w-fit max-w-[80%] gap-1 overflow-auto overflow-x-auto rounded-xl text-[0.9rem] leading-[22px] font-medium text-wrap break-words whitespace-pre-wrap select-text",
                          "bg-secondary text-secondary-foreground ml-auto p-3 px-3 py-1.5",
                        )}
                      >
                        {message.content}
                      </div>
                    ) : message.role === "assistant" ? (
                      <div className="relative my-4 w-full max-w-full">
                        {/* {message.content.includes("error") ||
                      message.content.includes("Error") ||
                      message.content.includes("failed") ? (
                        <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-950">
                          <AlertCircle className="mt-0.5 size-5 flex-shrink-0 text-red-600" />
                          <div className="flex-1">
                            <p className="text-sm whitespace-pre-wrap text-red-800 dark:text-red-200">
                              {message.content}
                            </p>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={handleRetry}
                              className="mt-2"
                            >
                              Retry
                            </Button>
                          </div>
                        </div>
                      ) : ( */}
                        <>
                          <div className="prose dark:prose-invert prose-p:whitespace-break-spaces prose-code:m-0 prose-code:whitespace-break-spaces prose-pre:m-0 prose-pre:w-full prose-pre:p-0 text-secondary-foreground w-fit max-w-[80%] gap-1 overflow-auto overflow-x-auto rounded-xl text-[0.9rem] leading-[22px] font-medium text-wrap break-words whitespace-pre-wrap select-text">
                            <MessageMarkdown>{message.content}</MessageMarkdown>
                          </div>
                          {message.content && (
                            <Button
                              variant="ghost"
                              size="icon"
                              className="absolute top-3 -right-10 h-8 w-8 rounded-lg p-2"
                              onClick={() => copyToClipboard(message.content, message.id)}
                            >
                              {copiedId === message.id ? (
                                <Check className="h-6 w-6" />
                              ) : (
                                <Copy className="h-6 w-6" />
                              )}
                              <span className="sr-only">Copy message</span>
                            </Button>
                          )}
                        </>
                        {/* // )} */}
                      </div>
                    ) : null}
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              <div className="fixed right-0 bottom-[11px] left-0 mx-4 md:bottom-[9px] md:mx-0">
                <div className="bg-background mx-auto w-full max-w-2xl px-0 pt-0 pb-4 md:px-0">
                  <div className="group bg-card z-[199] flex flex-col items-center justify-center rounded-2xl">
                    <div className="group-focus-within:border-primary/20 relative flex w-full flex-1 flex-col rounded-2xl border transition-all duration-200 ease-in-out">
                      <form onSubmit={handleSubmit} className="flex h-full flex-col">
                        <div className="flex-1">
                          <Textarea
                            className={cn(
                              "border-default bg-card text-primary ring-offset-background dark:bg-card relative m-0 box-border flex h-fit w-full resize-none overflow-y-auto rounded-2xl border-0 p-3 text-[0.95rem] transition-all duration-200 outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-50",
                              generateResponse.isPending && "opacity-60",
                            )}
                            placeholder="Type your message…"
                            aria-label="Message input"
                            aria-multiline="true"
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            onKeyDown={(e) => {
                              if (
                                (e.key === "Enter" && !e.shiftKey) ||
                                (e.ctrlKey && e.key === "Enter")
                              ) {
                                e.preventDefault();
                                handleSubmit(e as unknown as React.FormEvent);
                              }
                            }}
                            // disabled={generateResponse.isPending}
                            maxLength={2000}
                            autoFocus={true}
                            // Remove min-h-fit/p-0 since using classic sizing
                          />
                        </div>
                        <div className="mt-auto flex items-center justify-between gap-2 p-2">
                          <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                              <Button
                                variant="secondary"
                                size="sm"
                                role="combobox"
                                aria-expanded={open}
                                type="button"
                                className="flex w-fit items-center justify-between"
                              >
                                {selectedCard ? (
                                  <div className="flex items-center gap-2">
                                    {selectedCard?.image && (
                                      <img
                                        src={selectedCard.image}
                                        alt={selectedCard.name}
                                        className="size-5 rounded object-contain"
                                      />
                                    )}
                                    {selectedCard?.name}
                                  </div>
                                ) : (
                                  "Select Card"
                                )}
                                <ChevronsUpDownIcon className="ml-2 size-4 shrink-0 opacity-50" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent
                              align="start"
                              className="w-full min-w-64 rounded-lg p-0"
                            >
                              <Command>
                                <CommandInput
                                  placeholder="Search credit cards..."
                                  value={search}
                                  onValueChange={setSearch}
                                />
                                <CommandList>
                                  <CommandEmpty>No card found.</CommandEmpty>
                                  <CommandGroup className="pt-0">
                                    {(filteredCreditCards.length > 0
                                      ? filteredCreditCards
                                      : CREDIT_CARDS
                                    ).map((creditcard) => (
                                      <CommandItem
                                        key={creditcard.id}
                                        value={creditcard.name}
                                        onSelect={() => {
                                          setSelectedCard(creditcard);
                                          setOpen(false);
                                          const params = new URLSearchParams(
                                            window.location.search,
                                          );
                                          params.set("id", String(creditcard.id));
                                          const newUrl = `${window.location.pathname}?${params.toString()}`;
                                          window.history.pushState({}, "", newUrl);
                                        }}
                                        className="flex items-center justify-between"
                                      >
                                        <span className="flex items-center gap-2">
                                          {creditcard.image && (
                                            <img
                                              src={creditcard.image}
                                              alt={creditcard.name}
                                              className="mr-2 size-5 rounded object-contain"
                                            />
                                          )}
                                          {creditcard.name}
                                        </span>
                                        {selectedCard?.id === creditcard.id && (
                                          <Check className="text-primary size-4" />
                                        )}
                                      </CommandItem>
                                    ))}
                                  </CommandGroup>
                                </CommandList>
                              </Command>
                            </PopoverContent>
                          </Popover>

                          <Button
                            type="submit"
                            size="icon"
                            className={cn(
                              "text-background relative isolate flex size-8 items-center justify-center overflow-hidden rounded-full transition-all duration-200 ease-in-out",
                              generateResponse.isPending && "opacity-60",
                            )}
                            disabled={generateResponse.isPending || !inputText.trim()}
                          >
                            {generateResponse.isPending ? (
                              // Simple processing dot as classic UI
                              <span className="bg-primary h-4 w-4 animate-pulse rounded-full" />
                            ) : (
                              // Arrow up classic icon (consider using ArrowUp if already imported)
                              <svg
                                className="text-primary size-5"
                                viewBox="0 0 20 20"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2.5}
                              >
                                <path
                                  d="M10 16V4M10 4l-4 4M10 4l4 4"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            )}
                          </Button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>

                {/* <div
                  style={{ height: "100px" }}
                  className="absolute right-0 -bottom-4 left-0 -z-10 bg-gradient-to-t from-background from-90% to-transparent"
                /> */}
              </div>
            </>
          ) : (
            <div className="bg-card/50 mx-auto w-full max-w-3xl rounded-2xl py-8 backdrop-blur-sm">
              <div className="text-center">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2">
                  <Sparkles className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-800">
                    Welcome to Your Financial Assistant
                  </span>
                </div>
                <h2 className="mb-2 text-2xl font-bold">Get Personalized Financial Guidance</h2>
                <p className="text-muted-foreground mb-6">
                  I can help you with CIBIL score improvement, credit cards, investments, savings,
                  loans, and comprehensive financial planning. Ask me anything!
                </p>
                <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                  <Button
                    onClick={() => (window.location.href = "/app/credit-cards")}
                    className="inline-flex items-center gap-2"
                  >
                    <Sparkles className="h-4 w-4" />
                    Get Credit Card Recommendations
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setInputText("How can I improve my CIBIL score?");
                    }}
                    className="inline-flex items-center gap-2"
                  >
                    <Sparkles className="h-4 w-4" />
                    Start Chatting
                  </Button>
                </div>
              </div>
            </div>
          )}
        </main>
      )}
    </>
  );
}
