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
  const { columns, setSorting, sorting, table } = useChargesTable(data);

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
