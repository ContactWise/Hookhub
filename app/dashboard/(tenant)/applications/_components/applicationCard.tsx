"use client";

import { setActiveStatus } from "@/actions/services";
import Typography from "@/components/custom/typography";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useEnvironmentContext } from "@/context/envContext";
import { cn } from "@/lib/utils";
import { Service } from "@/types";
import { QueryClient, useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { FC, useState } from "react";
import { toast } from "sonner";

export interface Application {
  isActive: boolean;
  name: string;
  description: string;
}

export interface ApplicationCardProps {
  application: Service;
}

const ApplicationCard: FC<ApplicationCardProps> = React.forwardRef<
  HTMLDivElement,
  ApplicationCardProps & React.HTMLAttributes<HTMLDivElement>
>(({ application, className, ...props }, ref) => {
  const [isActive, setIsActive] = useState(application.isActive);
  const { tenant, workspace } = useEnvironmentContext();

  const router = useRouter();
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
        applicationId: application.id,
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
    <Card ref={ref} {...props} className={cn("", className)}>
      <CardContent className="items-center justify-center flex px-6 py-6">
        <div className="flex w-full justify-between items-center">
          <div className="flex flex-col justify-center">
            {/* <h1 className="font-semibold">{application.title}</h1> */}
            <Link href={"/dashboard/application/" + application.id}>
              <Typography
                variant="cardTitle"
                className="text-primary underline"
              >
                {application.name}
              </Typography>
            </Link>
            <Typography variant="cardDescription">
              {application.description}
            </Typography>
            {/* <p>{application.description}</p> */}
          </div>
          <div className="flex gap-2">
            <Typography variant="cardDescription" className="font-semibold">
              Status:
            </Typography>
            <Switch
              className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-red-500"
              checked={isActive}
              onCheckedChange={handleSwitchChange}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
});

ApplicationCard.displayName = "Card";

export default ApplicationCard;
