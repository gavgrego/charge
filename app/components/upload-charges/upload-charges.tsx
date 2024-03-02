import { useAddCharge, tempParsed } from "@/app/data/hooks/useCharges";
import Papa, { ParseResult } from "papaparse";
import { useState } from "react";

const UploadCharges = () => {
  const [file, setFile] = useState<File | undefined>();
  const { mutateAsync } = useAddCharge();
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
    <>
      <input id="image" type="file" name="image" onChange={handleOnChange} />
      <button onClick={parse}>parse</button>
    </>
  );
};

export default UploadCharges;
