import { getTableColumnInformation, getTableData } from "@/actions/query";
import { NewRowButton } from "@/components/new-row-button";
import { SideTableListMenu } from "@/components/side-table-list-menu";
import { SideUserProfile } from "@/components/side-user-profile";
import {
  TableHeaderMenu,
  TableHeaderMenuLeading,
  TableHeaderMenuTitle,
  TableHeaderMenuTrailing,
} from "@/components/table-header-menu";
import { TypedTableCell } from "@/components/typed-table-cell";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Checkbox,
  Input,
  Button,
  Icon,
} from "@/components/ui";
import Link from "next/link";

export default async function Page({
  searchParams,
}: {
  searchParams: { t: string };
}) {
  const currentTableName = searchParams.t;
  const { value } = await getTableData(currentTableName);
  const { value: columnInformation } =
    await getTableColumnInformation(currentTableName);
  const { fields, rows } = value;

  return (
    <div className="flex h-svh">
      <aside className="flex min-w-[250px] flex-col divide-y border-r">
        <SideTableListMenu currentTableName={currentTableName} />
        <SideUserProfile />
      </aside>
      <main className="flex w-full flex-col overflow-hidden">
        {/* {JSON.stringify(columnInformation)} */}
        <TableHeaderMenu>
          <TableHeaderMenuLeading>
            <Button size="sm" variant="outline">
              <Icon name="Bars3BottomLeftIcon" className="size-4" />
              Sort
            </Button>
            <Input className="h-9 w-[200px]" placeholder="search..." />
          </TableHeaderMenuLeading>
          <TableHeaderMenuTitle>
            <span className="text-muted-foreground">dbname / </span>
            <span className="font-medium">{currentTableName}</span>
          </TableHeaderMenuTitle>
          <TableHeaderMenuTrailing>
            <span className="text-sm text-muted-foreground">
              1 row(s) selected
            </span>
            <Button size="sm" variant="secondary">
              <Icon name="TrashIcon" className="size-4" variant="outline" />
              Delete
            </Button>
            <NewRowButton columnInformation={columnInformation} />
          </TableHeaderMenuTrailing>
        </TableHeaderMenu>
        <div className="flex-1 pt-4">
          <Table className="overflow-x-scroll">
            <TableHeader>
              <TableRow>
                <TableCell className="sticky left-0 w-fit bg-gradient-to-r from-background via-background to-transparent">
                  <Checkbox />
                </TableCell>
                {fields.map(({ name }) => {
                  return <TableHead key={name}>{name}</TableHead>;
                })}
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((row, i) => {
                return (
                  <TableRow key={i} className="cursor-pointer hover:bg-muted">
                    <TableCell className="sticky left-0 w-fit bg-gradient-to-r from-background via-background via-70% to-transparent">
                      <Checkbox />
                    </TableCell>
                    {fields.map(({ name }) => {
                      return <TypedTableCell key={name} data={row[name]} />;
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </main>
    </div>
  );
}
