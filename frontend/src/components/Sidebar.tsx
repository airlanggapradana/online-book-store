import Link from "next/link";
import { Book, Calendar, Home, BarChart, Settings, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: Home, label: "Dashboard", href: "/" },
  { icon: Book, label: "Courses", href: "/courses" },
  { icon: Calendar, label: "Schedule", href: "/schedule" },
  { icon: BarChart, label: "Progress", href: "/progress" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

export function Sidebar() {
  return (
    <div className="flex w-64 flex-col border-r bg-background">
      <div className="flex h-16 items-center justify-center border-b">
        <span className="text-2xl font-semibold">LMS Dashboard</span>
      </div>
      <nav className="flex-1 overflow-y-auto">
        <ul className="space-y-1 p-2">
          {navItems.map((item, index) => (
            <li key={index}>
              <Link
                href={item.href}
                className={cn(
                  "flex items-center rounded-lg px-4 py-2 text-foreground hover:bg-accent hover:text-accent-foreground",
                  index === 0 && "bg-accent text-accent-foreground",
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
        <button className="flex w-full items-center rounded-lg px-4 py-2 text-foreground hover:bg-accent hover:text-accent-foreground">
          <LogOut className="mr-3 h-5 w-5" />
          Logout
        </button>
      </div>
    </div>
  );
}
