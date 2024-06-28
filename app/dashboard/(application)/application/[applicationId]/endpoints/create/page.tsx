"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import CreateEndpointForm from "./_components/createEndpointForm";
import Typography from "@/components/custom/typography";
import { usePathname } from "next/navigation";

const CreateEndpointPage = () => {
  const path = usePathname();
  const pathSegments = path.split("/");
  const applicationIndex = pathSegments.findIndex(
    (segment) => segment === "application"
  );
  const serviceId = pathSegments[applicationIndex + 1];
  console.log("ServiceId", serviceId);

  return (
    <>
      <Typography variant={"pageTitle"}>Your Endpoints</Typography>
      <ScrollArea className="flex flex-1 p-2 justify-center rounded-lg border border-dashed shadow-sm ">
        <CreateEndpointForm serviceId={serviceId} />
      </ScrollArea>
    </>
  );
};

export default CreateEndpointPage;
