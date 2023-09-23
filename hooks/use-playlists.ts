import { httpClient } from '@/lib/api/http-client'
import { Playlist } from '@/lib/models/playlist'
import useSWR from 'swr'

export const usePlaylists = () => {
  return useSWR('/playlists', httpClient.get<Playlist[]>)
}
