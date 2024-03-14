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
  setMonth: (value: string) => set({ month: value }),
  setYear: (value: string) => set({ year: value }),
}));
