import { Song as SongModel } from '@prisma/client'

export type Song = Pick<SongModel, 'id' | 'name' | 'duration' | 'url'> & {
  createdAt: string
  artist: {
    name: string
    id: string
  }
}
