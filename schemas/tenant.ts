import { z } from "zod";

const tenantRequestSchema = z.object({
  name: z.string().min(3),
  description: z.string().min(10),
});

export { tenantRequestSchema };
