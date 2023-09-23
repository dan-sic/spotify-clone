import { Icons } from '@/lib/consts/icons'
import clsx from 'clsx'
import { FC } from 'react'

interface PlayerSongControlsProps {
  onPlay: () => void
  onPause: () => void
  onNext: () => void
  onPrevious: () => void
  toggleSuffle: () => void
  toggleRepeat: () => void
  isPlaying: boolean
  isShuffle: boolean
  isRepeat: boolean
}

export const PlayerSongControls: FC<PlayerSongControlsProps> = ({
  onPlay,
  onPause,
  onNext,
  onPrevious,
  toggleSuffle,
  toggleRepeat,
  isShuffle,
  isRepeat,
  isPlaying,
}) => {
  return (
    <div className="flex items-center justify-center space-x-4">
      <button onClick={toggleSuffle}>
        <Icons.Shuffle
          className={clsx(
            'w-5 h-5',
            isShuffle
              ? 'fill-gray-200 hover:fill-gray-300'
              : 'fill-gray-500 hover:fill-gray-400'
          )}
        />
      </button>
      <button onClick={onPrevious}>
        <Icons.SkipPrevious className="w-5 h-5 fill-gray-300 hover:fill-gray-400" />
      </button>
      {isPlaying ? (
        <button onClick={onPause}>
          <Icons.PauseCircleFilled className="w-10 h-10 fill-gray-200 hover:fill-gray-300" />
        </button>
      ) : (
        <button onClick={onPlay}>
          <Icons.PlayCircleFilled className="w-10 h-10 fill-gray-200 hover:fill-gray-300" />
        </button>
      )}
      <button onClick={onNext}>
        <Icons.SkipNext className="w-5 h-5 fill-gray-300 hover:fill-gray-400" />
      </button>
      <button onClick={toggleRepeat}>
        <Icons.Repeat
          className={clsx(
            'w-5 h-5',
            isRepeat
              ? 'fill-gray-200 hover:fill-gray-300'
              : 'fill-gray-500 hover:fill-gray-400'
          )}
        />
      </button>
    </div>
  )
}
