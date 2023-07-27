import createHttpError from 'http-errors'
import { NextApiResponse } from 'next'
import { ZodError } from 'zod'

type ErrorResponse = {
  error: {
    message: string
    err?: unknown
  }
  statusCode?: number
}

export const errorHandler = (
  err: unknown,
  res: NextApiResponse<ErrorResponse>
) => {
  console.log(err)
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
