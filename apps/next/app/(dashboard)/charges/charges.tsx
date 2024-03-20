"use client";

import { useGetCharges } from "../../data/hooks/useCharges";
import { DataTable } from "../../components/datatable";
import useChargesTable from "../../data/hooks/useChargesTable";
import dayjs from "dayjs";

const Charges = () => {
  const month = dayjs(new Date()).format("MM");
  const year = dayjs(new Date()).format("YYYY");
  const { data, isLoading, isError, error } = useGetCharges(month, year);
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
