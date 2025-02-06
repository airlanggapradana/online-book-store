import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { validateTokenExpiration } from "@/utils/verifyToken";
import { ThemeProvider } from "@/components/ThemeProvider";

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
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <div>{children}</div>
    </ThemeProvider>
  );
}
