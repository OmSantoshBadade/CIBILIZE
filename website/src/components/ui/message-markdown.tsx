import { cn } from "@/lib/utils";
import Markdown from "markdown-to-jsx";
import React from "react";

function isImageUrl(text?: string): text is string {
  if (!text) return false;
  const url = text.trim();
  // Accept common image extensions or data URLs
  const extMatch = /(https?:\/\/\S+\.(?:png|jpe?g|webp)(\?\S*)?$)/i;
  const dataUrlMatch = /^data:image\/(png|jpeg|jpg|webp);base64,[A-Za-z0-9+/=]+$/i;
  return extMatch.test(url) || dataUrlMatch.test(url);
}

function extractText(node: React.ReactNode): string {
  if (node == null) return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(extractText).join("");
  if (React.isValidElement(node))
    return extractText((node as React.ReactElement<any>).props?.children);
  return "";
}

const MARKDOWN_OPTIONS = {
  overrides: {
    h1: {
      component: ({ children }: { children: React.ReactNode }) => (
        <h1 className="scroll-m-20 text-xl font-bold tracking-tight text-balance [&:not(:first-child)]:mt-6">
          {children}
        </h1>
      ),
    },
    h2: {
      component: ({ children }: { children: React.ReactNode }) => (
        <h2 className="scroll-m-20 pb-2 text-lg font-medium tracking-tight first:mt-0 [&:not(:first-child)]:mt-5">
          {children}
        </h2>
      ),
    },
    h3: {
      component: ({ children }: { children: React.ReactNode }) => (
        <h3 className="scroll-m-20 text-base font-medium tracking-tight [&:not(:first-child)]:mt-4">
          {children}
        </h3>
      ),
    },
    h4: {
      component: ({ children }: { children: React.ReactNode }) => (
        <h4 className="scroll-m-20 text-[0.95rem] font-medium tracking-tight [&:not(:first-child)]:mt-4">
          {children}
        </h4>
      ),
    },
    h5: {
      component: ({ children }: { children: React.ReactNode }) => (
        <h5 className="scroll-m-20 text-[0.95rem] font-medium tracking-tight [&:not(:first-child)]:mt-4">
          {children}
        </h5>
      ),
    },
    h6: {
      component: ({ children }: { children: React.ReactNode }) => (
        <h6 className="scroll-m-20 text-xs font-medium tracking-tight [&:not(:first-child)]:mt-4">
          {children}
        </h6>
      ),
    },
    p: {
      component: ({ children }: { children: React.ReactNode }) => (
        <p className="text-primary/85 text-[0.95rem] leading-6 last:mb-4 [&:not(:first-child)]:mt-4">
          {children}
        </p>
      ),
    },
    span: {
      component: ({ children }: { children: React.ReactNode }) => (
        <p className="text-primary/85 text-[0.95rem] leading-6 last:mb-4 [&:not(:first-child)]:mt-4">
          {children}
        </p>
      ),
    },
    ul: {
      component: ({ children }: { children: React.ReactNode }) => (
        <ul className="[&>li]:text-primary/85 ml-8 list-disc text-[0.95rem] [&>li]:mt-1">
          {children}
        </ul>
      ),
    },
    ol: {
      component: ({ children }: { children: React.ReactNode }) => (
        <ol className="[&>li]:text-primary/85 ml-8 list-decimal text-[0.95rem] [&>li]:mt-1">
          {children}
        </ol>
      ),
    },
    li: {
      component: ({ children }: { children: React.ReactNode }) => (
        <li className="text-[0.95rem]">{children}</li>
      ),
    },
    a: {
      component: ({ children, href }: { children: React.ReactNode; href?: string }) => {
        const textContent = extractText(children).trim();
        if (href && textContent && textContent === href && isImageUrl(href)) {
          return (
            <img
              src={href}
              alt="markdown image"
              className="border-border h-auto max-w-full rounded-lg border"
            />
          );
        }
        return (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="border-primary/95 text-primary/85 hover:border-primary hover:text-primary/85 border-spacing-2 border-b text-[0.95rem] font-normal transition-colors"
          >
            {children}
          </a>
        );
      },
    },
    blockquote: {
      component: ({ children }: { children: React.ReactNode }) => (
        <blockquote className="border-l-2 pl-6 italic [&:not(:first-child)]:my-5">
          {children}
        </blockquote>
      ),
    },
    table: {
      component: ({ children }: { children: React.ReactNode }) => (
        <div className="mt-6 w-full overflow-y-auto">
          <table className="w-full">{children}</table>
        </div>
      ),
    },
    th: {
      component: ({ children, className }: { children: React.ReactNode; className?: string }) => (
        <th
          className={cn(
            "border px-4 py-2 text-left text-[0.95rem] font-bold [&[align=center]]:text-center [&[align=right]]:text-right",
            "text-[0.95rem]",
            className,
          )}
        >
          {children}
        </th>
      ),
    },
    td: {
      component: ({ children, className }: { children: React.ReactNode; className?: string }) => (
        <td
          className={cn(
            "border px-4 py-2 text-left text-[0.95rem] [&[align=center]]:text-center [&[align=right]]:text-right",
            "text-[0.95rem]",
            className,
          )}
        >
          {children}
        </td>
      ),
    },
    pre: {
      component: ({ children }: { children: React.ReactNode }) => {
        // If a fenced code block contains only an image URL, render it as an image instead of a code block
        const onlyChild = Array.isArray(children) ? children[0] : children;
        if (React.isValidElement(onlyChild)) {
          const childProps: any = (onlyChild as React.ReactElement<any>).props;
          const childText: string | undefined =
            typeof childProps?.children === "string" ? childProps.children : undefined;
          if (isImageUrl(childText)) {
            return (
              <img
                src={childText!.trim()}
                alt="markdown image"
                className="h-auto max-w-full rounded-lg"
              />
            );
          }
        }
        return (
          <pre className="bg-input/40 mt-2 overflow-x-auto rounded-sm p-4 text-[0.95rem] [&>code]:mt-6 [&>code]:border-none [&>code]:bg-transparent [&>code]:font-mono [&>code]:text-[0.95rem] [&>code]:font-normal">
            {children}
          </pre>
        );
      },
    },
    code: {
      component: ({ children }: { children: React.ReactNode }) => {
        // If inline code contains only an image URL, render an image instead
        const text = typeof children === "string" ? children.trim() : undefined;
        if (isImageUrl(text)) {
          return <img src={text} alt="markdown image" className="h-auto max-w-full rounded-lg" />;
        }
        return (
          <code className="border-input bg-muted relative rounded-sm border px-[0.3rem] py-[0.2rem] font-mono text-xs font-semibold">
            {children}
          </code>
        );
      },
    },
    img: {
      component: ({ src, alt }: { src?: string; alt?: string }) => (
        <img src={src} alt={alt} className="h-auto max-w-full rounded-lg" />
      ),
    },
    hr: {
      component: () => <hr className="border-primary/20 border-t [&:not(:first-child)]:my-4" />,
    },
    strong: {
      component: ({ children }: { children: React.ReactNode }) => (
        <strong className="font-semibold">{children}</strong>
      ),
    },
    em: {
      component: ({ children }: { children: React.ReactNode }) => (
        <em className="italic">{children}</em>
      ),
    },
  },
};

export const MessageMarkdown = ({ children }: { children: string }) => {
  return (
    <div className="message">
      <Markdown options={MARKDOWN_OPTIONS}>{children}</Markdown>
    </div>
  );
};
