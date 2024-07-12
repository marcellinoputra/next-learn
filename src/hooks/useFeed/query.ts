import { useQuery } from "@tanstack/react-query";
import { DataFeed, fetchFeed } from ".";

export function useFeed() {
  return useQuery<DataFeed[], Error>({
    queryKey: ["id"],
    queryFn: fetchFeed,
  });
}
