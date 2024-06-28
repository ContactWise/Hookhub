"use client";

import CustomDialog from "@/components/custom/dialog";
import { ScrollArea } from "../ui/scroll-area";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { useEnvironmentContext } from "@/context/envContext";
import { getTenants } from "@/queries/getUserDetails";
import { useQuery } from "@tanstack/react-query";
import Typography from "./typography";
import { Tenant } from "@/types";
import { useState } from "react";
import {
  DropdownMenuItem,
  DropdownMenuLabel,
} from "@radix-ui/react-dropdown-menu";
import { PlusCircle } from "lucide-react";
import CreateTenantDialog from "./createTenantDialog";

const SelectTenantDialog = () => {
  const {
    data: tenantsData,
    isFetched: isTenantsFetched,
    error: tenantsDataError,
    isLoading: isTenantsLoading,
  } = useQuery({
    queryKey: ["getTenants"],
    queryFn: () => getTenants(),
  });

  const { tenant, setTenant } = useEnvironmentContext();
  const [open, setOpen] = useState(false);
  return (
    <CustomDialog trigger={<span>Select Tenant</span>}>
      <Typography variant="cardTitle">Select Tenant</Typography>
      <ScrollArea className="h-80">
        <div className="flex flex-col gap-2 p-2 pt-0">
          {isTenantsLoading ? (
            <div>Loading...</div>
          ) : isTenantsFetched && tenantsData?.data?.length > 0 ? (
            <>
              {tenantsData.data.map((item: Tenant) => (
                <button
                  onClick={() => {
                    setTenant(item);
                    setOpen(false);
                  }}
                  key={item.id}
                  className={cn(
                    "flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent",
                    tenant?.id === item.id && "bg-muted"
                  )}
                >
                  <div className="flex w-full flex-col gap-1">
                    <div className="flex items-center">
                      <div className="flex items-center gap-2">
                        <div className="font-semibold">{item.name}</div>
                      </div>
                    </div>
                    <div className="line-clamp-2 text-xs text-muted-foreground">
                      {item.description.substring(0, 300)}
                    </div>
                  </div>
                </button>
              ))}
            </>
          ) : (
            <div>No tenants found</div>
          )}

          <CreateTenantDialog />
        </div>
      </ScrollArea>
    </CustomDialog>
  );
};

export default SelectTenantDialog;
