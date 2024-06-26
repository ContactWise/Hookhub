"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ApplicationCard, { Application } from "./_components/applicationCard";
import Typography from "@/components/custom/typography";
import CreateApplicationSheet from "./_components/createApplicationSheet";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getServices } from "@/actions/services";
import { useEnvironmentContext } from "@/context/envContext";
import { Service } from "@/types";
import { useEffect } from "react";

const DashboardPage = () => {
  const router = useRouter();

  const { tenant, workspace } = useEnvironmentContext();
  const { data, isLoading, isFetched, error, refetch } = useQuery({
    queryKey: ["fetchServices"],
    queryFn: () => getServices(tenant!.id, workspace!.id),
    enabled: !!tenant && !!workspace,
  });

  useEffect(() => {
    console.log(tenant, workspace);
  }, [tenant, workspace]);

  useEffect(() => {
    refetch();
  }, [workspace]);

  useEffect(() => {
    if (isFetched) {
      console.log(data);
    }
  }, [isFetched, data]);

  return (
    <div className="flex flex-col items-center w-full h-full">
      <div className="flex w-full justify-between">
        <Typography variant="pageTitle">Services</Typography>
        <CreateApplicationSheet>
          <Button>Create New Service +</Button>
        </CreateApplicationSheet>
      </div>
      <div className="w-full flex flex-col mt-4 gap-2 h-full">
        {isLoading ? (
          <Typography>Loading...</Typography>
        ) : isFetched && data!.data.length > 0 ? (
          data!.data.map((item: Service, index: number) => {
            return (
              <div key={index}>
                <ApplicationCard application={item} />
              </div>
            );
          })
        ) : (
          <div className="flex flex-col justify-center items-center w-full flex-1 border-dashed bordermu border-2 rounded-lg">
            <Typography variant="subTItle">No services created</Typography>
            <Typography variant="pageDescription">
              Start by creating a new service
            </Typography>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
