import * as z from "zod";

export const RegisterSchema = z.object({
  name: z.string().max(10),
  email: z.string().email(),
  password: z
    .string()
    .min(6, "password must be at least 6 characters")
    .max(18, "password must be less than 18 characters"),
});
