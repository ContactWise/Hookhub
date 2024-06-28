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
import { Switch } from "@/components/ui/switch";
import { setActiveStatus } from "@/actions/services";
import Typography from "@/components/custom/typography";
import EditServiceSheet from "./editServiceSheet";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

type Checked = DropdownMenuCheckboxItemProps["checked"];

const ServiceActions = ({ service }: { service: Service }) => {
  const { tenant, workspace } = useEnvironmentContext();

  const [isActive, setIsActive] = React.useState(service.isActive);
  const queryClient = new QueryClient();
  const { mutateAsync: updateStatusAsync } = useMutation({
    mutationFn: async ({
      applicationId,
      newStatus,
      tenantId,
      workspaceId,
    }: {
      applicationId: string;
      newStatus: boolean;
      tenantId: string;
      workspaceId: string;
    }) => {
      return setActiveStatus(applicationId, newStatus, tenantId, workspaceId);
    },
    onSuccess: () => {
      console.log("Status updated successfully");
      queryClient.invalidateQueries();
    },
    onError: (error: any) => {
      console.error("Failed to update status", error);
    },
  });

  const handleSwitchChange = async (newStatus: boolean) => {
    setIsActive(newStatus);
    return toast.promise(
      updateStatusAsync({
        applicationId: service.id,
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
        <Button variant="outline">Actions</Button>
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
          className="bg-red-300 hover:bg-red-400"
        >
          <Trash size={14} className="text-red-700" />
          <DeleteServiceDialog
            service={service}
            workspace={workspace!}
            tenant={tenant!}
          />
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <EditServiceSheet serviceId={service.id} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ServiceActions;
