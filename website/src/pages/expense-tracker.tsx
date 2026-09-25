import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { SpecialCard, SpecialCardContent } from "@/components/ui/special-card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Item, ItemContent, ItemDescription } from "@/components/ui/item";
import {
  Modal,
  ModalContent,
  ModalDescription,
  ModalHeader,
  ModalTitle,
  ModalTrigger,
} from "@/components/ui/modal";
import Typography from "@/components/ui/typography";
import { expenseApi, type Expense, type ExpenseFile } from "@/lib/api";
import { formatPrice } from "@/lib/price";
import { CACHE_PARAMS } from "@/provider/query-provider";
import { File, Info } from "@mynaui/icons-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2, Plus, Trash2, Upload } from "lucide-react";
import React, { useMemo, useState } from "react";
import { Bar, BarChart, CartesianGrid, Pie, PieChart, XAxis } from "recharts";
import { toast } from "sonner";

const ExpenseTracker: React.FC = () => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [file, setFile] = useState<File | null>(null);
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [processingFiles, setProcessingFiles] = useState<Set<string>>(new Set());
  const [isUploading, setIsUploading] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [processResult, setProcessResult] = useState<{
    message?: string;
    totalFound?: number;
    successCount?: number;
    errors?: string[];
  } | null>(null);

  // Category color map based on `badge.tsx`'s vivid selection
  const categories = [
    "Zomato",
    "Swiggy",
    "Zerodha",
    "Food",
    "Travel",
    "Shopping",
    "Bills",
    "Entertainment",
    "Utilities",
    "Other",
    "Health",
    "Insurance",
    "Groceries",
    "Coffee",
    "Gifts",
    "Transport",
    "Dining",
    "Pets",
    "Rent",
    "Education",
    "Fitness",
    "Investments",
    "Savings",
    "Charity",
    "Subscriptions",
  ];

  // Unique vivid colors inspired by badge.tsx
  const CATEGORY_COLORS: Record<string, string> = {
    Zomato: "#ffcbad", // peach
    Swiggy: "#ff7f50", // coral
    Zerodha: "#00fff7", // cyanBright

    Food: "#ffcbad", // peach
    Travel: "#007fff", // azure
    Shopping: "#ff80bf", // magenta
    Bills: "#ffd700", // gold
    Entertainment: "#8f00ff", // violetBright
    Utilities: "#5da9e9", // bluejeans
    Other: "#c1f7c5", // peppermint
    Health: "#80ff72", // algae
    Insurance: "#e0115f", // ruby
    Groceries: "#66b447", // apple
    Coffee: "#af6e4d", // caramel
    Gifts: "#ffc324", // mango
    Transport: "#00f5e0", // tealBright
    Dining: "#fa8072", // salmon
    Pets: "#dda0dd", // plum
    Rent: "#53565a", // graphite
    Education: "#a2a2d0", // bluebell
    Fitness: "#00ff7f", // spring
    Investments: "#b2ffff", // celeste
    Savings: "#e6e6fa", // lavender
    Charity: "#dc143c", // crimson
    Subscriptions: "#b87333", // copper
  };

  const chartConfig: ChartConfig = {
    amount: {
      label: "Amount",
      color: "hsl(var(--primary))",
    },
    ...Object.fromEntries(
      categories.map((cat) => [
        cat,
        {
          label: cat,
          color: CATEGORY_COLORS[cat] || "#dadada", // fallback to marble (grayish)
        },
      ]),
    ),
  };
  // Queries
  const {
    data: expenses = [],
    isLoading: isExpensesLoading,
    isFetching: isExpensesFetching,
  } = useQuery({
    queryKey: ["expenses", { page: 1, limit: 50 }],
    queryFn: async () => {
      const res = await expenseApi.getAll({ page: 1, limit: 50 });
      return res.expenses;
    },
    staleTime: CACHE_PARAMS.staleTime,
    gcTime: CACHE_PARAMS.gcTime,
  });

  const {
    data: stats,
    isLoading: isStatsLoading,
    isFetching: isStatsFetching,
  } = useQuery({
    queryKey: ["expense-stats"],
    queryFn: () => expenseApi.getStats(),
    staleTime: CACHE_PARAMS.staleTime,
    gcTime: CACHE_PARAMS.gcTime,
  });

  const { data: expenseFiles = [] } = useQuery({
    queryKey: ["expense-files", { limit: 10 }],
    queryFn: async () => {
      const res = await expenseApi.getFiles({ limit: 10 });
      return res.files;
    },
    staleTime: CACHE_PARAMS.staleTime,
    gcTime: CACHE_PARAMS.gcTime,
  });

  // Derived chart data from stats for efficiency
  const chartData = useMemo(
    () =>
      (stats?.byCategory || []).map((c) => ({
        category: c.category,
        amount: Number(c.total_amount),
        fill: `var(--color-${c.category})`,
      })),
    [stats?.byCategory],
  );

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description || !amount) {
      toast.error("Please fill in all fields");
      return;
    }
    try {
      setIsSubmitting(true);
      const newExpense = {
        description,
        amount: parseFloat(amount),
        category,
        date: new Date().toISOString().slice(0, 10),
      };
      await addExpenseMutation.mutateAsync(newExpense);
      setDescription("");
      setAmount("");
      setCategory("Food");
      setIsAddOpen(false);
    } catch {
      // handled by mutation
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteExpenseMutation.mutateAsync(id);
    } catch {
      // handled by mutation
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      toast.error("Please select a file to upload");
      return;
    }

    try {
      setIsUploading(true);
      setUploadProgress(0);
      setProcessResult(null);

      // Simulate progress for better UX
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => Math.min(prev + 10, 90));
      }, 200);

      const response = await expenseApi.uploadFile(file);

      clearInterval(progressInterval);
      setUploadProgress(100);

      toast.success("File uploaded successfully! Processing...");
      await processFileMutation.mutateAsync(response.fileId);
      setFile(null);
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("File upload failed");
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  // Mutations
  const addExpenseMutation = useMutation({
    mutationFn: (newExpense: {
      description: string;
      amount: number;
      category: string;
      date: string;
    }) => expenseApi.create(newExpense),
    onSuccess: (data) => {
      queryClient.setQueryData<Expense[]>(["expenses", { page: 1, limit: 50 }], (old) =>
        old ? [data.expense, ...old] : [data.expense],
      );
      queryClient.invalidateQueries({ queryKey: ["expense-stats"] });
      toast.success("Expense added successfully");
    },
    onError: (error: unknown) => {
      console.error("Add expense error:", error);
      toast.error("Failed to add expense");
    },
  });

  const deleteExpenseMutation = useMutation({
    mutationFn: (id: number) => expenseApi.delete(id),
    onMutate: async (id: number) => {
      await queryClient.cancelQueries({ queryKey: ["expenses", { page: 1, limit: 50 }] });
      const previous = queryClient.getQueryData<Expense[]>(["expenses", { page: 1, limit: 50 }]);
      queryClient.setQueryData<Expense[]>(["expenses", { page: 1, limit: 50 }], (old) =>
        (old || []).filter((e) => e.id !== id),
      );
      return { previous };
    },
    onError: (_err, _id, context) => {
      if (context?.previous) {
        queryClient.setQueryData(["expenses", { page: 1, limit: 50 }], context.previous);
      }
      toast.error("Failed to delete expense");
    },
    onSuccess: () => {
      toast.success("Expense deleted successfully");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
      queryClient.invalidateQueries({ queryKey: ["expense-stats"] });
    },
  });

  const processFileMutation = useMutation({
    mutationFn: (fileId: string) => expenseApi.processFile(fileId),
    onMutate: (fileId: string) => {
      setProcessingFiles((prev) => new Set(prev).add(fileId));
    },
    onSuccess: (response) => {
      setProcessResult(response as typeof processResult extends infer T ? any : any);
      if (response.totalFound === 0) {
        toast.warning(
          "No expenses found in this document. Please ensure it contains expense transactions with clear amounts and dates.",
          { duration: 6000 },
        );
      } else if (response.successCount === 0) {
        toast.error(
          `Found ${response.totalFound} transactions but couldn't process any. Please check the document format.`,
          { duration: 6000 },
        );
      } else if (response.successCount < response.totalFound) {
        toast.success(
          `Processing complete! Successfully processed ${response.successCount} out of ${response.totalFound} transactions.`,
          { duration: 5000 },
        );
        if (response.errors && response.errors.length > 0) {
          toast.info(
            `Some transactions couldn't be processed: ${response.errors.slice(0, 2).join(", ")}${
              response.errors.length > 2 ? "..." : ""
            }`,
            { duration: 6000 },
          );
        }
      } else {
        toast.success(
          `Processing complete! Successfully processed all ${response.successCount} transactions.`,
          { duration: 4000 },
        );
      }

      if (response.processingNote) {
        if (response.processingNote.includes("fallback")) {
          toast.info("AI processing failed, used backup extraction method.", { duration: 5000 });
        } else {
          toast.info(response.processingNote, { duration: 5000 });
        }
      }

      queryClient.invalidateQueries({ queryKey: ["expenses"] });
      queryClient.invalidateQueries({ queryKey: ["expense-stats"] });
      queryClient.invalidateQueries({ queryKey: ["expense-files"] });
    },
    onError: (error: unknown) => {
      console.error("Processing error:", error);
      toast.error("File processing failed. Please try again or contact support.");
    },
    onSettled: (_data, _err, fileId) => {
      setProcessingFiles((prev) => {
        const newSet = new Set(prev);
        if (fileId) newSet.delete(fileId);
        return newSet;
      });
    },
  });

  const deleteFileMutation = useMutation({
    mutationFn: (fileId: string) => expenseApi.deleteFile(fileId),
    onMutate: async (fileId: string) => {
      await queryClient.cancelQueries({ queryKey: ["expense-files"] });
      const previous = queryClient.getQueryData<ExpenseFile[]>(["expense-files", { limit: 10 }]);
      queryClient.setQueryData<ExpenseFile[]>(["expense-files", { limit: 10 }], (old) =>
        (old || []).filter((f) => f.id !== fileId),
      );
      return { previous };
    },
    onError: (_err, _fileId, context) => {
      if (context?.previous) {
        queryClient.setQueryData(["expense-files", { limit: 10 }], context.previous);
      }
      toast.error("Failed to delete file");
    },
    onSuccess: () => {
      toast.success("File deleted successfully");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["expense-files"] });
    },
  });

  const handleDeleteFile = async (fileId: string) => {
    try {
      await deleteFileMutation.mutateAsync(fileId);
    } catch {
      // handled by mutation
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex w-full flex-col items-start justify-start gap-6 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <Typography.Heading variant="2xl">Expense Tracker</Typography.Heading>
          <Typography.SubHeading className="text-muted-foreground">
            Track and analyze your expenses with AI-powered insights
          </Typography.SubHeading>
        </div>

        <div className="flex w-full items-center gap-2 md:w-fit">
          <Modal open={isAddOpen} onOpenChange={setIsAddOpen}>
            <ModalTrigger>
              <Button size="sm" className="w-full sm:w-auto">
                <Plus /> Add Expense
              </Button>
            </ModalTrigger>
            <ModalContent>
              <ModalHeader>
                <ModalTitle>Add New Expense</ModalTitle>
                <ModalDescription>Manually add a transaction</ModalDescription>
              </ModalHeader>
              <div className="space-y-4">
                <form onSubmit={handleAdd} className="space-y-4">
                  <div className="space-y-2">
                    <Typography.Label variant="sm">Description</Typography.Label>
                    <Input
                      id="expense-description"
                      placeholder="Description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      disabled={isSubmitting}
                    />
                  </div>
                  <div className="space-y-2">
                    <Typography.Label variant="sm">Amount</Typography.Label>
                    <Input
                      id="expense-amount"
                      placeholder="Amount"
                      type="number"
                      step="0.01"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      disabled={isSubmitting}
                    />
                  </div>
                  <div className="space-y-2">
                    <Typography.Label variant="sm">Category</Typography.Label>
                    <Select value={category} onValueChange={setCategory} disabled={isSubmitting}>
                      <SelectTrigger id="expense-category">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat} value={cat}>
                            {cat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Button type="submit" disabled={isSubmitting} className="w-full">
                    {isSubmitting ? <Loader2 className="animate-spin" /> : <Plus />}
                    {isSubmitting ? "Adding..." : "Add Expense"}
                  </Button>
                </form>
              </div>
            </ModalContent>
          </Modal>

          <Modal open={isUploadOpen} onOpenChange={setIsUploadOpen}>
            <ModalTrigger>
              <Button variant="secondary" size="sm" className="w-full sm:w-auto">
                <Upload /> AI Upload
              </Button>
            </ModalTrigger>
            <ModalContent>
              <ModalHeader>
                <ModalTitle>AI Document Upload</ModalTitle>
                <ModalDescription>
                  Upload your statements or receipts for AI processing
                </ModalDescription>
              </ModalHeader>
              <div className="space-y-4">
                <form onSubmit={handleUpload} className="space-y-4">
                  <label
                    htmlFor="ai-upload-input"
                    className={`border-primary/5 hover:border-primary/20 focus-visible:ring-ring relative flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed px-4 py-6 text-center transition-colors outline-none focus-visible:ring-2 ${isUploading ? "pointer-events-none opacity-70" : ""}`}
                    tabIndex={0}
                  >
                    <input
                      id="ai-upload-input"
                      type="file"
                      accept=".pdf,.csv,.xlsx,.xls,.jpg,.jpeg,.png,.doc,.docx"
                      onChange={(e) => setFile(e.target.files?.[0] || null)}
                      className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                      disabled={isUploading}
                      tabIndex={-1}
                    />
                    <div
                      className="bg-background mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border"
                      aria-hidden="true"
                    >
                      <File className="size-4 opacity-60" />
                    </div>
                    <p className="mb-1.5 text-sm font-medium">
                      {file ? (
                        <span className="inline-block max-w-xs truncate">{file.name}</span>
                      ) : (
                        <>Drop your file here or click to browse</>
                      )}
                    </p>
                  </label>
                  {isUploading && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Uploading...</span>
                        <span>{uploadProgress}%</span>
                      </div>
                      <Progress value={uploadProgress} className="w-full" />
                    </div>
                  )}

                  {processResult && (
                    <div className="space-y-2">
                      <Item
                        variant={
                          processResult.message === "File processed but no expenses found"
                            ? "danger"
                            : "success"
                        }
                      >
                        <ItemContent>
                          <ItemDescription className="text-primary">
                            {processResult.message ||
                              (typeof processResult.successCount === "number" &&
                              typeof processResult.totalFound === "number"
                                ? `Processed ${processResult.successCount} of ${processResult.totalFound} transactions.`
                                : "Processing complete.")}
                          </ItemDescription>
                        </ItemContent>
                      </Item>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <HoverCard>
                      <HoverCardTrigger>
                        <Button size="icon" variant="secondary">
                          <Info />
                        </Button>
                      </HoverCardTrigger>
                      <HoverCardContent side="top" align="start">
                        <div className="text-muted-foreground space-y-2 text-xs">
                          <p>
                            <strong>Supported formats:</strong> PDF bank statements, CSV/Excel
                            transaction files, receipt images (JPG, PNG), Word documents
                          </p>
                          <p>
                            <strong>Currency support:</strong> INR (₹), USD ($), EUR (€)
                          </p>
                          <p>
                            <strong>Best results:</strong> Clear statements with dates, amounts, and
                            merchants
                          </p>
                        </div>
                      </HoverCardContent>
                    </HoverCard>
                    <Button
                      type="submit"
                      disabled={!file || isUploading}
                      className="ml-auto w-fit justify-end"
                      size="sm"
                    >
                      {isUploading ? "Uploading..." : "Upload"}
                    </Button>
                  </div>
                </form>
              </div>
            </ModalContent>
          </Modal>
        </div>
      </div>

      {isStatsLoading ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <SpecialCard className="cursor-default">
            <SpecialCardContent className="cursor-default space-y-6 px-0">
              <Typography.Label className="px-0">Total Expenses</Typography.Label>
              <Skeleton className="h-10 w-28" />
            </SpecialCardContent>
          </SpecialCard>
          <SpecialCard className="cursor-default">
            <SpecialCardContent className="cursor-default space-y-6 px-0">
              <Typography.Label className="px-0">Total Amount</Typography.Label>
              <Skeleton className="h-10 w-28" />
            </SpecialCardContent>
          </SpecialCard>
          <SpecialCard className="cursor-default">
            <SpecialCardContent className="cursor-default space-y-6 px-0">
              <Typography.Label className="px-0">Average Amount</Typography.Label>
              <Skeleton className="h-10 w-32" />
            </SpecialCardContent>
          </SpecialCard>
        </div>
      ) : (
        stats && (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <SpecialCard className="cursor-default">
              <SpecialCardContent className="cursor-default space-y-6 px-0">
                <Typography.Label className="px-0">Total Expenses</Typography.Label>
                <Typography.Heading variant="4xl">
                  {stats.summary.total_expenses || 0}
                </Typography.Heading>
              </SpecialCardContent>
            </SpecialCard>
            <SpecialCard className="cursor-default">
              <SpecialCardContent className="cursor-default space-y-6 px-0">
                <Typography.Label className="px-0">Total Amount</Typography.Label>
                <Typography.Heading variant="4xl">
                  {formatPrice(stats.summary.total_amount || 0)}
                </Typography.Heading>
              </SpecialCardContent>
            </SpecialCard>
            <SpecialCard className="cursor-default">
              <SpecialCardContent className="cursor-default space-y-6 px-0">
                <Typography.Label className="px-0">Average Amount</Typography.Label>
                <Typography.Heading variant="4xl">
                  {formatPrice(stats.summary.average_amount || 0)}
                </Typography.Heading>
              </SpecialCardContent>
            </SpecialCard>
          </div>
        )
      )}

      {isStatsLoading ? (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <SpecialCard>
            <SpecialCardContent className="cursor-default space-y-4 px-0">
              <Typography.Heading variant="lg">Expense Distribution</Typography.Heading>
              <div className="flex h-[300px] items-center justify-center">
                <Skeleton className="h-full max-h-[250px] w-full max-w-[250px] rounded-full" />
              </div>
            </SpecialCardContent>
          </SpecialCard>
          <SpecialCard>
            <SpecialCardContent className="cursor-default space-y-4 px-0">
              <Typography.Heading variant="lg">Category Breakdown</Typography.Heading>
              <div className="flex h-[300px] items-center justify-center">
                <Skeleton className="h-48 w-full rounded-md" />
              </div>
            </SpecialCardContent>
          </SpecialCard>
        </div>
      ) : (
        chartData.length > 0 && (
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <SpecialCard>
              <SpecialCardContent className="cursor-default space-y-4 px-0">
                <Typography.Heading variant="lg">Expense Distribution</Typography.Heading>
                <ChartContainer
                  config={chartConfig}
                  className="mx-auto aspect-square max-h-[300px]"
                >
                  <PieChart>
                    <ChartTooltip
                      cursor={false}
                      content={
                        <ChartTooltipContent
                          hideLabel
                          formatter={(value) => [formatPrice(Number(value)), "Amount"]}
                        />
                      }
                    />
                    <Pie
                      data={chartData}
                      dataKey="amount"
                      nameKey="category"
                      label={({ category, amount }) => `${category}: ${formatPrice(amount)}`}
                      labelLine={false}
                    />
                  </PieChart>
                </ChartContainer>
              </SpecialCardContent>
            </SpecialCard>

            <SpecialCard>
              <SpecialCardContent className="cursor-default space-y-4 px-0">
                <Typography.Heading variant="lg">Category Breakdown</Typography.Heading>
                <ChartContainer config={chartConfig}>
                  <BarChart accessibilityLayer data={chartData}>
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="category"
                      tickLine={false}
                      tickMargin={10}
                      axisLine={false}
                      tickFormatter={(value) => value.slice(0, 8)}
                    />
                    <ChartTooltip
                      cursor={false}
                      content={
                        <ChartTooltipContent
                          hideLabel
                          formatter={(value) => [formatPrice(Number(value)), "Amount"]}
                        />
                      }
                    />
                    <Bar dataKey="amount" fill="var(--color-amount)" radius={8} />
                  </BarChart>
                </ChartContainer>
              </SpecialCardContent>
            </SpecialCard>
          </div>
        )
      )}

      <SpecialCard>
        <SpecialCardContent className="cursor-default space-y-4 px-0">
          <Typography.Heading variant="lg">Recent Expenses</Typography.Heading>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Description</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isExpensesLoading && (
                <TableRow>
                  <TableCell colSpan={5} className="text-muted-foreground text-center">
                    Loading...
                  </TableCell>
                </TableRow>
              )}
              {!isExpensesLoading && expenses.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-muted-foreground text-center">
                    No expenses found. Add your first expense above!
                  </TableCell>
                </TableRow>
              ) : (
                expenses.map((expense) => (
                  <TableRow key={expense.id}>
                    <TableCell className="font-medium">{expense.description}</TableCell>
                    <TableCell>{formatPrice(Number(expense.amount))}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{expense.category}</Badge>
                    </TableCell>
                    <TableCell>{new Date(expense.date).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(expense.id)}
                        disabled={isSubmitting || isExpensesFetching}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </SpecialCardContent>
      </SpecialCard>
    </div>
  );
};

export default ExpenseTracker;
