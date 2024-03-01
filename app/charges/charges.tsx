"use client";

import { useState } from "react";
import {
  useGetCharges,
  useAddCharge,
  tempParsed,
  useDeleteCharge,
} from "../data/hooks/useCharges";
import Papa, { ParseResult } from "papaparse";
import dayjs from "dayjs";
import ChargesTable from "./charges-table";

const Charges = () => {
  const [file, setFile] = useState<File | undefined>();
  const { mutateAsync } = useAddCharge();
  const { mutate } = useDeleteCharge();
  const { data, isLoading, isError, error } = useGetCharges();

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
      {isLoading ? <div>loading...</div> : <ChargesTable data={data || []} />}
    </div>
  );
};

export default Charges;
