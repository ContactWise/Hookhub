"use client";

import Typography from "@/components/custom/typography";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import React, { FC, useState } from "react";

export interface Application {
  status: boolean;
  title: string;
  description: string;
}

export interface ApplicationCardProps {
  application: Application;
}

const ApplicationCard: FC<ApplicationCardProps> = React.forwardRef<
  HTMLDivElement,
  ApplicationCardProps & React.HTMLAttributes<HTMLDivElement>
>(({ application, className, ...props }, ref) => {
  return (
    <Card ref={ref} {...props} className={cn("", className)}>
      <CardContent className="items-center justify-center flex px-6 py-6">
        <div className="flex w-full justify-between items-center">
          <div className="flex flex-col justify-center">
            {/* <h1 className="font-semibold">{application.title}</h1> */}
            <Typography variant="cardTitle">{application.title}</Typography>
            <Typography variant="cardDescription">
              {application.description}
            </Typography>
            {/* <p>{application.description}</p> */}
          </div>
          {application.status ? (
            <Badge variant={"success"}>Active</Badge>
          ) : (
            <Badge variant={"destructive"}>Inactive</Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
});

ApplicationCard.displayName = "Card";

export default ApplicationCard;
