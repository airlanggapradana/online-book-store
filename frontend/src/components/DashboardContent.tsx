"use client";
import React from "react";
import ActiveBorrows from "./ActiveBorrows";
import { useQuery } from "@tanstack/react-query";
import { getAllBorrows } from "@/utils/api";
import UpcomingDeadlines from "./UpcomingDeadlines";
import DataPeminjam from "./DataPeminjam";
import useToken from "@/hooks/useToken";

const DashboardContent = () => {
  const { token } = useToken();
  if (!token) return null;

  const { data, isError, isLoading } = useQuery({
    queryKey: ["all-borrows"],
    queryFn: async () => await getAllBorrows(token),
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;
  if (!data) return <div>No data...</div>;

  const actualData = data.result?.borrows;
  return (
    <div className="space-y-6 p-6">
      <div className='lg:grid-cols-3" grid gap-6 md:grid-cols-2'>
        <ActiveBorrows data={actualData} />
        <UpcomingDeadlines data={actualData} />
      </div>
      <DataPeminjam data={actualData} />
    </div>
  );
};

export default DashboardContent;
