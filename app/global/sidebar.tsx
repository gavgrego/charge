"use client";

import { Cardholder } from "@phosphor-icons/react";

const Sidebar = () => {
  return (
    <div>
      <div className="flex flex-col gap-10 px-8">
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
      </div>
    </div>
  );
};

export default Sidebar;
