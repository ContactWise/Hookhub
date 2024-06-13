import {
  Bell,
  CircleUser,
  Home,
  LineChart,
  Menu,
  Package,
  Package2,
  Search,
  ShoppingCart,
  Users,
} from "lucide-react";
import { headers } from "next/headers";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import NavigationSidebar from "@/components/navigationSidebar";
import NavigationMenu from "@/components/navigationMenu";
import DynamicBreadcrumbs from "@/components/breadcrumbs";

const links = [
  {
    href: "/dashboard/applications",
    label: "Applications",
    icon: <Home className="h-5 w-5" />,
  },
  {
    href: "/dashboard/registry",
    label: "Event Registries",
    icon: <ShoppingCart className="h-5 w-5" />,
  },
  {
    href: "/dashboard/credentials",
    label: "Credentials",
    icon: <Package className="h-5 w-5" />,
  },
  {
    href: "#",
    label: "User Management",
    icon: <Users className="h-5 w-5" />,
  },
  {
    href: "#",
    label: "Settings",
    icon: <LineChart className="h-5 w-5" />,
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headerList = headers();

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <NavigationSidebar links={links} />
      <div className="flex flex-col">
        <header className="flex justify-between h-14 items-center gap-4  px-4 lg:h-[100px] lg:px-6">
          <NavigationMenu links={links}>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </NavigationMenu>
          <div className="w-full flex-1 flex justify-between items-center">
            <DynamicBreadcrumbs />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="secondary"
                  size="icon"
                  className="rounded-full"
                >
                  <CircleUser className="h-5 w-5" />
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-8 ">
          {children}
        </main>
      </div>
    </div>
  );
}
