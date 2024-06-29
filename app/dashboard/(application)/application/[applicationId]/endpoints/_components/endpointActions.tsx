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
import { CredentialResource, EndpointResource, Service } from "@/types";
import { EllipsisVertical, Trash } from "lucide-react";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import { useEnvironmentContext } from "@/context/envContext";
("./deleteCredentialsDialog");
import { Switch } from "@/components/ui/switch";
import { setActiveStatus } from "@/actions/endpoints";
import Typography from "@/components/custom/typography";
import EditServiceSheet from "@/app/dashboard/(application)/application/[applicationId]/_components/editServiceSheet";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import DeleteEndpointDialog from "./deleteEndpointDialog";

type Checked = DropdownMenuCheckboxItemProps["checked"];
const EndpointActions = ({
  serviceId,
  endpoint,
}: {
  serviceId: string;
  endpoint: EndpointResource;
}) => {
  const { tenant, workspace } = useEnvironmentContext();
  const [isActive, setIsActive] = React.useState(endpoint.isActive);
  const { mutateAsync: updateStatusAsync } = useMutation({
    mutationFn: async ({
      serviceId,
      endpointId,
      newStatus,
      tenantId,
      workspaceId,
    }: {
      serviceId: string;
      newStatus: boolean;
      tenantId: string;
      endpointId: string;
      workspaceId: string;
    }) => {
      return setActiveStatus(
        tenantId,
        workspaceId,
        serviceId,
        endpointId,
        newStatus
      );
    },
    onSuccess: () => {
      console.log("Status updated successfully");
    },
    onError: (error: any) => {
      console.error("Failed to update status", error);
    },
  });

  // const handleSwitchChange = async (newStatus: boolean) => {
  //   setIsActive(newStatus);
  //   await setActiveStatus(tenant!.id, workspace!.id, credential.id, newStatus);
  // };
  const handleSwitchChange = async (newStatus: boolean) => {
    setIsActive(newStatus);
    return toast.promise(
      updateStatusAsync({
        serviceId: serviceId,
        endpointId: endpoint.id,
        newStatus: newStatus,
        tenantId: tenant!.id,
        workspaceId: workspace!.id,
      }),
      {
        loading: "Updating status...",
        success(data) {
          return "Status updated successfully";
        },
        error: "Failed to update status",
      }
    );
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
          <DeleteEndpointDialog
            serviceId={serviceId}
            workspaceId={workspace!.id}
            tenantId={tenant!.id}
            endpoint={endpoint}
          >
            <span>Delete Endpoint</span>
          </DeleteEndpointDialog>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default EndpointActions;
