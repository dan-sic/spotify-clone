import { httpClient } from '@/shared/api/http-client'
import { Playlist } from '@/shared/models/playlist'
import useSWR from 'swr'

export const usePlaylists = () => {
  return useSWR('/playlists', httpClient.get<Playlist[]>)
}
