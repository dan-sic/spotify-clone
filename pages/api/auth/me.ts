import { apiHandler } from '@/shared/api/api-handler'
import ironSessionOptions from '@/shared/api/iron-session-options'
import { User } from '@/shared/models/user'
import { withProtectedRoute } from '@/shared/api/with-protected-route'
import { withIronSessionApiRoute } from 'iron-session/next'
import type { NextApiRequest, NextApiResponse } from 'next'

const meRoute = async (req: NextApiRequest, res: NextApiResponse<User>) => {
  res.status(200).json(req.session.user)
}

export default apiHandler({
  GET: withIronSessionApiRoute(withProtectedRoute(meRoute), ironSessionOptions),
})
