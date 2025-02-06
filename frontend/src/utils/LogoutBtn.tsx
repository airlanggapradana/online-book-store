"use client";
import { LogOut } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import { deleteCookie } from "./cookies";

const LogoutBtn = () => {
  return (
    <Button
      className="flex w-full items-center justify-start rounded-lg px-4 py-2 text-foreground hover:bg-accent hover:text-accent-foreground"
      onClick={() => deleteCookie("token")}
      variant={"ghost"}
    >
      <LogOut className="mr-3 h-5 w-5" />
      Logout
    </Button>
  );
};

export default LogoutBtn;
