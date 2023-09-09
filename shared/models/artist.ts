import { Artist as ArtistModel } from '@prisma/client'

export type Artist = Pick<ArtistModel, 'id' | 'name'>
