import { apiHandler } from '@/lib/api-handler'
import prisma from '@/lib/db'
import ironSessionOptions from '@/lib/iron-session-options'
import { User } from '@/lib/models/user'
import { validateSchema } from '@/lib/validate-schema'
import { authSchema } from '@/lib/validation-schemas/auth-schema'
import bcrypt from 'bcrypt'
import createHttpError from 'http-errors'
import { withIronSessionApiRoute } from 'iron-session/next'
import type { NextApiRequest, NextApiResponse } from 'next'

const signupRoute = async (req: NextApiRequest, res: NextApiResponse<User>) => {
  const { email, password } = validateSchema(req.body, authSchema)

  const existingUser = await prisma.user.findUnique({
    where: { email },
  })

  if (existingUser) {
    throw new createHttpError.Conflict('Email already in use')
  }

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
