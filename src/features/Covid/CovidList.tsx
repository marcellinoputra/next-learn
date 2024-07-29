"use client";

import { Button } from "@/components/ui/button";
import { Covid, useDataCovid } from "@/hooks/useCovid";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const ITEMS_PER_PAGE = 10;

const CovidList: React.FC = () => {
  const [isPressed, setIsPressed] = useState<boolean>(false);
  const [page, setPage] = useState(1);
  const { data, isLoading, isError, refetch } = useDataCovid(page);
  const [progress, setProgress] = useState<number>(0);

  const handleButtonClick = () => {
    setIsPressed(true);
    refetch();
  };

  useEffect(() => {
    if (isPressed) {
      refetch();
    }
  }, [page, isPressed, refetch]);
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isLoading) {
      setProgress(0);
      interval = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress >= 90) {
            clearInterval(interval);
            return 90;
          }
          return prevProgress + 10;
        });
      }, 100);
    } else {
      setProgress(100);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isLoading]);

  const rows = (
    <div className="mt-4">
      {isLoading ? (
        <Progress value={progress} className="w-[60%]" />
      ) : isError ? (
        <p className="text-red-500">Error fetching data</p>
      ) : (
        data?.data.map((covid: Covid, index: number) => (
          <TableRow key={index}>
            <TableCell>{covid.iso}</TableCell>
            <TableCell>{covid.name}</TableCell>
          </TableRow>
        ))
      )}
    </div>
  );

  return (
    <main className="w-full min-h-screen p-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Informasi Covid-19</CardTitle>
        </CardHeader>
        <CardContent>
          <Button onClick={handleButtonClick} className="mb-4">
            Dapatkan Informasi Covid
          </Button>
          {isPressed && (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ISO</TableHead>
                    <TableHead>Country Name</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>{rows}</TableBody>
              </Table>
              <Pagination className="mt-4">
                <PaginationContent>
                  <PaginationItem>
                    {page > 1 ? (
                      <PaginationPrevious
                        onClick={() => setPage((prev) => prev - 1)}
                      />
                    ) : (
                      <PaginationPrevious className="pointer-events-none opacity-50 cursor-pointer" />
                    )}
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink isActive>{page}</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    {data && data.data.length === ITEMS_PER_PAGE ? (
                      <PaginationNext
                        onClick={() => setPage((prev) => prev + 1)}
                      />
                    ) : (
                      <PaginationNext className="pointer-events-none opacity-50 cursor-pointer" />
                    )}
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </>
          )}
        </CardContent>
      </Card>
    </main>
  );
};

export default CovidList;
