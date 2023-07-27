import { apiHandler } from '@/lib/api-handler'
import prisma from '@/lib/db'
import ironSessionOptions from '@/lib/iron-session-options'
import { User } from '@/lib/models/user'
import { validateSchema } from '@/lib/validate-schema'
import bcrypt from 'bcrypt'
import { withIronSessionApiRoute } from 'iron-session/next'
import type { NextApiRequest, NextApiResponse } from 'next'
import { z } from 'zod'

const signupSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

const signupRoute = async (req: NextApiRequest, res: NextApiResponse<User>) => {
  const { email, password } = validateSchema(req.body, signupSchema)

  const user = await prisma.user.create({
    data: {
      email,
      password: bcrypt.hashSync(password, 10),
    },
    select: { id: true, email: true, name: true },
  })

  req.session.user = user
  await req.session.save()

  res.status(200).json(user)
}

export default apiHandler({
  POST: withIronSessionApiRoute(signupRoute, ironSessionOptions),
})
