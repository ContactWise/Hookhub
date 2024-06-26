"use client";

import { setActiveStatus } from "@/actions/services";
import Typography from "@/components/custom/typography";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useEnvironmentContext } from "@/context/envContext";
import { cn } from "@/lib/utils";
import { Service } from "@/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { FC, useState } from "react";

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

  const handleSwitchChange = async (newStatus: boolean) => {
    setIsActive(newStatus);
    await setActiveStatus(application.id, newStatus, tenant!.id, workspace!.id);
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
