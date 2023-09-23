import { Icons } from '@/lib/consts/icons'
import { usePlayerStore } from '@/lib/store/player-store'
import { useEffect, useRef, useState } from 'react'
import { PlayerSeekBar } from './components/player-seek-bar'
import { PlayerSongControls } from './components/player-song-controls'
import { PlayerSongDetail } from './components/player-song-detail'
import { PlayerVolumeControls } from './components/player-volume-controls'

export const Player = () => {
  const { currentSongIndex, songs, setCurrentSongIndex } = usePlayerStore()
  const currentSong = songs[currentSongIndex]

  const audio = useRef<HTMLAudioElement>(null)

  const [isPlaying, setIsPlaying] = useState(false)
  const [isPlaybackError, setIsPlaybackError] = useState(false)
  const [isShuffle, setIsShuffle] = useState(false)
  const [isRepeat, setIsRepeat] = useState(false)

  const play = () => {
    if (audio.current) {
      audio.current
        .play()
        .then(() => {
          setIsPlaying(true)
          setIsPlaybackError(false)
        })
        .catch(() => {
          setIsPlaybackError(true)
        })
    }
  }

  const pause = () => {
    if (audio.current) {
      audio.current.pause()
      setIsPlaying(false)
    }
  }

  const next = () => {
    const newIndex = (currentSongIndex + 1) % songs.length
    setCurrentSongIndex(newIndex)
  }

  const previous = () => {
    const newIndex = (currentSongIndex - 1) % songs.length
    setCurrentSongIndex(newIndex)
  }

  // set audio source when current song changes
  useEffect(() => {
    if (audio.current && currentSong) {
      audio.current.src = currentSong.url
    }
  }, [currentSong])

  // end of song effect
  useEffect(() => {
    const ref = audio.current

    const songEndListener = () => {
      if (isRepeat) {
        play()
        return
      }

      if (isShuffle) {
        const newIndex = Math.floor(Math.random() * songs.length)
        setCurrentSongIndex(newIndex)
        return
      }

      next()
    }

    ref?.addEventListener('ended', songEndListener)

    return () => {
      ref?.removeEventListener('ended', songEndListener)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audio, isRepeat, isShuffle, songs.length])

  // can play song effect
  useEffect(() => {
    const ref = audio.current

    const canPlayListener = () => {
      play()
    }

    ref?.addEventListener('canplay', canPlayListener)

    return () => {
      ref?.removeEventListener('canplay', canPlayListener)
    }
  }, [audio])

  if (isPlaybackError) {
    return <ErrorState />
  }

  return (
    <div className="flex justify-between items-center w-full h-full bg-gray-800 px-5">
      <audio ref={audio} />
      <PlayerSongDetail song={currentSong} />
      <div className="flex flex-col space-y-2 w-[40%]">
        <PlayerSongControls
          {...{
            onPlay: play,
            onPause: pause,
            onNext: next,
            onPrevious: previous,
            isPlaying,
            isShuffle,
            isRepeat,
            toggleSuffle: () => setIsShuffle((v) => !v),
            toggleRepeat: () => setIsRepeat((v) => !v),
          }}
        />
        <PlayerSeekBar audioRef={audio} isPlaying={isPlaying} />
      </div>
      <PlayerVolumeControls audioRef={audio} />
    </div>
  )
}

const ErrorState = () => {
  return (
    <div className="flex space-x-2 items-center justify-center bg-gray-800 px-5 h-full text-gray-100">
      <Icons.NoInternet className="w-5 h-5" />
      <p>
        There was problem when trying to play the song. Please check your
        internet connection and try again later.
      </p>
    </div>
  )
}
