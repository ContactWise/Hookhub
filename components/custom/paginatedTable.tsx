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

import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/router";
import PaginationControls from "./paginationControls";

interface TableHeader {
  name: string;
  label: string;
  render?: (item: Record<string, any>) => JSX.Element;
}

interface PaginatedTableProps {
  tableHead?: React.ReactNode;
  tableFooter?: React.ReactNode;
  columns: TableHeader[];
  data: Record<string, any>[];
  paginated?: boolean;
}

const PaginatedTable = React.forwardRef<
  HTMLTableElement,
  PaginatedTableProps &
    React.HTMLAttributes<TableHTMLAttributes<PaginatedTableProps>>
>(
  (
    { columns, tableHead, tableFooter, className, data, paginated, ...props },
    ref
  ) => {
    return (
      <div className={cn("flex flex-col gap-1 w-full", className)}>
        <div className="">{tableHead}</div>
        <div className="border border-dotted border-muted-foreground rounded-lg">
          <Table ref={ref} className=" ">
            <TableHeader>
              <TableRow className="bg-muted">
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
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="">{tableFooter}</div>
        {paginated && <PaginationControls />}
      </div>
    );
  }
);

PaginatedTable.displayName = "Paginated Table";

export default PaginatedTable;
