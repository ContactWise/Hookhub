"use client";

import CustomDialog from "@/components/custom/dialog";
import { cn } from "@/lib/utils";

import { useEnvironmentContext } from "@/context/envContext";
import { getTenants } from "@/queries/getUserDetails";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Typography from "@/components/custom/typography";
import { Service, Tenant, Workspace } from "@/types";
import { useState } from "react";
import {
  DropdownMenuItem,
  DropdownMenuLabel,
} from "@radix-ui/react-dropdown-menu";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { deleteService } from "@/actions/services";
import { z } from "zod";
import { toast } from "sonner";

interface deleteServiceInput {
  tenantId: string;
  workspaceId: string;
  serviceId: string;
}
const DeleteServiceDialog = ({
  service,
  tenant,
  workspace,
}: {
  service: Service;
  tenant: Tenant;
  workspace: Workspace;
}) => {
  const queryClient = useQueryClient();
  //   const { mutateAsync } = useMutation(deleteService, {
  //     onSuccess: () => {
  //       // refetch the articles list
  //       queryClient.invalidateQueries("articles");
  //     },
  //   });
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (values: deleteServiceInput) =>
      deleteService(values.tenantId, values.workspaceId, values.serviceId),
    onSuccess: () => {
      // queryClient.invalidateQueries(["getService"]);
      toast.success("Service deleted successfully");
    },
  });

  const handleDelete = () => {
    mutateAsync({
      tenantId: tenant.id,
      workspaceId: workspace.id,
      serviceId: service.id,
    }); // Assuming `service.id` is the identifier for the service to be deleted
  };

  return (
    <CustomDialog trigger={<span>Delete Tenant</span>}>
      <Typography variant="cardTitle">Delete Service</Typography>
      <div className="flex flex-col gap-3 p-1 pt-0">
        <Typography variant="cardDescription">
          Are you sure you want to delete {service.name} service?
        </Typography>
        <Button variant={"destructive"} onClick={handleDelete}>
          Delete Service
        </Button>
      </div>
    </CustomDialog>
  );
};

export default DeleteServiceDialog;
