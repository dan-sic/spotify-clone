import { Song } from '@/lib/models/song'
import { FC } from 'react'

interface PlayerSongDetailrops {
  song: Song
}

export const PlayerSongDetail: FC<PlayerSongDetailrops> = ({ song }) => {
  return (
    <div className="flex flex-col space-y-1">
      <span className="text-gray-100">{song.name}</span>
      <span className="text-gray-300 text-xs">{song.artist.name}</span>
    </div>
  )
}
