"use client";

import CustomDialog from "@/components/custom/dialog";
import { cn } from "@/lib/utils";

import { useEnvironmentContext } from "@/context/envContext";
import { getTenants } from "@/queries/getUserDetails";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Typography from "@/components/custom/typography";
import {
  CredentialResource,
  EndpointResource,
  Service,
  Tenant,
  Workspace,
} from "@/types";
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
import { deleteCredential } from "@/actions/credentials";
import { deleteEndpoint } from "@/actions/endpoints";

interface deleteEndpointInput {
  tenantId: string;
  workspaceId: string;
  serviceId: string;
  endpoint: EndpointResource;
}
const DeleteEndpointDialog = ({
  tenantId,
  serviceId,
  workspaceId,
  endpoint,
  children,
}: {
  serviceId: string;
  tenantId: string;
  workspaceId: string;
  endpoint: EndpointResource;
  children: React.ReactNode;
}) => {
  const { mutateAsync } = useMutation({
    mutationFn: (values: deleteEndpointInput) =>
      deleteEndpoint(
        values.tenantId,
        values.workspaceId,
        values.serviceId,
        values.endpoint.id
      ),
  });

  const handleDelete = () => {
    return toast.promise(
      mutateAsync({
        tenantId: tenantId,
        workspaceId: workspaceId,
        serviceId: serviceId,
        endpoint: endpoint,
      }),
      {
        loading: "Deleting endpoint...",
        success: "Endpoint deleted successfully",
        error: "An error occurred while deleting endpoint",
      }
    );
  };

  return (
    <CustomDialog trigger={children}>
      <Typography variant="cardTitle">Delete Endpoint</Typography>
      <div className="flex flex-col gap-3 p-1 pt-0">
        <Typography variant="cardDescription">
          {`Are you sure you want to delete `}
          <strong>{endpoint.name}</strong>
          {` endpoint?`}
        </Typography>
        <Button variant={"destructive"} onClick={handleDelete}>
          Delete Endpoint
        </Button>
      </div>
    </CustomDialog>
  );
};

export default DeleteEndpointDialog;
