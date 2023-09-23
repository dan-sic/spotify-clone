import { apiHandler } from '@/lib/api/api-handler'
import ironSessionOptions from '@/lib/api/iron-session-options'
import { User } from '@/lib/models/user'
import { withProtectedRoute } from '@/lib/api/with-protected-route'
import { withIronSessionApiRoute } from 'iron-session/next'
import type { NextApiRequest, NextApiResponse } from 'next'

const meRoute = async (req: NextApiRequest, res: NextApiResponse<User>) => {
  res.status(200).json(req.session.user)
}

export default apiHandler({
  GET: withIronSessionApiRoute(withProtectedRoute(meRoute), ironSessionOptions),
})
