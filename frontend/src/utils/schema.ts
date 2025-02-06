import { z } from "zod";

export const registerSchema = z
  .object({
    username: z
      .string()
      .min(3)
      .max(20, "Username must be between 3 and 20 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(8),
});

export const createBookSchema = z.object({
  peminjam: z.string().min(3),
  buku: z.string().min(3),
  author: z.string().min(3),
});

export type CreateBookSchema = z.infer<typeof createBookSchema>;
export type LoginSchema = z.infer<typeof loginSchema>;
export type RegisterSchema = z.infer<typeof registerSchema>;
