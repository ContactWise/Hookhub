import { z } from "zod";

const serviceRequestSchema = z.object({
  name: z.string().min(3),
  description: z.string().min(10),
});

export { serviceRequestSchema };
