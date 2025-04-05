import { z } from "zod";

export const createUserSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email format"),
    password: z.string().min(8, "min pw is 8").max(20, "max pw is 20")
  });
  
  export const loginSchema = z.object({
    email: z.string().email("Invalid email format"),
    password: z.string().min(8, "Password must be at least 8 characters")
  });
  
  export const becomeAuthor = z.object({
    name: z.string().min(1, "Name is required"),
    bio: z.string().optional(),
  });
  