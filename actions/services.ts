"use server";

import axios from "@/queries/axiosInstance";
import { serviceRequestSchema } from "@/schemas/service";
import { ApiResponse, Service } from "@/types";
import { z } from "zod";

const getServices = async (
  tenantId: string,
  workspaceId: string
): Promise<ApiResponse<Service[]>> => {
  try {
    console.log("tenantId", tenantId);
    console.log("workspaceId", workspaceId);
    const { data } = await axios.get(
      `/api/v1/${tenantId}/workspaces/${workspaceId}/services/list`
    );
    return data;
  } catch (error) {
    throw new Error("Error: Failed to fetch services.");
  }
};

const getServiceById = async (
  tenantId: string,
  workspaceId: string,
  serviceId: string
): Promise<ApiResponse<Service>> => {
  try {
    console.log({ tenantId, workspaceId, serviceId });
    const { data } = await axios.get(
      `/api/v1/${tenantId}/workspaces/${workspaceId}/services/${serviceId}`
    );
    return data;
  } catch (error) {
    throw new Error("Error: Failed to fetch service.");
  }
};

const createService = async (
  tenantId: string,
  workspaceId: string,
  formData: z.infer<typeof serviceRequestSchema>
) => {
  const { name, description } = serviceRequestSchema.parse(formData);
  try {
    const res = await axios.post(
      `/api/v1/${tenantId}/workspaces/${workspaceId}/services`,
      {
        name,
        description,
      }
    );
    console.log("res", res);
    return res.data;
  } catch (error) {
    throw new Error("Error: Failed to create service.");
  }
};

const deleteService = async (
  tenantId: string,
  workspaceId: string,
  serviceId: string
) => {
  try {
    const res = await axios.delete(
      `/api/v1/${tenantId}/workspaces/${workspaceId}/services/${serviceId}`
    );
    console.log("res", res);
    return res.data;
  } catch (error) {
    throw new Error("Error: Failed to delete service.");
  }
};

const setActiveStatus = async (
  id: string,
  status: boolean,
  tenantId: string,
  workspaceId: string
) => {
  const baseUrl = `/api/v1/${tenantId}/workspaces/${workspaceId}/services`;
  const url = `${baseUrl}/${id}/${status ? "activate" : "deactivate"}`;

  try {
    const res = await axios.patch(url);
    console.log("Response:", res);
    return res.data;
  } catch (error) {
    throw new Error("Error: Failed to set active status.");
  }
};

const updateService = async (
  tenantId: string,
  workspaceId: string,
  serviceId: string,
  formData: z.infer<typeof serviceRequestSchema>
) => {
  const { name, description } = serviceRequestSchema.parse(formData);
  try {
    const res = await axios.put(
      `/api/v1/${tenantId}/workspaces/${workspaceId}/services/${serviceId}`,
      {
        name,
        description,
      }
    );
    return res.data;
  } catch (error) {
    throw new Error("Error: Failed to update service.");
  }
};

export {
  getServices,
  getServiceById,
  createService,
  setActiveStatus,
  deleteService,
  updateService,
};
