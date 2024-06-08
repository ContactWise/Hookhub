import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React, { FC, TableHTMLAttributes } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

interface TableHeader {
  name: string;
  label: string;
  render?: (item: Record<string, any>) => JSX.Element;
}

interface PaginatedTableProps {
  tableHead?: React.ReactNode;
  columns: TableHeader[];
  data: Record<string, any>[];
}

const PaginatedTable = React.forwardRef<
  HTMLTableElement,
  PaginatedTableProps &
    React.HTMLAttributes<TableHTMLAttributes<PaginatedTableProps>>
>(({ columns, tableHead, className, data, ...props }, ref) => {
  return (
    <div className={cn("flex flex-col gap-1 w-full", className)}>
      <div>{tableHead}</div>
      <div className="border border-dotted border-muted-foreground rounded-lg">
        <Table ref={ref} className=" ">
          <TableHeader>
            <TableRow>
              {columns.map((header) => (
                <TableHead
                  className="text-accent-foreground font-semibold"
                  key={header.name}
                >
                  {header.label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index}>
                {columns.map((column) => (
                  <TableCell key={column.name}>
                    {column.render ? column.render(row) : row[column.name]}
                  </TableCell>
                ))}
                <TableCell></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
});

PaginatedTable.displayName = "Paginated Table";

export default PaginatedTable;
