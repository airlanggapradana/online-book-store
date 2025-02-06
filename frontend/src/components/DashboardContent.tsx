"use client";
import React from "react";
import ActiveBorrows from "./ActiveBorrows";
import { useQuery } from "@tanstack/react-query";

const DashboardContent = () => {
  return (
    <div className="space-y-6 p-6">
      <div className='lg:grid-cols-3" grid gap-6 md:grid-cols-2'>
        <ActiveBorrows />
      </div>
    </div>
  );
};

export default DashboardContent;
