import { z } from "zod";

const endpointRequestSchema = z.object({
  name: z.string(),
  description: z.string(),
  isActive: z.boolean(),
  url: z.string().url(),
  method: z.number(),
  serviceId: z.string(),
  workspaceId: z.string(),
  tenantId: z.string(),
  secret: z.string(),
  eventRegistryId: z.string(),
  events: z.array(z.string()),
  source: z.string(),
  subject: z.string(),
  headers: z.record(z.string(), z.string()),
});

export { endpointRequestSchema };
