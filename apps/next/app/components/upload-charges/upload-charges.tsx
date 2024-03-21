import { useAddCharge } from "../../data/hooks/useCharges";
import Papa, { ParseResult } from "papaparse";
import { useCallback, useState } from "react";

import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import Loading from "../../global/loading";
import { useSession } from "next-auth/react";
import { Charge } from "../../../data/api/documentation.schemas";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";

const UploadCharges = () => {
  const [file, setFile] = useState<File | undefined>();
  const { mutateAsync, isPending } = useAddCharge();
  const { data: session } = useSession();

  const parse = useCallback(() => {
    Papa.parse(file as File, {
      complete: function (results: ParseResult<Charge>) {
        const charges = results.data;
        charges.forEach((charge, index) => {
          mutateAsync({
            added_by: session.user.name,
            date: charge[0],
            description: charge[1],
            amount: charge[2],
          });
        });
      },
    });
  }, [file, mutateAsync, session?.user]);

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
        session && (
          <>
            <Label htmlFor="picture">Upload some charges!</Label>
            <Input
              id="picture"
              type="file"
              onChange={handleOnChange}
              accept=".csv"
            />
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a Card Type..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="amex">American Express</SelectItem>
                <SelectItem value="chase" disabled>
                  Chase
                </SelectItem>
                <SelectItem value="alaska" disabled>
                  Alaska Airlines
                </SelectItem>
                <SelectItem value="american" disabled>
                  American Airlines
                </SelectItem>
              </SelectContent>
            </Select>
          </>
        )
      )}
    </div>
  );
};

export default UploadCharges;
