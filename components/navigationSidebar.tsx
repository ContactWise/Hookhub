import { Home, LineChart, Package, ShoppingCart, Users } from "lucide-react";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { FC } from "react";
import { NavLink } from "@/types/props";

interface NavigationSidebarProps {
  links: NavLink[];
}

const NavigationSidebar: FC<NavigationSidebarProps> = ({ links }) => {
  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[100px] lg:px-6">
          <h1 className="text-primary text-4xl font-bold">Hookhub.</h1>
        </div>
        <div className="flex-1">
          <nav className="grid items-start gap-2 px-2 text-sm font-medium lg:px-4">
            {links.map((link) => (
              <Link
                href={link.href}
                key={link.label}
                className="flex items-center gap-3 rounded-lg px-3 py-3 text-muted-foreground transition-all hover:text-primary hover:bg-secondary"
              >
                {link.icon}
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default NavigationSidebar;
