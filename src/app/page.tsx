import { getTableListAction } from "@/actions/query";
import { SideTableListMenu } from "@/components/side-table-list-menu";
import { TableHeaderMenu } from "@/components/table-header-menu";
import {
  Table,
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Icon,
} from "@/components/ui";

export default async function Page({
  searchParams,
}: {
  searchParams: { t: string };
}) {
  const tableList = await getTableListAction();
  const currentTableName = searchParams.t;

  return (
    <div className="flex h-svh">
      <SideTableListMenu
        tableList={tableList.map(({ table_name }) => table_name)}
        currentTableName={currentTableName}
      />
      <main className="flex w-full flex-col">
        <TableHeaderMenu />
        <div className="flex-1 px-6 pt-10">
          <Table>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Invoice</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Method</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">INV001</TableCell>
                <TableCell>Paid</TableCell>
                <TableCell>Credit Card</TableCell>
                <TableCell className="text-right">$250.00</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <footer className="flex items-center justify-between px-10 py-6">
          <span className="font-medium text-muted-foreground">
            1,231,112 Rows
          </span>
          <div className="flex items-center gap-4">
            <Icon name="ChevronLeftIcon" className="size-4" />
            <span className="text-sm text-muted-foreground">
              1 of 124 pages
            </span>
            <Icon name="ChevronRightIcon" className="size-4" />
          </div>
        </footer>
      </main>
    </div>
  );
}
