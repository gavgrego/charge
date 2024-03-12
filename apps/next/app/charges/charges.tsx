"use client";

import { useGetCharges } from "../data/hooks/useCharges";
import { DataTable } from "../components/datatable";
import useChargesTable from "../data/hooks/useChargesTable";

const Charges = () => {
  const { data, isLoading, isError, error } = useGetCharges();
  const { table } = useChargesTable(data);

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
