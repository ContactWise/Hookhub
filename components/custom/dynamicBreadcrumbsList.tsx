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
import React, { FC } from "react";
import { usePathname } from "next/navigation";

export interface BreadcrumbItem {
  href: string;
  label: string;
}

interface DynamicBreadcrumbsProps {
  path: string;
  separator: React.ReactNode;
  map?: BreadcrumbItem[];
}

const DynamicBreadcrumbsList: FC<DynamicBreadcrumbsProps> = ({
  path,
  separator,
  map,
}) => {
  const breadcrumbs: BreadcrumbItem[] = map
    ? map
    : path
        .split("/")
        .filter((item) => item)
        .reduce((acc, item, index, array) => {
          const href = `${acc.length > 0 ? acc[acc.length - 1].href : ""}/${item}`;
          acc.push({ href, label: item });
          return acc;
        }, [] as BreadcrumbItem[]);

  return (
    <>
      {breadcrumbs.map((breadcrumb, index) => (
        <React.Fragment key={breadcrumb.href}>
          <BreadcrumbItem>
            <BreadcrumbLink className="font-semibold" href={breadcrumb.href}>
              {breadcrumb.label}
            </BreadcrumbLink>
          </BreadcrumbItem>
          {index < breadcrumbs.length - 1 && (
            <BreadcrumbSeparator>{separator}</BreadcrumbSeparator>
          )}
        </React.Fragment>
      ))}
    </>
  );
};

export default DynamicBreadcrumbsList;
