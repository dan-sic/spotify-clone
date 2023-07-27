import { apiHandler } from '@/lib/api-handler'
import ironSessionOptions from '@/lib/iron-session-options'
import { User } from '@/lib/models/user'
import createHttpError from 'http-errors'
import { withIronSessionApiRoute } from 'iron-session/next'
import type { NextApiRequest, NextApiResponse } from 'next'

const meRoute = async (req: NextApiRequest, res: NextApiResponse<User>) => {
  if (req.session.user) {
    res.status(200).json(req.session.user)
  } else {
    throw new createHttpError.Unauthorized()
  }
}

export default apiHandler({
  GET: withIronSessionApiRoute(meRoute, ironSessionOptions),
})
