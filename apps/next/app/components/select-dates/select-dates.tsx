import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { useStore } from "../../data/store/useStore";

const SelectDates = ({}) => {
  const setMonth = useStore((state) => state.setMonth);
  const setYear = useStore((state) => state.setYear);

  return (
    <div className="flex flex-row gap-2">
      <Select onValueChange={(value) => setMonth(value)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Month" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="01">January</SelectItem>
          <SelectItem value="02">February</SelectItem>
          <SelectItem value="03">March</SelectItem>
          <SelectItem value="04">April</SelectItem>
          <SelectItem value="05">May</SelectItem>
          <SelectItem value="06">June</SelectItem>
          <SelectItem value="07">July</SelectItem>
          <SelectItem value="08">August</SelectItem>
          <SelectItem value="09">September</SelectItem>
          <SelectItem value="10">October</SelectItem>
          <SelectItem value="11">November</SelectItem>
          <SelectItem value="12">December</SelectItem>
        </SelectContent>
      </Select>
      <Select onValueChange={(value) => setYear(value)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Year" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="2023">2023</SelectItem>
          <SelectItem value="2024">2024</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectDates;
