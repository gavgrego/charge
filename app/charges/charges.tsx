"use client";

import { useGetCharges } from "../data/hooks/useCharges";
import { DataTable } from "../components/datatable";
import useChargesTable from "../data/hooks/useChargesTable";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";

const Charges = () => {
  const { data, isLoading, isError, error } = useGetCharges();
  const { columns } = useChargesTable();

  const table = useReactTable({
    data: data ? data : [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div>
      {isError && <div>{error.message}</div>}
      {isLoading ? (
        <div>loading...</div>
      ) : (
        <DataTable table={table} pagination={true} />
      )}
    </div>
  );
};

export default Charges;
