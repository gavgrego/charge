"use client";

import { Cardholder } from "@phosphor-icons/react";
import UploadCharges from "../components/upload-charges/upload-charges";
import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "../../components/ui/button";
import SelectDates from "../components/select-dates/select-dates";

const Sidebar = () => {
  const { data: session, status } = useSession();
  return (
    <div className="min-w-[300px] mx-4">
      <Cardholder size={128} weight="fill" />
      <div className="flex flex-col justify-between">
        <div className="flex flex-col gap-2 mb-6">
          <UploadCharges />
          <h3>Select a Month and Year:</h3>
          <SelectDates />
        </div>
        {!session ? (
          <Button onClick={() => signIn()}>Login</Button>
        ) : (
          <Button onClick={() => signOut()}>Logout</Button>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
