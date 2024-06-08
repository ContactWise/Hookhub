import {
  Bell,
  CircleUser,
  Home,
  LineChart,
  Link,
  Mails,
  Menu,
  Package,
  Package2,
  Search,
  ShoppingCart,
  Users,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
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
import { ScrollArea } from "@/components/ui/scroll-area";

const links = [
  {
    href: "/dashboard/application/123/",
    label: "Home",
    icon: <Home className="h-5 w-5" />,
  },
  {
    href: "/dashboard/application/123/endpoints",
    label: "Endpoints",
    icon: <Link className="h-5 w-5" />,
  },
  {
    href: "/dashboard/application/123/messages",
    label: "Messages",
    icon: <Mails className="h-5 w-5" />,
  },
  {
    href: "/dashboard/application/123/analytics",
    label: "Analytics",
    icon: <LineChart className="h-5 w-5" />,
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
          <div className="w-full flex-1 flex justify-end">
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
          <div className="flex gap-4 md:gap-4 flex-col  justify-between items-start ">
            <div className="flex flex-col w-full md:w-3/4">
              <h1 className="text-lg font-semibold md:text-2xl">
                Application Name
              </h1>
              <p className="line-clamp-2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                tincidunt, nunc nec lacinia aliquam, est libero ultricies purus,
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                tincidunt, nunc nec lacinia aliquam, est libero ultricies purus,
              </p>
            </div>
            <div className="flex flex-col gap-2 md:flex-row justify-between w-full">
              <h3 className="font-semibold text-md md:text-xl  ">
                Application Url:{" "}
                <span className="font-normal">https://dummyurl.com</span>
              </h3>
              <Badge className="self-start smd:self-auto">Active</Badge>
            </div>
          </div>
          <ScrollArea className="flex flex-1 p-2 justify-center rounded-lg border border-dashed shadow-sm max-h-[450px]">
            {children}
          </ScrollArea>
        </main>
      </div>
    </div>
  );
}
