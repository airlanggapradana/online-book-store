import DashboardContent from "@/components/DashboardContent";
import React from "react";
import { cookies } from "next/headers";

export default async function Dashboardpage() {
  const token = (await cookies()).get("token");
  if (!token) return null;
  return <DashboardContent token={token.value} />;
}
