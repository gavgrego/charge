import {
  UseMutationResult,
  UseQueryResult,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import dayjs from "dayjs";

export type Charge = {
  attributes: {
    description: string;
    date: Date;
    amount: number;
  };
  id: number;
};

export type ChargeStrapi = Charge[];

// get better typings/http from back-end when Orval is set up
export type tempParsed = {
  0: string;
  1: string;
  2: string;
};

export const addCharge = async (data: Charge | Record<string, any>) => {
  const response = await fetch("http://localhost:1337/api/charges", {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "bearer e2b4afd2f66dcb3ecc1f6419f87f84c110812b66efc0d5f5adef803bbd67f0b5c02874c53e7cd5abca4ee17b638f4fecab5a44e9cb1f8811157c728473f70438c9b9bf0e55c47df5d2eaf351c2788224c3ebda4c1f61cb7915b7c72caa8154ed94e23b3b283993de4b73d26148e4e63179aa13e93e8e38d290f1acf6a45eda9c",
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });

  return await response.json();
};

export const deleteCharge = async (id: number) => {
  const response = await fetch(`http://localhost:1337/api/charges/${id}`, {
    method: "DELETE", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "bearer e2b4afd2f66dcb3ecc1f6419f87f84c110812b66efc0d5f5adef803bbd67f0b5c02874c53e7cd5abca4ee17b638f4fecab5a44e9cb1f8811157c728473f70438c9b9bf0e55c47df5d2eaf351c2788224c3ebda4c1f61cb7915b7c72caa8154ed94e23b3b283993de4b73d26148e4e63179aa13e93e8e38d290f1acf6a45eda9c",
    },
  });

  return await response.json();
};

export const getCharges = async () => {
  const response = await fetch("http://localhost:1337/api/charges", {
    method: "GET",
    headers: {
      Authorization:
        "bearer e2b4afd2f66dcb3ecc1f6419f87f84c110812b66efc0d5f5adef803bbd67f0b5c02874c53e7cd5abca4ee17b638f4fecab5a44e9cb1f8811157c728473f70438c9b9bf0e55c47df5d2eaf351c2788224c3ebda4c1f61cb7915b7c72caa8154ed94e23b3b283993de4b73d26148e4e63179aa13e93e8e38d290f1acf6a45eda9c",
    },
  });
  const data = await response.json();
  return data.data;
};

export const useAddCharge = (
  data?: tempParsed
): UseMutationResult<tempParsed, Error, tempParsed, unknown> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => {
      return addCharge({
        data: {
          date: dayjs(data?.[0]).toDate(),
          description: data?.[1] || "",
          amount: Number(data?.[2]) || 0,
        },
      });
    },
    onError: () => {
      throw `There was an error adding charge ${data}`;
    },
  });
};

export const useDeleteCharge = (): UseMutationResult<
  number,
  Error,
  number,
  unknown
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => {
      return deleteCharge(id);
    },
    onError: (data) => {
      // throw "You fucked up the mutation";
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getCharges"] });
    },
  });
};

export const useGetCharges = (): UseQueryResult<
  // fix this time with types generated from strapi

  Charge[],
  Error
> => {
  return useQuery({
    queryKey: ["getCharges"],
    queryFn: getCharges,
    refetchOnWindowFocus: true,
  });
};
