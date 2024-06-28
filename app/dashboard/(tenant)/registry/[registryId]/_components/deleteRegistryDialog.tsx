"use client";

import CustomDialog from "@/components/custom/dialog";
import { cn } from "@/lib/utils";

import { useEnvironmentContext } from "@/context/envContext";
import { getTenants } from "@/queries/getUserDetails";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Typography from "@/components/custom/typography";
import {
  CredentialResource,
  EventRegistryResource,
  Service,
  Tenant,
  Workspace,
} from "@/types";
import { useState } from "react";
import {
  DropdownMenuItem,
  DropdownMenuLabel,
} from "@radix-ui/react-dropdown-menu";
import { PlusCircle, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { deleteService } from "@/actions/services";
import { z } from "zod";
import { toast } from "sonner";
import { deleteCredential } from "@/actions/credentials";
import { deleteEvent, deleteEventRegistry } from "@/actions/eventRegistries";
import { useRouter } from "next/navigation";

interface deleteCredentialInput {
  tenantId: string;
  workspaceId: string;
  eventRegistryId: string;
}
const DeleteRegistryDialog = ({
  eventRegistry,
  workspaceId,
  tenantId,
}: {
  eventRegistry: EventRegistryResource;
  workspaceId: string;
  tenantId: string;
}) => {
  const router = useRouter();
  const { mutateAsync } = useMutation({
    mutationFn: (values: deleteCredentialInput) =>
      deleteEventRegistry(
        values.tenantId,
        values.workspaceId,
        values.eventRegistryId
      ),
    onSuccess: () => {
      router.push("/dashboard/registry");
    },
  });

  const handleDelete = () => {
    return toast.promise(
      mutateAsync({
        tenantId: tenantId,
        workspaceId: workspaceId,
        eventRegistryId: eventRegistry.id,
      }),
      {
        loading: "Deleting registry...",
        success: "Registry deleted successfully",
        error: "An error occurred while deleting registry",
      }
    );
  };

  return (
    <CustomDialog trigger={<span>Delete Registry</span>}>
      <Typography variant="cardTitle">Delete Registry</Typography>
      <div className="flex flex-col gap-3 p-1 pt-0">
        <Typography variant="cardDescription">
          {`Are you sure you want to delete `}
          <strong>{eventRegistry.name}</strong>
          {` registry?`}
        </Typography>
        <Button variant={"destructive"} onClick={handleDelete}>
          Delete Registry
        </Button>
      </div>
    </CustomDialog>
  );
};

export default DeleteRegistryDialog;
