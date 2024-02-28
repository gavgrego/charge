import { UseQueryResult, useQuery } from "@tanstack/react-query";

export const getCountries = async () => {
  const response = await fetch("http://localhost:1337/api/countries", {
    headers: {
      Authorization:
        "bearer e2b4afd2f66dcb3ecc1f6419f87f84c110812b66efc0d5f5adef803bbd67f0b5c02874c53e7cd5abca4ee17b638f4fecab5a44e9cb1f8811157c728473f70438c9b9bf0e55c47df5d2eaf351c2788224c3ebda4c1f61cb7915b7c72caa8154ed94e23b3b283993de4b73d26148e4e63179aa13e93e8e38d290f1acf6a45eda9c",
    },
  });
  return await response.json();
};

export const useGetCountries = (): UseQueryResult<any, Error> => {
  let countries;
  try {
    countries = useQuery({
      queryKey: ["countries"],
      queryFn: getCountries,
    });
  } catch {
    throw new Error();
  }

  return countries;
};
