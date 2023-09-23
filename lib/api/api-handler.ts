import createHttpError from 'http-errors'
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { errorHandler } from './error-handler'

type Methods = 'GET' | 'POST' | 'PUT' | 'DELETE'
type ApiMethodsMap = {
  [method in Methods]?: NextApiHandler
}

/**
 * A higher-order function that returns a Next.js API route handler function.
 * The returned function will handle incoming HTTP requests and delegate them to the appropriate API method based on the HTTP method.
 * @param apiMethodsMap An object that maps HTTP methods to API method functions.
 * @returns A Next.js API route handler function.
 */
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
