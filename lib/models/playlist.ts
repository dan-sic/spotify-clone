import { Playlist as PlaylistModel } from '@prisma/client'

export type Playlist = Pick<PlaylistModel, 'id' | 'name'>
