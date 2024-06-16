import { getTableData } from "@/actions/query";
import { TypedTableCell } from "@/components/_table/typed-table-cell";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Checkbox,
} from "@/components/ui";

export default async function TableMainPage({
  params,
}: {
  params: { name: string };
}) {
  const tableData = await getTableData(params.name);

  return (
    <div className="flex-1 pt-4">
      <Table className="overflow-x-scroll">
        <TableHeader>
          <TableRow>
            <TableCell className="sticky left-0 w-fit bg-gradient-to-r from-background via-background to-transparent">
              <Checkbox />
            </TableCell>
            {tableData.fields.map(({ name }) => {
              return <TableHead key={name}>{name}</TableHead>;
            })}
          </TableRow>
        </TableHeader>
        <TableBody>
          {tableData.rows.map((row, i) => {
            return (
              <TableRow key={i} className="cursor-pointer hover:bg-muted">
                <TableCell className="sticky left-0 w-fit bg-gradient-to-r from-background via-background via-70% to-transparent">
                  <Checkbox />
                </TableCell>
                {tableData.fields.map(({ name }) => {
                  return <TypedTableCell key={name} data={row[name]} />;
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
