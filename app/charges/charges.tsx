"use client";

import { useState } from "react";
import {
  useGetCharges,
  useAddCharge,
  Charge,
  tempParsed,
} from "../data/hooks/useCharges";
import Papa, { ParseResult } from "papaparse";
import dayjs from "dayjs";

const Charges = () => {
  const [file, setFile] = useState<File | undefined>();
  const { mutateAsync } = useAddCharge();
  const { data, isLoading, isError, error } = useGetCharges();
  console.log(data);

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
        data?.map((charge, i) => {
          console.log(charge);
          return (
            <div key={i}>
              <div>{charge.attributes.amount}</div>
              <div>{charge.attributes.description}</div>
              <div>
                {charge.attributes.date &&
                  dayjs(charge.attributes.date).toString()}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Charges;
