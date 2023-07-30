import { z } from 'zod'

export const authSchema = z.object({
  email: z.string().email('Valid email required'),
  password: z.string(),
})

export type AuthSchema = z.infer<typeof authSchema>
