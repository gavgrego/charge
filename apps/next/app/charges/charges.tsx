"use client";

import { useGetCharges } from "../data/hooks/useCharges";
import { DataTable } from "../components/datatable";
import useChargesTable from "../data/hooks/useChargesTable";
import Loading from "../global/loading";

const Charges = () => {
  const { data, isLoading, isError, error } = useGetCharges();
  const { table } = useChargesTable(data);

  return (
    <div>
      {isError && <div>{error.message}</div>}
      {isLoading ? (
        <div>
          <Loading />
        </div>
      ) : (
        <DataTable table={table} pagination={true} />
      )}
    </div>
  );
};

export default Charges;
