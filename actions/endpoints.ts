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
    console.log("error", error);
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

const deleteEndpoint = async (
  tenantId: string,
  workspaceId: string,
  serviceId: string,
  endpointId: string
) => {
  try {
    const res = await axios.delete(
      `/api/v1/${tenantId}/workspaces/${workspaceId}/services/${serviceId}/endpoints/${endpointId}`
    );
    return res.data;
  } catch (error) {
    console.log("error", error);
    throw new Error("Error: Failed to delete endpoint.");
  }
};
const setActiveStatus = async (
  tenantId: string,
  workspaceId: string,
  servicesId: string,
  endpointId: string,
  status: boolean
) => {
  const baseUrl = `/api/v1/${tenantId}/workspaces/${workspaceId}/services/${servicesId}/endpoints`;
  const url = `${baseUrl}/${endpointId}/${status ? "activate" : "deactivate"}`;

  try {
    const res = await axios.patch(url);
    return res.data;
  } catch (error) {
    console.log("error", error);
    throw new Error("Error: Failed to set active status.");
  }
};

export { getEndpoints, createEndpoint, deleteEndpoint, setActiveStatus };
