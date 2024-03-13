"use client";

import { Cardholder } from "@phosphor-icons/react";
import UploadCharges from "../components/upload-charges/upload-charges";
import { useSession, signIn, signOut } from "next-auth/react";

const Sidebar = () => {
  const { data: session } = useSession();
  return (
    <div>
      <div className="flex flex-col gap-2 px-8">
        <Cardholder size={128} weight="fill" />
        <ul>
          <li>
            <a href="/charges" className="font-semibold">
              Charges
            </a>
          </li>
          <li>
            <a href="charts" className="font-semibold">
              Charts
            </a>
          </li>
        </ul>
        <UploadCharges />
      </div>
      {!session ? (
        <button onClick={() => signIn()}>Login</button>
      ) : (
        <button onClick={() => signOut()}>Logout</button>
      )}
    </div>
  );
};

export default Sidebar;
