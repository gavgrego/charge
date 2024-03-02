"use client";

import { useState } from "react";
import {
  useGetCharges,
  useAddCharge,
  tempParsed,
  useDeleteCharge,
  Charge,
} from "../data/hooks/useCharges";
import Papa, { ParseResult } from "papaparse";
import { DataTable } from "../components/datatable";
import { ColumnDef } from "@tanstack/react-table";
import formatUsCurrency from "../utils/formatUsCurrency";
import { Button } from "@/components/ui/button";

enum ColAccessors {
  date = "attributes.date",
  description = "attributes.description",
  amount = "attributes.amount",
  id = "id",
}

const Charges = () => {
  const [file, setFile] = useState<File | undefined>();
  const { mutateAsync } = useAddCharge();
  const { mutate: deleteCharge } = useDeleteCharge();
  const { data, isLoading, isError, error } = useGetCharges();

  const columns: ColumnDef<Charge>[] = [
    {
      accessorKey: ColAccessors.date,
      header: "Date",
    },
    {
      accessorKey: ColAccessors.description,
      header: "Description",
    },
    {
      id: ColAccessors.amount,
      accessorKey: ColAccessors.amount,
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

  function handleOnChange(e: React.FormEvent<HTMLInputElement>) {
    const target = e.target as HTMLInputElement & {
      files: FileList;
    };

    setFile(target.files[0]);
  }

  const parse = () => {
    Papa.parse(file as File, {
      complete: function (results: ParseResult<tempParsed>) {
        const charges = results.data;
        charges.forEach((charge) => {
          return mutateAsync({ ...charge });
        });
      },
    });
  };

  return (
    <div>
      <input id="image" type="file" name="image" onChange={handleOnChange} />
      <button onClick={parse}>parse</button>
      {isError && <div>{error.message}</div>}
      {isLoading ? (
        <div>loading...</div>
      ) : (
        <DataTable columns={columns} data={data || []} pagination={true} />
      )}
    </div>
  );
};

export default Charges;
