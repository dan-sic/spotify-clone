import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcrypt'
import prisma from '@/lib/db'
import { withIronSessionApiRoute } from 'iron-session/next'
import ironSessionOptions from '@/lib/iron-session-options'
import { apiHandler } from '@/lib/api-handler'
import { z } from 'zod'
import { validateSchema } from '@/lib/validate-schema'
import createHttpError from 'http-errors'
import { User } from '@/lib/models/user'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

const loginRoute = async (req: NextApiRequest, res: NextApiResponse<User>) => {
  const { email, password: rawPassword } = validateSchema(req.body, loginSchema)

  const user = await prisma.user.findUnique({
    where: { email },
    select: { id: true, email: true, name: true, password: true },
  })

  if (!user) {
    throw new createHttpError.Unauthorized('Incorrect username or password')
  }

  const passwordMatch = bcrypt.compareSync(rawPassword, user.password)

  if (!passwordMatch) {
    throw new createHttpError.Unauthorized('Incorrect username or password')
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...trimmedUser } = user

  req.session.user = trimmedUser
  await req.session.save()

  res.status(200).json(trimmedUser)
}

export default apiHandler({
  POST: withIronSessionApiRoute(loginRoute, ironSessionOptions),
})
