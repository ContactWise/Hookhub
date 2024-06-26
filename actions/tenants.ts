"use client";

import { tenantRequestSchema } from "@/schemas/tenant";
import axios from "axios";
import { z } from "zod";

const getTenants = async () => {
  try {
    const { data } = await axios.get("/api/v1/tenants/list");
    return data;
  } catch (error) {
    throw new Error("Error: Failed to fetch tenants.");
  }
};

const createTenant = async (formData: z.infer<typeof tenantRequestSchema>) => {
  const { name, description } = tenantRequestSchema.parse(formData);
  try {
    const res = await axios.post("/api/v1/tenants", {
      name,
      description,
    });
    return res.data;
  } catch (error) {
    throw new Error("Error: Failed to create tenant.");
  }
};

const getTenantById = async (tenantId: string) => {
  try {
    const { data } = await axios.get(`/api/v1/tenants/${tenantId}`);
    return data;
  } catch (error) {
    throw new Error("Error: Failed to fetch tenant.");
  }
};

const setActiveStatus = async (tenantId: string, status: boolean) => {
  const baseUrl = `/api/v1/tenants/${tenantId}`;
  const url = `${baseUrl}/${status ? "activate" : "deactivate"}`;
  try {
    const res = await axios.put(url);
    return res.data;
  } catch (error) {
    throw new Error("Error: Failed to update tenant status.");
  }
};

const updateTenant = async (
  tenantId: string,
  formData: z.infer<typeof tenantRequestSchema>
) => {
  const { name, description } = tenantRequestSchema.parse(formData);
  try {
    const res = await axios.put(`/api/v1/tenants/${tenantId}`, {
      name,
      description,
    });
    return res.data;
  } catch (error) {
    throw new Error("Error: Failed to update tenant.");
  }
};

const deleteTenant = async (tenantId: string) => {
  try {
    const res = await axios.delete(`/api/v1/tenants/${tenantId}`);
    return res.data;
  } catch (error) {
    throw new Error("Error: Failed to delete tenant.");
  }
};

export {
  getTenants,
  createTenant,
  getTenantById,
  setActiveStatus,
  updateTenant,
  deleteTenant,
};
