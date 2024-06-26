"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Service } from "@/types";
import { Trash } from "lucide-react";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import { useEnvironmentContext } from "@/context/envContext";
import DeleteServiceDialog from "./deleteServiceDialog";

type Checked = DropdownMenuCheckboxItemProps["checked"];

const ServiceActions = ({ service }: { service: Service }) => {
  const { tenant, workspace } = useEnvironmentContext();

  // Use the isActive property to determine the initial state
  const [isActive, setIsActive] = React.useState(service.isActive);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Actions</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Set Service Status</DropdownMenuLabel>
        <DropdownMenuRadioGroup
          value={isActive ? "Active" : "Deactivate"}
          onValueChange={(value) => setIsActive(value === "Active")}
        >
          <DropdownMenuRadioItem value="Active">Activate</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="Deactivate">
            Deactivate
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onSelect={(e) => e.preventDefault()}
          className="bg-red-300 hover:bg-red-400"
        >
          <Trash size={14} className="text-red-700" />
          <DeleteServiceDialog
            service={service}
            workspace={workspace!}
            tenant={tenant!}
          />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ServiceActions;
