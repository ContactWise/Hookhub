"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ApplicationCard, { Application } from "./_components/applicationCard";
import Typography from "@/components/custom/typography";
import CreateApplicationSheet from "./_components/createApplicationSheet";
import { useRouter } from "next/navigation";

const DashboardPage = () => {
  const router = useRouter();
  const count: Application[] = [
    {
      status: true,
      title: "Application 1",
      description: "This is a description of the application",
    },
    {
      status: false,
      title: "Application 2",
      description: "This is a description of the application",
    },
    {
      status: true,
      title: "Application 3",
      description: "This is a description of the application",
    },
  ];
  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex w-full justify-between">
        <Typography variant="pageTitle">Applications</Typography>
        <CreateApplicationSheet>
          <Button>Create New Application +</Button>
        </CreateApplicationSheet>
      </div>
      <div className="w-full flex flex-col mt-4 gap-2">
        {count.map((item, index) => {
          return (
            <div
              key={index}
              onClick={() => router.push("/dashboard/application/213")}
            >
              <ApplicationCard application={item} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DashboardPage;
