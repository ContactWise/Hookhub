"use server";

import axios from "@/queries/axiosInstance";
import { z } from "zod";
import { ApiResponse, EndpointResource } from "@/types";
import { endpointRequestSchema } from "@/schemas/endpoint";

const getEndpoints = async (
  tenantId: string,
  workspaceId: string,
  serviceId: string
): Promise<ApiResponse<EndpointResource[]>> => {
  try {
    const { data } = await axios.get(
      `/api/v1/${tenantId}/workspaces/${workspaceId}/services/${serviceId}/endpoints/list`
    );
    return data;
  } catch (error) {
    throw new Error("Error: Failed to fetch endpoints.");
  }
};

const createEndpoint = async (
  tenantId: string,
  workspaceId: string,
  serviceId: string,
  formData: z.infer<typeof endpointRequestSchema>
) => {
  const data = endpointRequestSchema.parse(formData);
  console.log("datafor", { data });
  try {
    const res = await axios.post(
      `/api/v1/${tenantId}/workspaces/${workspaceId}/services/${serviceId}/endpoints`,
      data
    );
    console.log("res", res);
    return res.data;
  } catch (error) {
    console.log("error", error);
    throw new Error("Error: Failed to create endpoint.");
  }
};
// const createEndpoint = async (
//   tenantId: string,
//   workspaceId: string,
//   serviceId: string,
//   formData: z.infer<typeof endpointRequestSchema>
// ) => {
//   const data = endpointRequestSchema.parse(formData);
//   console.log("datafor", { data });
//   try {
//     const res = await axios.post(
//       `/api/v1/${tenantId}/workspaces/${workspaceId}/services/${serviceId}/endpoints`,
//       {
//         data,
//       }
//     );
//     console.log("res", res);
//     return res.data;
//   } catch (error) {
//     console.log("error", error);
//     throw new Error("Error: Failed to create endpoint.");
//   }
// };

export { getEndpoints, createEndpoint };
