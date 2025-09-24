import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
}); // this is the schema for the registration form validation

export const resetPasswordSchema = z.object({
  token: z.string().min(1, "Missing token"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export type RegisterInput = z.infer<typeof registerSchema>; // this is the type for the registration form validation
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
