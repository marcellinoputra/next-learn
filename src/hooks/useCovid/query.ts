import { useQuery } from "@tanstack/react-query";
import { fetchCovidList } from "./request";
import { DataCovid } from "./type";

const useDataCovid = (page: number) => {
  return useQuery<DataCovid>({
    queryKey: ["id", page],
    queryFn: () => fetchCovidList(page),
  });
};

export { useDataCovid };
