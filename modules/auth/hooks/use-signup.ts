import { getErrorMessage } from '@/shared/utils/get-error-message'
import { httpClient } from '@/shared/api/http-client'
import { User } from '@/shared/models/user'
import { AuthSchema } from '@/shared/validation-schemas/auth-schema'
import { useRouter } from 'next/router'
import useSWRMutation from 'swr/mutation'

export const useSignup = () => {
  const router = useRouter()
  const {
    trigger: signup,
    error,
    isMutating: isSigningUp,
  } = useSWRMutation(
    '/auth/signup',
    (url, { arg }: { arg: AuthSchema }) => httpClient.post<User>(url, arg),
    {
      throwOnError: false,
      onSuccess: () => {
        router.push('/')
      },
    }
  )

  return {
    signup,
    signUpError: getErrorMessage(error),
    isSigningUp,
  }
}
