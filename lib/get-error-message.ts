import axios from 'axios'
import { ErrorResponse } from './error-handler'

export const getErrorMessage = (error: unknown) => {
  if (axios.isAxiosError<ErrorResponse>(error)) {
    return (
      error.response?.data.error.message ??
      getStatusCodeErrorMessage(error.code)
    )
  }

  if (error instanceof Error) {
    return 'There was a problem with the application. Please reload the page. If the problem persists, please contact support.'
  }

  return ''
}

const getStatusCodeErrorMessage = (code = '500') => {
  const statusCodeToMessageMap: Record<string, string> = {
    '400': 'Bad Request',
    '401': 'Unauthorized',
    '403': 'Forbidden',
    '404': 'Not Found',
    '500': 'Internal Server Error',
  }

  return statusCodeToMessageMap[code] ?? 'Internal Server Error'
}
