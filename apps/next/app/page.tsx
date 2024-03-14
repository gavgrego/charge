"use client";

import { DataTable } from "./components/datatable";
import { useGetCharges } from "./data/hooks/useCharges";
import useChargesTable from "./data/hooks/useChargesTable";

export default function Home() {
  const { data, isLoading, isError, error } = useGetCharges();
  const { table } = useChargesTable(data);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {isError && <div>{error.message}</div>}

      {isLoading ? (
        <div>loading...</div>
      ) : (
        <>
          <DataTable table={table} pagination={true} />
        </>
      )}
    </main>
  );
}
