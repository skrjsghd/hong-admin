"use client";

import { GetTableDataReturn, deleteRow } from "@/actions/query";
import {
  Button,
  Checkbox,
  Icon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui";
import { TypedTableCell } from "./typed-table-cell";
import { useState } from "react";
import { toast } from "sonner";
import { ColumnInformation } from "@/lib/types";

type MainTableProps = {
  tableName: string;
  columnInformation: ColumnInformation[];
  data: GetTableDataReturn;
};
function MainTable({ tableName, columnInformation, data }: MainTableProps) {
  const { fields, rows } = data;
  const [selectedRows, setSelectedRows] = useState<Record<string, string>[]>(
    [],
  );

  const isRowSelected = (row: Record<string, string>) => {
    return selectedRows.some((r) => r === row);
  };
  const isAllSelected = () => {
    if (rows.length === 0) return false;
    return selectedRows.length === rows.length;
  };
  const handleSelectRow = (row: Record<string, string>) => {
    setSelectedRows((prev) => {
      // Check if row is already selected
      const index = prev.findIndex((r) => r === row);
      if (index > -1) {
        return prev.filter((r) => r !== row);
      }
      return [...prev, row];
    });
  };
  const handleSelectAll = () => {
    setSelectedRows((prev) => {
      if (prev.length === rows.length) {
        return [];
      }
      return rows;
    });
  };
  const deleteSelectedRows = async () => {
    try {
      if (confirm("Are you sure you want to delete these rows?")) {
        // Delete selected rows
        await deleteRow(tableName, selectedRows);
        setSelectedRows([]);
        toast.success("Rows deleted successfully.");
      }
    } catch (e) {
      toast.error("Failed to delete rows.");
    }
  };

  return (
    <div className="flex-1">
      <div className="h-10 px-4">
        {/* {JSON.stringify(columnInformation)} */}
        {selectedRows.length > 0 && (
          <div className="flex h-full items-center gap-4">
            <span className="text-sm text-muted-foreground">
              {selectedRows.length} selected
            </span>
            <Button size="sm" variant="secondary" onClick={deleteSelectedRows}>
              <Icon name="TrashIcon" className="h-4 w-4" variant="outline" />
              Delete
            </Button>
          </div>
        )}
      </div>
      <Table className="overflow-x-scroll">
        <TableHeader>
          <TableRow>
            <TableCell className="sticky left-0 w-fit bg-gradient-to-r from-background via-background to-transparent">
              <Checkbox checked={isAllSelected()} onChange={handleSelectAll} />
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
                  <Checkbox
                    checked={isRowSelected(row)}
                    onChange={() => handleSelectRow(row)}
                  />
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
  );
}

export { MainTable };
