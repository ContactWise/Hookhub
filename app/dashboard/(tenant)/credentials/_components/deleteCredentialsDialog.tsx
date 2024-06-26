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
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { deleteService } from "@/actions/services";
import { z } from "zod";
import { toast } from "sonner";
import { deleteCredential } from "@/actions/credentials";

interface deleteCredentialInput {
  tenantId: string;
  workspaceId: string;
  credentialId: string;
}
const DeleteCredentialDailog = ({
  credential,
  tenant,
  workspace,
}: {
  credential: CredentialResource;
  tenant: Tenant;
  workspace: Workspace;
}) => {
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: (values: deleteCredentialInput) =>
      deleteCredential(
        values.tenantId,
        values.workspaceId,
        values.credentialId
      ),
  });

  const handleDelete = () => {
    return toast.promise(
      mutateAsync({
        tenantId: tenant.id,
        workspaceId: workspace.id,
        credentialId: credential.id,
      }),
      {
        loading: "Deleting credentials...",
        success: "Credentials deleted successfully",
        error: "An error occurred while deleting credentials",
      }
    );
  };

  return (
    <CustomDialog trigger={<span>Delete Credentials</span>}>
      <Typography variant="cardTitle">Delete Credentials</Typography>
      <div className="flex flex-col gap-3 p-1 pt-0">
        <Typography variant="cardDescription">
          {`Are you sure you want to delete `}
          <strong>{credential.name}</strong>
          {` credentials?`}
        </Typography>
        <Button variant={"destructive"} onClick={handleDelete}>
          Delete Credentials
        </Button>
      </div>
    </CustomDialog>
  );
};

export default DeleteCredentialDailog;
