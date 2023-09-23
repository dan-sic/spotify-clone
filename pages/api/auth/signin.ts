import { apiHandler } from '@/lib/api/api-handler'
import prisma from '@/prisma/db-client'
import ironSessionOptions from '@/lib/api/iron-session-options'
import { User } from '@/lib/models/user'
import { validateSchema } from '@/lib/api/validate-schema'
import { authSchema } from '@/lib/validation-schemas/auth-schema'
import bcrypt from 'bcrypt'
import createHttpError from 'http-errors'
import { withIronSessionApiRoute } from 'iron-session/next'
import type { NextApiRequest, NextApiResponse } from 'next'

const signinRoute = async (req: NextApiRequest, res: NextApiResponse<User>) => {
  const { email, password: rawPassword } = validateSchema(req.body, authSchema)

  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      password: true,
    },
  })

  if (!user) {
    throw new createHttpError.Unauthorized('Incorrect email or password')
  }

  const passwordMatch = bcrypt.compareSync(rawPassword, user.password)

  if (!passwordMatch) {
    throw new createHttpError.Unauthorized('Incorrect email or password')
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...trimmedUser } = user

  req.session.user = trimmedUser
  await req.session.save()

  res.status(200).json(trimmedUser)
}

export default apiHandler({
  POST: withIronSessionApiRoute(signinRoute, ironSessionOptions),
})
