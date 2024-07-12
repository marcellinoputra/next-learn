"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { DataFeed, useFeed } from "@/hooks/useFeed";
import { useEffect, useState } from "react";

const ViewFeed: React.FC = () => {
  const { data, isPending, isError, refetch } = useFeed();

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return (
      <div>
        Error fetching data. <button onClick={() => refetch()}>Retry</button>
      </div>
    );
  }

  console.log(data);

  return (
    <main className="flex flex-col max-w min-h-screen justify-center items-center p-5">
      {data?.map((item: DataFeed) => (
        <Card key={item.id} className="my-4">
          <CardHeader>
            <p>User ID: {item.userId}</p>
          </CardHeader>
          <CardContent>
            <p>Title: </p>
            <p>{item.title}</p>
          </CardContent>
          <CardFooter>
            <div className="flex flex-col">
              <p>Content: </p>
              <p>{item.body}</p>
            </div>
          </CardFooter>
        </Card>
      ))}
    </main>
  );
};

export default ViewFeed;
