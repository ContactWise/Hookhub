"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import exp from "constants";
import React from "react";
import { usePathname } from "next/navigation";

interface BreadcrumbItem {
  href: string;
  label: string;
}

const DynamicBreadcrumbs = () => {
  const path = usePathname();
  console.log("path", path);
  const breadcrumbs: BreadcrumbItem[] = path
    .split("/")
    .filter((item) => item)
    .map((item, index, arr) => ({
      href: `/${arr.slice(0, index + 1).join("/")}`,
      label: item.charAt(0).toUpperCase() + item.slice(1),
    }));

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbs.map((breadcrumb, index) => (
          <React.Fragment key={breadcrumb.href}>
            <BreadcrumbItem>
              <BreadcrumbLink className="font-semibold" href={breadcrumb.href}>
                {breadcrumb.label}
              </BreadcrumbLink>
            </BreadcrumbItem>
            {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default DynamicBreadcrumbs;
