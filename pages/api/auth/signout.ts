import { apiHandler } from '@/shared/api/api-handler'
import ironSessionOptions from '@/shared/api/iron-session-options'
import { withIronSessionApiRoute } from 'iron-session/next'
import type { NextApiRequest, NextApiResponse } from 'next'

const signoutRoute = (req: NextApiRequest, res: NextApiResponse) => {
  req.session.destroy()

  res.status(200).end()
}

export default apiHandler({
  POST: withIronSessionApiRoute(signoutRoute, ironSessionOptions),
})
