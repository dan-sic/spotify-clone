import { getErrorMessage } from '@/lib/utils/get-error-message'
import { httpClient } from '@/lib/api/http-client'
import { User } from '@/lib/models/user'
import { AuthSchema } from '@/lib/validation-schemas/auth-schema'
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
