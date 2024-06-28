import PaginatedTable from "@/components/custom/paginatedTable";
import InputForm from "@/components/formInput";
import { Copy, KeyRound } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import CopyButton from "@/components/custom/copyButton";
import RegistryCard from "./_components/registryCard";
import Typography from "@/components/custom/typography";
import CreateRegistrySheet from "./_components/createRegistrySheet";
import { getEventRegistries } from "@/actions/eventRegistries";
import { Session } from "next-auth";
import { auth } from "@/auth";
import { QueryClient } from "@tanstack/react-query";
import { CredentialResource, EventRegistryResource } from "@/types";

const RegistryPage = async () => {
  const session: Session = (await auth()) as Session;
  const queryClient = new QueryClient();

  const res = await queryClient.fetchQuery({
    queryKey: ["getRegistries"],
    queryFn: () =>
      getEventRegistries(session!.user!.tenant, session!.user!.workspace),
  });

  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex flex-col gap-2 md:gap-0 md:flex-row w-full justify-between">
        <Typography variant={"pageTitle"}>Event Registries</Typography>
        {/* <Button size={"default"}>Create New Registry +</Button> */}
        <CreateRegistrySheet>
          <Button>Create New Registry +</Button>
        </CreateRegistrySheet>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full mt-4">
        {res.data.map((item: EventRegistryResource, index: number) => {
          return <RegistryCard registry={item} key={index} />;
        })}
      </div>
    </div>
  );
};

export default RegistryPage;
