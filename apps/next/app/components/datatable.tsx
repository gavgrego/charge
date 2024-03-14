"use client";

import { flexRender, type Table as TTable } from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "../../components/ui/pagination";

import {
  CaretDoubleLeft,
  CaretDoubleRight,
  CaretLeft,
  CaretRight,
} from "@phosphor-icons/react";
import { Charge } from "../../data/api/documentation.schemas";

type DataTableProps<TData, TValue> = {
  table: TTable<Charge>;
  pagination: boolean;
};

export function DataTable<TData, TValue>({
  pagination,
  table,
  ...props
}: DataTableProps<TData, TValue>) {
  console.log(table.getCanNextPage());
  return (
    <>
      <div>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={table.getAllColumns().length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {pagination && (
        <div className="mt-4">
          <Pagination>
            <PaginationContent>
              <PaginationItem className="cursor-pointer">
                <CaretDoubleLeft
                  size={24}
                  onClick={() => table.firstPage()}
                  aria-disabled={table.getCanPreviousPage()}
                />
              </PaginationItem>
              <PaginationItem className="cursor-pointer">
                <CaretLeft
                  size={24}
                  onClick={() => table.previousPage()}
                  aria-disabled={table.getCanPreviousPage()}
                />
              </PaginationItem>

              <PaginationItem className="cursor-pointer">
                <CaretRight
                  size={24}
                  onClick={
                    table.getCanNextPage() ? () => table.nextPage() : null
                  }
                  aria-disabled={table.getCanNextPage()}
                />
              </PaginationItem>
              <PaginationItem className="cursor-pointer">
                <CaretDoubleRight
                  size={24}
                  onClick={() => table.lastPage()}
                  aria-disabled={table.getCanNextPage()}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </>
  );
}
