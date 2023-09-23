import createHttpError from 'http-errors'
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'

export const withProtectedRoute = (handler: NextApiHandler) => {
  return (req: NextApiRequest, res: NextApiResponse) => {
    if (!req.session.user) {
      throw new createHttpError.Unauthorized()
    }

    return handler(req, res)
  }
}
