import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { validateTokenExpiration } from "@/utils/verifyToken";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import ReactQueryProvider from "@/lib/ReactQueryProvider";

export default async function Dashboardlayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = (await cookies()).get("token");

  if (!token) {
    redirect("/");
  }

  const isTokenValid = validateTokenExpiration(token.value);
  if (isTokenValid.valid !== true) {
    redirect("/");
  }
  return (
    <ReactQueryProvider>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <div className="flex h-screen bg-background text-foreground">
          <Sidebar />
          <div className="flex flex-1 flex-col overflow-hidden">
            <Header />
            <main className="flex-1 overflow-y-auto overflow-x-hidden bg-background">
              {children}
            </main>
          </div>
        </div>
      </ThemeProvider>
    </ReactQueryProvider>
  );
}
