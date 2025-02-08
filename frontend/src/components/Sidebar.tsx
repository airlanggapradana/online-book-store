"use client";
import Link from "next/link";
import { Home, UserCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import LogoutBtn from "@/utils/LogoutBtn";
import { usePathname } from "next/navigation";

const navItems = [
  { icon: Home, label: "Dashboard", href: "/dashboard" },
  { icon: UserCircle2, label: "Daftar Peminjam", href: "/dashboard/peminjam" },
];

export function Sidebar() {
  const pathname = usePathname();
  return (
    <div className="flex w-64 flex-col border-r bg-background">
      <div className="flex h-16 items-center justify-center border-b">
        <span className="text-2xl font-semibold">Dashboard</span>
      </div>
      <nav className="flex-1 overflow-y-auto">
        <ul className="space-y-4 p-2">
          {navItems.map((item, index) => (
            <li key={index}>
              <Link
                href={item.href}
                className={cn(
                  "flex items-center rounded-lg px-4 py-3",
                  pathname === item.href
                    ? "bg-accent text-accent-foreground"
                    : "text-foreground hover:bg-accent hover:text-accent-foreground",
                )}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="border-t p-4">
        <LogoutBtn />
      </div>
    </div>
  );
}
