import { getErrorMessage } from '@/shared/utils/get-error-message'
import { httpClient } from '@/shared/api/http-client'
import { User } from '@/shared/models/user'
import { AuthSchema } from '@/shared/validation-schemas/auth-schema'
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
