import createHttpError from 'http-errors'
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { errorHandler } from './error-handler'

type Methods = 'GET' | 'POST' | 'PUT' | 'DELETE'
type ApiMethodsMap = {
  [method in Methods]?: NextApiHandler
}

export const apiHandler =
  (apiMethodsMap: ApiMethodsMap) =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const method = req.method?.toUpperCase()

      if (!method)
        throw new createHttpError.MethodNotAllowed('HTTP Method not defined')

      const apiMethod = apiMethodsMap[method as Methods]

      if (!apiMethod)
        throw new createHttpError.MethodNotAllowed('HTTP Method not allowed')

      await apiMethod(req, res)
    } catch (err: unknown) {
      errorHandler(err, res)
    }
  }
