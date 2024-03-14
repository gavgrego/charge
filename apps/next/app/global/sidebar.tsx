"use client";

import { Cardholder } from "@phosphor-icons/react";
import UploadCharges from "../components/upload-charges/upload-charges";
import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "../../components/ui/button";
import SelectDates from "../components/select-dates/select-dates";

const Sidebar = () => {
  const { data: session, status } = useSession();
  return (
    <div className="min-w-[300px]">
      <div className="flex flex-col gap-2 px-8">
        <Cardholder size={128} weight="fill" />
        <ul>
          <li>
            <a href="charts" className="font-semibold">
              Charts
            </a>
          </li>
        </ul>
        <UploadCharges />
        <SelectDates />
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
