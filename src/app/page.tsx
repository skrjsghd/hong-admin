import { getTableData } from "@/actions/query";
import { SideTableListMenu } from "@/components/side-table-list-menu";
import { SideUserProfile } from "@/components/side-user-profile";
import { TableHeaderMenu } from "@/components/table-header-menu";
import { TypedTableCell } from "@/components/typed-table-cell";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Checkbox,
} from "@/components/ui";

export default async function Page({
  searchParams,
}: {
  searchParams: { t: string };
}) {
  const currentTableName = searchParams.t;
  const { value } = await getTableData(currentTableName);
  const { fields, rows } = value;

  return (
    <div className="flex h-svh">
      <aside className="flex min-w-[250px] flex-col divide-y border-r">
        <SideTableListMenu currentTableName={currentTableName} />
        <SideUserProfile />
      </aside>
      <main className="flex w-full flex-col overflow-hidden">
        <TableHeaderMenu />
        <div className="flex-1 p-4">
          <Table className="overflow-x-scroll">
            <TableHeader>
              <TableRow>
                <TableCell className="w-fit">
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
                  <TableRow key={i}>
                    <TableCell className="w-fit">
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
