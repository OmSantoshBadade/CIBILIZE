import { CreditCardSpreadsheetCell } from "@/components/credit-cards-spreadsheet-cell";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CREDIT_CARDS } from "@/lib/CREDIT_DATA";
import {
  creditCardsToCsv,
  orderedCreditCardColumns,
  sortCardsByValue,
} from "@/lib/credit-cards-dataset";
import { cn } from "@/lib/utils";
import { useMemo } from "react";

export default function DatasetPage() {
  const cardsJson = useMemo(() => JSON.stringify(CREDIT_CARDS, null, 2), []);
  const sortedCardsForCsv = useMemo(() => sortCardsByValue(CREDIT_CARDS), []);
  const csvColumns = useMemo(() => orderedCreditCardColumns(sortedCardsForCsv), [sortedCardsForCsv]);
  const cardsRawCsv = useMemo(
    () => creditCardsToCsv(sortedCardsForCsv, csvColumns),
    [sortedCardsForCsv, csvColumns],
  );

  return (
    <div className="flex min-h-0 w-full flex-1 flex-col gap-4">
    

      <Tabs defaultValue="csv-table" className="flex min-h-0 flex-1 flex-col gap-2 overflow-hidden">
        <TabsList className="w-fit shrink-0 flex-wrap gap-1">
          <TabsTrigger value="csv-table">CSV table</TabsTrigger>
          <TabsTrigger value="raw-csv">Raw CSV</TabsTrigger>
          <TabsTrigger value="json">JSON</TabsTrigger>
        </TabsList>
        <TabsContent value="csv-table" className="mt-0 flex min-h-0 flex-1 flex-col overflow-hidden">
          <div className="border-border bg-background relative flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg border shadow-sm">
            <div className="min-h-0 flex-1 overflow-auto">
              <table className="border-border w-max min-w-full border-collapse text-sm">
                <thead className="border-border bg-muted sticky top-0 z-20 border-b-2">
                  <tr>
                    {csvColumns.map((col) => (
                      <th
                        key={col}
                        scope="col"
                        className="border-border bg-muted text-foreground border px-3 py-2.5 text-left text-xs font-semibold tracking-wide whitespace-nowrap"
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sortedCardsForCsv.map((card, rowIdx) => {
                    const row = card as unknown as Record<string, unknown>;
                    return (
                      <tr
                        key={rowIdx}
                        className={cn(
                          "bg-background hover:bg-muted/35 transition-colors",
                          rowIdx % 2 === 1 && "bg-muted/25",
                        )}
                      >
                        {csvColumns.map((col) => (
                          <td key={col} className="border-border text-foreground border px-3 py-2 align-top">
                            <div className="max-h-52 min-h-9 min-w-[12rem] max-w-[26rem] overflow-auto py-0.5 font-sans text-[11px] leading-snug">
                              <CreditCardSpreadsheetCell columnKey={col} value={row[col]} />
                            </div>
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="raw-csv" className="mt-0 flex min-h-0 flex-1 flex-col overflow-hidden">
          <pre className="bg-muted min-h-0 flex-1 overflow-auto rounded-md border p-3 font-mono text-xs break-words whitespace-pre-wrap">
            {cardsRawCsv}
          </pre>
        </TabsContent>
        <TabsContent value="json" className="mt-0 flex min-h-0 flex-1 flex-col overflow-hidden">
          <pre className="bg-muted min-h-0 flex-1 overflow-auto rounded-md border p-3 font-mono text-xs break-words whitespace-pre-wrap">
            {cardsJson}
          </pre>
        </TabsContent>
      </Tabs>
    </div>
  );
}
