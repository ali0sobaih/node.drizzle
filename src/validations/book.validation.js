import { z } from "zod";

export const publishBookSchema = z.object({
    title: z.string().min(1, "title is required"),
    description: z.string(),
});
