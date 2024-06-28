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
import { CredentialResource, EventRegistryResource, Service } from "@/types";
import { EllipsisVertical, Pencil, Trash } from "lucide-react";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import { useEnvironmentContext } from "@/context/envContext";
("./deleteCredentialsDialog");
import { Switch } from "@/components/ui/switch";
import { setActiveStatus } from "@/actions/credentials";
import Typography from "@/components/custom/typography";
import EditServiceSheet from "@/app/dashboard/(application)/application/[applicationId]/_components/editServiceSheet";
import DeleteRegistryDialog from "./deleteRegistryDialog";
import EditRegistrySheet from "./editRegistrySheet";

type Checked = DropdownMenuCheckboxItemProps["checked"];

const RegistryActions = ({ registry }: { registry: EventRegistryResource }) => {
  const { tenant, workspace } = useEnvironmentContext();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Actions</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onSelect={(e) => e.preventDefault()}
          className=" flex items-center"
        >
          <Pencil size={14} className="" />
          <EditRegistrySheet registryId={registry.id} />
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={(e) => e.preventDefault()}
          className="bg-red-300 hover:bg-red-400 flex items-center"
        >
          <Trash size={14} className="text-red-700" />
          <DeleteRegistryDialog
            eventRegistry={registry}
            workspaceId={workspace!.id}
            tenantId={tenant!.id}
          />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default RegistryActions;
