"use client";

import { getEndpoints } from "@/actions/endpoints";
import LoadingDots from "@/components/custom/loadingDots";
import PaginatedTable from "@/components/custom/paginatedTable";
import Typography from "@/components/custom/typography";
import { Button } from "@/components/ui/button";
import { useEnvironmentContext } from "@/context/envContext";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import Link from "next/link";
import EndpointActions from "./endpointActions";

const EndpointsTable = ({ serviceId }: { serviceId: string }) => {
  const { tenant, workspace } = useEnvironmentContext();

  const COLUMNS = [
    {
      name: "id",
      label: "ID",
    },
    {
      name: "name",
      label: "Name",
    },
    {
      name: "url",
      label: "Url",
    },
    {
      name: "events",
      label: "Events",
      render: (item: any) => (
        <span className="truncate max-w-xs">{`[${item.events.join(", ")}]`}</span>
      ),
    },
    {
      name: "actions",
      label: "Actions",
      render: (item: any) => {
        return <EndpointActions endpoint={item} serviceId={serviceId} />;
      },
    },
  ];

  const { isLoading, isError, error, data, isFetched, isPlaceholderData } =
    useQuery({
      queryKey: ["getEndpoints"],
      queryFn: () => getEndpoints(tenant!.id, workspace!.id, serviceId),
      placeholderData: keepPreviousData,
    });

  if (isFetched) {
    console.log(data!.data);
  }

  return (
    <div className="h-full">
      {isLoading || !isFetched ? (
        <div className="w-full flex-1 flex flex-col justify-center items-center">
          <LoadingDots />
          {/* <Typography variant={"pageDescription"}>Loading...</Typography> */}
        </div>
      ) : isFetched && data!.data.length > 0 ? (
        <PaginatedTable columns={COLUMNS} data={data!.data} />
      ) : (
        <div className="flex flex-col justify-center items-center w-full flex-1 h-full border-dashed bordermu border-2 rounded-lg">
          <Typography variant="subTItle">No endpoints created</Typography>
          <Typography variant="pageDescription">
            Start by creating a new endpoint
          </Typography>
        </div>
      )}
    </div>
  );
};

export default EndpointsTable;
