import { httpClient } from '@/shared/api/http-client'
import { User } from '@/shared/models/user'
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
