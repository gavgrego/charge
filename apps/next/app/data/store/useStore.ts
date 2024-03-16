import dayjs from "dayjs";
import { create } from "zustand";

type Store = {
  month: string;
  setMonth: (value: string) => void;
  setYear: (value: string) => void;
  year: string;
};

export const useStore = create<Store>((set) => ({
  month: dayjs(new Date()).format("MM"),
  year: dayjs(new Date()).format("YYYY"),
  setMonth: (month: string) => set(() => ({ month })),
  setYear: (year: string) => set(() => ({ year })),
}));
