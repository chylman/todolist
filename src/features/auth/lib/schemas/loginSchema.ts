import { z } from 'zod/v4'

export type LoginInputs = z.infer<typeof loginSchema>

export const loginSchema = z.object({
  email: z.email({ error: 'Incorrect email address' }),
  password: z.string().trim().min(1, { error: 'Password is required' }),
  rememberMe: z.boolean(),
})
