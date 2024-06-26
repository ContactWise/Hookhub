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
import { CredentialResource, Service } from "@/types";
import { EllipsisVertical, Trash } from "lucide-react";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import { useEnvironmentContext } from "@/context/envContext";
import DeleteCredentialDailog from "./deleteCredentialsDialog";
("./deleteCredentialsDialog");
import { Switch } from "@/components/ui/switch";
import { setActiveStatus } from "@/actions/credentials";
import Typography from "@/components/custom/typography";
import EditServiceSheet from "@/app/dashboard/(tenant)/applications/_components/editServiceSheet";

type Checked = DropdownMenuCheckboxItemProps["checked"];

const CredentialActions = ({
  credential,
}: {
  credential: CredentialResource;
}) => {
  const { tenant, workspace } = useEnvironmentContext();

  const [isActive, setIsActive] = React.useState(credential.isActive);

  const handleSwitchChange = async (newStatus: boolean) => {
    setIsActive(newStatus);
    await setActiveStatus(tenant!.id, workspace!.id, credential.id, newStatus);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <EllipsisVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>
          <div className="flex gap-2 items-center">
            <Typography variant="cardDescription" className="font-semibold">
              Status:
            </Typography>
            <Switch
              className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-red-500"
              checked={isActive}
              onCheckedChange={handleSwitchChange}
            />
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onSelect={(e) => e.preventDefault()}
          className="bg-red-300 hover:bg-red-400 flex items-center"
        >
          <Trash size={14} className="text-red-700" />
          <DeleteCredentialDailog
            credential={credential}
            workspace={workspace!}
            tenant={tenant!}
          />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CredentialActions;
