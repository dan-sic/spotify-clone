import { apiHandler } from '@/lib/api-handler'
import ironSessionOptions from '@/lib/iron-session-options'
import { withIronSessionApiRoute } from 'iron-session/next'
import type { NextApiRequest, NextApiResponse } from 'next'

const logoutRoute = (req: NextApiRequest, res: NextApiResponse) => {
  req.session.destroy()

  res.status(200).end()
}

export default apiHandler({
  POST: withIronSessionApiRoute(logoutRoute, ironSessionOptions),
})
