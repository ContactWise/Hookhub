"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import exp from "constants";
import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
import DynamicBreadcrumbsList from "./custom/dynamicBreadcrumbsList";
import { ChevronDownIcon, ChevronRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getTenants, getWorkspaces } from "@/queries/getUserDetails";
import { useEnvironmentContext } from "@/context/envContext";
import { Tenant } from "@/types";

interface BreadcrumbItem {
  href: string;
  label: string;
}

const DynamicBreadcrumbs = () => {
  const path = usePathname();
  const { tenant, workspace, setTenant, setWorkspace } =
    useEnvironmentContext();

  return (
    <Breadcrumb>
      <BreadcrumbList className="font-semibold">
        <DynamicBreadcrumbsList path={path} separator={<ChevronRight />} />
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default DynamicBreadcrumbs;
