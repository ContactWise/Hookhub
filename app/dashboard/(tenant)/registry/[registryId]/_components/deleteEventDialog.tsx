"use client";

import CustomDialog from "@/components/custom/dialog";
import { cn } from "@/lib/utils";

import { useEnvironmentContext } from "@/context/envContext";
import { getTenants } from "@/queries/getUserDetails";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Typography from "@/components/custom/typography";
import { CredentialResource, Service, Tenant, Workspace } from "@/types";
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
import { deleteEvent } from "@/actions/eventRegistries";

interface deleteCredentialInput {
  tenantId: string;
  workspaceId: string;
  eventRegistryId: string;
  eventName: string;
}
const DeleteEventDialog = ({
  eventRegistryId,
  eventName,
}: {
  eventRegistryId: string;
  eventName: string;
}) => {
  const { workspace, tenant } = useEnvironmentContext();

  const { mutateAsync } = useMutation({
    mutationFn: (values: deleteCredentialInput) =>
      deleteEvent(
        values.tenantId,
        values.workspaceId,
        values.eventRegistryId,
        values.eventName
      ),
  });

  const handleDelete = () => {
    return toast.promise(
      mutateAsync({
        tenantId: tenant!.id,
        workspaceId: workspace!.id,
        eventRegistryId: eventRegistryId,
        eventName: eventName,
      }),
      {
        loading: "Deleting event...",
        success: "Event deleted successfully",
        error: "An error occurred while deleting event",
      }
    );
  };

  return (
    <CustomDialog
      trigger={
        <Button variant="ghost">
          <Trash className="text-destructive" />
        </Button>
      }
    >
      <Typography variant="cardTitle">Delete Event</Typography>
      <div className="flex flex-col gap-3 p-1 pt-0">
        <Typography variant="cardDescription">
          {`Are you sure you want to delete `}
          <strong>{eventName}</strong>
          {` event?`}
        </Typography>
        <Button variant={"destructive"} onClick={handleDelete}>
          Delete Event
        </Button>
      </div>
    </CustomDialog>
  );
};

export default DeleteEventDialog;
