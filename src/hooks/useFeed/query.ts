import { useQuery } from "@tanstack/react-query";
import { CreateFeed, DataFeed, createFeed, fetchFeed } from ".";
import { useMutation } from "@tanstack/react-query";

const useFeed = () => {
  return useQuery<DataFeed[], Error>({
    queryKey: ["id"],
    queryFn: fetchFeed,
  });
};

const useCreateFeed = () =>
  useMutation({
    mutationFn: (payload: CreateFeed) => createFeed(payload),
  });
export { useFeed, useCreateFeed };
