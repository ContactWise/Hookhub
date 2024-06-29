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
import Typography from "@/components/custom/typography";
import DynamicBreadcrumbs from "@/components/breadcrumbs";
import SelectTenantDialog from "@/components/custom/tenantSelectionDialog";
import NavbarProfile from "@/components/navbarProfile";

const links = [
  {
    href: "/dashboard/application/123/",
    label: "Home",
    icon: <Home className="h-5 w-5" />,
  },
  {
    href: "/endpoints",
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
  params,
}: {
  children: React.ReactNode;
  params: any;
}) {
  const { applicationId } = params;
  const links = [
    {
      href: `/dashboard/application/${applicationId}/`,
      label: "Home",
      icon: <Home className="h-5 w-5" />,
    },
    {
      href: `/dashboard/application/${applicationId}/endpoints`,
      label: "Endpoints",
      icon: <Link className="h-5 w-5" />,
    },
    {
      href: `/dashboard/application/${applicationId}/messages`,
      label: "Messages",
      icon: <Mails className="h-5 w-5" />,
    },
    {
      href: `/dashboard/application/${applicationId}/analytics`,
      label: "Analytics",
      icon: <LineChart className="h-5 w-5" />,
    },
  ];
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
            <NavbarProfile />
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-8 ">
          {/* <ScrollArea className="flex flex-1 p-2 justify-center rounded-lg border border-dashed shadow-sm "> */}
          {children}
          {/* </ScrollArea> */}
        </main>
      </div>
    </div>
  );
}
