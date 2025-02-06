import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import React from "react";

export default function Dashboardpage() {
  return (
    <div className="flex h-screen bg-background text-foreground">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto overflow-x-hidden bg-background">
          <p>Main Content</p>
        </main>
      </div>
    </div>
  );
}
