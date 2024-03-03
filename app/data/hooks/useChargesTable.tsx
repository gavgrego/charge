import { Button } from "@/components/ui/button";
import {
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

const useChargesTable = <T,>(data: T[] | undefined) => {
  const [sorting, setSorting] = useState<SortingState>([]);

  enum ColAccessors {
    date = "attributes.date",
    description = "attributes.description",
    amount = "attributes.amount",
    id = "id",
  }

  const columns: ColumnDef<T>[] = [
    {
      accessorKey: ColAccessors.date,
      enableSorting: true,
      header: "Date",
    },
    {
      accessorKey: ColAccessors.description,
      enableSorting: true,
      header: "Description",
    },
    {
      id: ColAccessors.amount,
      accessorKey: ColAccessors.amount,
      enableSorting: true,
      header: "Amount",
      cell: ({ row }) => {
        return (
          <div className="text-right font-medium">
            {formatUsCurrency(row.getValue(ColAccessors.amount))}
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
          <Button onClick={() => deleteCharge(row.getValue(ColAccessors.id))}>
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
