"use client";

import dayjs from "dayjs";
import { DataTable } from "./components/datatable";
import { useGetCharges } from "./data/hooks/useCharges";
import useChargesTable from "./data/hooks/useChargesTable";
import { useStore } from "./data/store/useStore";

export default function Home() {
  const { month, year } = useStore();

  const { data, isLoading, isError, error } = useGetCharges(month, year);
  const { table } = useChargesTable(data);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-18">
      {isError && <div>{error.message}</div>}

      {isLoading ? (
        <div>loading...</div>
      ) : (
        <>
          <h2 className="font-semibold text-2xl">
            Charges for {dayjs(month).format("MMMM")} {year}
          </h2>
          <DataTable table={table} pagination={true} />
        </>
      )}
    </main>
  );
}
