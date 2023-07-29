import { httpClient } from '@/lib/http-client'
import { User } from '@/lib/models/user'
import useSWRImmutable from 'swr'

export const useUser = () => {
  const { data, isLoading: isLoadingUser } = useSWRImmutable(
    '/auth/me',
    httpClient.get<User>
  )

  return {
    user: data,
    isLoadingUser,
  }
}
