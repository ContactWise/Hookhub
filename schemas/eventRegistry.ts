import { z } from "zod";

const eventRegistryRequestSchema = z.object({
  name: z.string().min(3),
  description: z.string().min(10),
});

const createEventRequestSchema = z.object({
  name: z.string().min(3),
});
export { eventRegistryRequestSchema, createEventRequestSchema };
