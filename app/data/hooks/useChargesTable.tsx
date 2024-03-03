import { Button } from "@/components/ui/button";
import { ColumnDef, SortingState } from "@tanstack/react-table";
import { Charge, deleteCharge } from "./useCharges";
import formatUsCurrency from "@/app/utils/formatUsCurrency";
import { useState } from "react";

const useChargesTable = () => {
  const [sorting, setSorting] = useState<SortingState>([]);

  enum ColAccessors {
    date = "attributes.date",
    description = "attributes.description",
    amount = "attributes.amount",
    id = "id",
  }

  const columns: ColumnDef<Charge>[] = [
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

  return {
    columns,
    sorting,
    setSorting,
  };
};

export default useChargesTable;
