import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../../../components/ui/select";
import { Button } from "../../../components/ui/button";
import {
  Charge,
  ChargeCardType,
} from "../../../data/api/documentation.schemas";
import { Input } from "../../../components/ui/input";
import Papa, { ParseResult } from "papaparse";
import { useCallback, useState } from "react";
import { useAddCharge } from "../../data/hooks/useCharges";
import { Session } from "next-auth";

type UploadChargesFormProps = {
  session: Session;
  setOpen: (open: boolean) => void;
};

const UploadChargesForm = ({ session, setOpen }: UploadChargesFormProps) => {
  const [file, setFile] = useState<File | undefined>();
  const [cardType, setCardType] = useState<ChargeCardType>();

  const { mutateAsync: addCharge } = useAddCharge();

  const parse = useCallback(() => {
    Papa.parse(file as File, {
      complete: (results: ParseResult<Charge>) => {
        const charges = results.data;

        Promise.all(
          charges.map(async (charge, index) => {
            // this is a hack to skip the first row of the csv file, which is just a header
            if (index === 0) return;
            await addCharge({
              added_by: session.user.name,
              date: charge[0],
              description: charge[1],
              amount: charge[2],
              card_type: cardType,
            });
          })
        ).then(() => {
          setOpen(false);
        });
      },
    });
  }, [addCharge, cardType, file, session.user.name, setOpen]);

  async function handleOnChange(
    e: React.FormEvent<HTMLInputElement>
  ): Promise<void> {
    const target = e.target as HTMLInputElement & {
      files: FileList;
    };

    setFile(target.files[0]);
  }
  return (
    <>
      <Input id="upload" type="file" onChange={handleOnChange} accept=".csv" />
      <Select onValueChange={(e: ChargeCardType) => setCardType(e)}>
        <SelectTrigger>
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
      <Button onClick={parse}>Upload</Button>
    </>
  );
};

export default UploadChargesForm;
