"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEnvironmentContext } from "@/context/envContext";
import { getWorkspaces } from "@/queries/getUserDetails";
import { Workspace } from "@/types";
import { useQuery } from "@tanstack/react-query";
import React, { forwardRef, useEffect } from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { cn } from "@/lib/utils";
import { PlusCircle } from "lucide-react";
import CreateWorkspaceDialog from "../createWorkspaceDialog";

const WorkspaceSelect = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => {
  const { tenant, workspace, setTenant, setWorkspace } =
    useEnvironmentContext();
  const {
    data: workspacesData,
    isFetched: isWorkspacesFetched,
    error: workspacesDataError,
    isLoading: isWorkspacesLoading,
    refetch,
  } = useQuery({
    queryKey: ["getWorkspaces"],
    queryFn: () => getWorkspaces(tenant!.id),
    enabled: !!tenant,
  });

  useEffect(() => {
    refetch();
  }, [tenant]);

  return (
    <Select>
      <SelectTrigger className={cn(className)} {...props}>
        <SelectValue placeholder="Workspace" />
      </SelectTrigger>
      <SelectContent>
        {isWorkspacesFetched && workspacesData?.data.length > 0 ? (
          workspacesData.data.map((item: Workspace) => (
            <SelectItem
              key={item.id}
              onClick={() => {
                setWorkspace(item);
              }}
              value={item.name}
            >
              {item.name}
            </SelectItem>
          ))
        ) : (
          <SelectItem value="No workspaces found">
            No workspaces found
          </SelectItem>
        )}
        <CreateWorkspaceDialog />
      </SelectContent>
    </Select>
  );
});
WorkspaceSelect.displayName = SelectPrimitive.Trigger.displayName;
// const WorkspaceSelect = () => {
//   const { tenant, workspace, setTenant, setWorkspace } =
//     useEnvironmentContext();
//   const {
//     data: workspacesData,
//     isFetched: isWorkspacesFetched,
//     error: workspacesDataError,
//     isLoading: isWorkspacesLoading,
//     refetch,
//   } = useQuery({
//     queryKey: ["getWorkspaces"],
//     queryFn: () => getWorkspaces(tenant!.id),
//     enabled: !!tenant,
//   });

//   useEffect(() => {
//     refetch();
//   }, [tenant]);

//   return (
//     <Select>
//       <SelectTrigger className="w-[180px]">
//         <SelectValue placeholder="Workspace" />
//       </SelectTrigger>
//       <SelectContent>
//         {isWorkspacesFetched && workspacesData?.data.length > 0 ? (
//           workspacesData.data.map((item: Workspace) => (
//             <SelectItem
//               key={item.id}
//               onClick={() => {
//                 setWorkspace(item);
//               }}
//               value={item.name}
//             >
//               {item.name}
//             </SelectItem>
//           ))
//         ) : (
//           <SelectItem value="No workspaces found">
//             No workspaces found
//           </SelectItem>
//         )}
//       </SelectContent>
//     </Select>
//   );
// };

export default WorkspaceSelect;
