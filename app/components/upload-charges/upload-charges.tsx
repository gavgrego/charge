import { useAddCharge, tempParsed } from "@/app/data/hooks/useCharges";
import Papa, { ParseResult } from "papaparse";
import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
        charges.forEach((charge, index) => {
          mutateAsync({ ...charge });
        });
      },
    });
  };

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="picture">Upload some charges!</Label>
      <Input id="picture" type="file" onChange={handleOnChange} accept=".csv" />
    </div>
  );
};

export default UploadCharges;
