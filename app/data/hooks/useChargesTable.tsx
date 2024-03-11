import { Button } from "@/components/ui/button";
import {
  Column,
  ColumnDef,
  SortingState,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { deleteCharge } from "./useCharges";
import formatUsCurrency from "@/app/utils/formatUsCurrency";
import { useState } from "react";
import { ArrowsDownUp, ArrowUp, ArrowDown } from "@phosphor-icons/react";
import { useQueryClient } from "@tanstack/react-query";

const useChargesTable = <T,>(data: T[] | undefined) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const queryClient = useQueryClient();

  enum ColAccessors {
    date = "attributes.date",
    description = "attributes.description",
    amount = "attributes.amount",
    id = "id",
  }

  const BasicSorting = (column: Column<T, unknown>): JSX.Element => {
    return (
      <>
        {column.getIsSorted() === false && (
          <ArrowsDownUp className="pl-1" size={16} />
        )}
        {column.getIsSorted() === "asc" ? (
          <ArrowUp className="pl-1" size={16} />
        ) : null}
        {column.getIsSorted() === "desc" ? (
          <ArrowDown className="pl-1" size={16} />
        ) : null}
      </>
    );
  };

  const columns: ColumnDef<T>[] = [
    {
      id: ColAccessors.date,
      accessorKey: ColAccessors.date,
      enableSorting: true,
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting()}>
            Date
            <BasicSorting {...column} />
          </Button>
        );
      },
      cell: ({ row }) => {
        return (
          <div className="font-semibold">{row.getValue(ColAccessors.date)}</div>
        );
      },
    },
    {
      accessorKey: ColAccessors.description,
      enableSorting: true,
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting()}>
            Description
            <BasicSorting {...column} />
          </Button>
        );
      },
    },
    {
      id: ColAccessors.amount,
      accessorKey: ColAccessors.amount,
      enableSorting: true,
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting()}>
            Amount
            <BasicSorting {...column} />
          </Button>
        );
      },
      cell: ({ row }) => {
        const value: number = row.getValue(ColAccessors.amount);
        return (
          <div className="font-medium">
            <span
              className={`${value > 0 ? "text-red-600" : "text-green-600"}`}
            >
              {formatUsCurrency(value)}
            </span>
          </div>
        );
      },
    },
    {
      id: ColAccessors.id,
      accessorKey: ColAccessors.id,
      header: undefined,
      cell: ({ row }) => {
        return (
          <Button
            onClick={() =>
              deleteCharge(row.getValue(ColAccessors.id)).then(() =>
                queryClient.invalidateQueries({ queryKey: ["getCharges"] })
              )
            }
          >
            Delete
          </Button>
        );
      },
    },
  ];

  const table = useReactTable({
    data: data ? data : [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
    },
  });

  return {
    columns,
    sorting,
    setSorting,
    table,
  };
};

export default useChargesTable;
