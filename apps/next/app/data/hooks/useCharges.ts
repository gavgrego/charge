import {
  UseMutationResult,
  UseQueryResult,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { Charge } from "../../../data/api/documentation.schemas";
import dayjs from "dayjs";

export type ChargeStrapi = Charge[];

export const addCharge = async (data: { data: Charge }) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/charges`,
    {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "bearer e2b4afd2f66dcb3ecc1f6419f87f84c110812b66efc0d5f5adef803bbd67f0b5c02874c53e7cd5abca4ee17b638f4fecab5a44e9cb1f8811157c728473f70438c9b9bf0e55c47df5d2eaf351c2788224c3ebda4c1f61cb7915b7c72caa8154ed94e23b3b283993de4b73d26148e4e63179aa13e93e8e38d290f1acf6a45eda9c",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(data),
    }
  );

  return await response.json();
};

export const deleteCharge = async (id: number) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/charges/${id}`,
    {
      method: "DELETE",
      mode: "cors",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "bearer e2b4afd2f66dcb3ecc1f6419f87f84c110812b66efc0d5f5adef803bbd67f0b5c02874c53e7cd5abca4ee17b638f4fecab5a44e9cb1f8811157c728473f70438c9b9bf0e55c47df5d2eaf351c2788224c3ebda4c1f61cb7915b7c72caa8154ed94e23b3b283993de4b73d26148e4e63179aa13e93e8e38d290f1acf6a45eda9c",
      },
    }
  );

  return await response.json();
};

export const getCharges = async (month: string, year: string) => {
  const lastDayOfMonth = dayjs(`${year}-${month}-01`).endOf("month").date();
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/charges/?filters[date][$gte]=${year}-${month}-01&filters[date][$lte]=${year}-${month}-${lastDayOfMonth}`,
    {
      method: "GET",
      headers: {
        Authorization:
          "bearer e2b4afd2f66dcb3ecc1f6419f87f84c110812b66efc0d5f5adef803bbd67f0b5c02874c53e7cd5abca4ee17b638f4fecab5a44e9cb1f8811157c728473f70438c9b9bf0e55c47df5d2eaf351c2788224c3ebda4c1f61cb7915b7c72caa8154ed94e23b3b283993de4b73d26148e4e63179aa13e93e8e38d290f1acf6a45eda9c",
      },
    }
  );
  const data = await response.json();
  return data.data;
};

export const useAddCharge = (
  data?: Charge
): UseMutationResult<Charge, Error, Charge, unknown> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => {
      return addCharge({
        data: {
          date: dayjs(data.date).format("YYYY-MM-DD").toString() || "",
          description: data.description,
          amount: Number(data.amount),
          added_by: data.added_by,
        },
      });
    },
    onError: () => {
      throw `There was an error adding charge: ${data}`;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getCharges"] });
    },
  });
};

export const useDeleteCharge = (): UseMutationResult<
  number,
  Error,
  number,
  unknown
> => {
  return useMutation({
    mutationFn: (id) => {
      return deleteCharge(id);
    },
  });
};

export const useGetCharges = (
  month: string,
  year: string
): UseQueryResult<Charge[], Error> => {
  return useQuery({
    queryKey: ["getCharges", month, year],
    queryFn: () => getCharges(month, year),
    refetchOnWindowFocus: true,
  });
};
