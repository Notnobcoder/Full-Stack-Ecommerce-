import { z } from "zod";

export const AuthSchema = z.object({
  username: z.string().min(1, "username is required"),
  email: z.string().email().min(1, "email is required"),
  password: z.string().min(1, "password is required"),

})
