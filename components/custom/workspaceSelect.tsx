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
import { LoaderCircle, PlusCircle } from "lucide-react";
import CreateWorkspaceDialog from "../createWorkspaceDialog";
import { auth, handlers } from "@/auth";
import { useSession } from "next-auth/react";

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

  const { data: session, status, update } = useSession();

  useEffect(() => {
    console.log("session from client", session);
  }, [status, session]);
  return (
    <Select disabled={isWorkspacesLoading}>
      <SelectTrigger className={cn(className)} {...props}>
        <SelectValue
          placeholder={
            workspace ? (
              workspace.name
            ) : (
              <LoaderCircle
                size={12}
                className="animate-spin text-muted-foreground"
              />
            )
          }
        />
      </SelectTrigger>
      <SelectContent>
        {isWorkspacesFetched && workspacesData?.data.length > 0 ? (
          workspacesData.data.map((item: Workspace) => (
            <SelectItem
              key={item.id}
              onClick={async () => {
                setWorkspace(item);
                session;
                await update({ workspace: workspace });
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
