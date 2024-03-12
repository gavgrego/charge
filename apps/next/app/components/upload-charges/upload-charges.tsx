import { useAddCharge, tempParsed } from "../../data/hooks/useCharges";
import Papa, { ParseResult } from "papaparse";
import { useCallback, useEffect, useState } from "react";

import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import Loading from "../../global/loading";

const UploadCharges = () => {
  const [file, setFile] = useState<File | undefined>();
  const { mutateAsync, isPending } = useAddCharge();

  const parse = useCallback(() => {
    Papa.parse(file as File, {
      complete: function (results: ParseResult<tempParsed>) {
        const charges = results.data;
        charges.forEach((charge, index) => {
          mutateAsync({ ...charge });
        });
      },
    });
  }, [file, mutateAsync]);

  useEffect(() => {
    if (file) {
      parse();
    }
  }, [file, parse]);

  async function handleOnChange(
    e: React.FormEvent<HTMLInputElement>
  ): Promise<void> {
    const target = e.target as HTMLInputElement & {
      files: FileList;
    };

    setFile(target.files[0]);
  }

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      {isPending ? (
        <div>
          <Loading />
        </div>
      ) : (
        <>
          <Label htmlFor="picture">Upload some charges!</Label>
          <Input
            id="picture"
            type="file"
            onChange={handleOnChange}
            accept=".csv"
          />
        </>
      )}
    </div>
  );
};

export default UploadCharges;
