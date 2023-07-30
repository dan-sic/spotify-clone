import createHttpError from 'http-errors'
import { NextApiResponse } from 'next'
import { ZodError } from 'zod'

export type ErrorResponse = {
  error: {
    message: string
    err?: unknown
  }
  statusCode?: number
}

/**
 * Handles errors thrown by the application and sends an appropriate response to the client.
 * @param err - The error that was thrown.
 * @param res - The response object to send the error response to.
 */
export const errorHandler = (
  err: unknown,
  res: NextApiResponse<ErrorResponse>
) => {
  if (createHttpError.isHttpError(err) && err.expose) {
    return res.status(err.statusCode).json({ error: { message: err.message } })
  }

  if (err instanceof ZodError) {
    return res
      .status(400)
      .json({ error: { message: err.errors.map((e) => e.message).join(', ') } })
  }

  console.error(err)
  res.status(500).json({
    error: { message: 'Internal Server Error', err },
    statusCode: createHttpError.isHttpError(err) ? err.statusCode : 500,
  })
}
