import { useSession } from "next-auth/react";
import { Button } from "../../../components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogHeader,
} from "../../../components/ui/dialog";
import UploadChargesForm from "./upload-charges-form";
import { useState } from "react";

const UploadCharges = () => {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      {session && (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>Upload Charges</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Upload Charges</DialogTitle>
            </DialogHeader>
            <UploadChargesForm session={session} setOpen={setOpen} />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default UploadCharges;
