import { getErrorMessage } from '@/lib/get-error-message'
import { httpClient } from '@/lib/http-client'
import { User } from '@/lib/models/user'
import { AuthSchema } from '@/lib/validation-schemas/auth-schema'
import { useRouter } from 'next/router'
import useSWRMutation from 'swr/mutation'

export const useSignin = () => {
  const router = useRouter()
  const {
    trigger: signin,
    error,
    isMutating: isSigningIn,
  } = useSWRMutation(
    '/auth/signin',
    (url, { arg }: { arg: AuthSchema }) => httpClient.post<User>(url, arg),
    {
      throwOnError: false,
      onSuccess: () => {
        router.push('/')
      },
    }
  )

  return {
    signin,
    signinError: getErrorMessage(error),
    isSigningIn,
  }
}
