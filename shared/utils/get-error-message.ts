import axios from 'axios'
import { ErrorResponse } from '../api/error-handler'

/**
 * Returns an error message based on the provided error object.
 * If the error is an AxiosError, it will try to extract the error message from the response data.
 * If the error is an instance of Error, it will return a generic error message.
 * If the error is of any other type, it will return an empty string.
 *
 * @param error - The error object to extract the message from.
 * @returns The error message.
 */
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
