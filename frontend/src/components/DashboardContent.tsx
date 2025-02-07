"use client";
import React from "react";
import ActiveBorrows from "./ActiveBorrows";
import { useQuery } from "@tanstack/react-query";
import { getAllBorrows } from "@/utils/api";
import UpcomingDeadlines from "./UpcomingDeadlines";
import DataPeminjam from "./DataPeminjam";

const DashboardContent = ({ token }: { token: string }) => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["all-borrows"],
    queryFn: async () => await getAllBorrows(token),
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;
  if (!data) return <div>No data...</div>;

  const actualData = data.result;
  return (
    <div className="space-y-6 p-6">
      <div className='lg:grid-cols-3" grid gap-6 md:grid-cols-2'>
        {/* <ActiveBorrows total={actualData} /> */}
        {/* <UpcomingDeadlines data={data.result} /> */}
      </div>
      {/* <DataPeminjam data={data.result} token={token} /> */}
    </div>
  );
};

export default DashboardContent;
