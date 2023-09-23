import { Slider } from '@/components/ui/slider'
import { formatSecondsToTime } from '@/lib/utils/format-seconds-to-time'
import { FC, RefObject, useEffect, useRef, useState } from 'react'

interface PlayerSeekBarProps {
  audioRef: RefObject<HTMLAudioElement>
  isPlaying: boolean
}

export const PlayerSeekBar: FC<PlayerSeekBarProps> = ({
  audioRef,
  isPlaying,
}) => {
  const animationFrame = useRef<number>(0)
  const [timeProgress, setTimeProgress] = useState(0)
  const [duration, setDuration] = useState(0)

  const onProgressChange = (value: number[]) => {
    if (!audioRef.current) return

    const newProgress = value[0]

    audioRef.current.currentTime = newProgress
    setTimeProgress(newProgress)
  }

  useEffect(() => {
    const ref = audioRef.current

    const loadedMetadataListener = () => {
      setDuration(audioRef.current?.duration ?? 0)
    }

    ref?.addEventListener('loadedmetadata', loadedMetadataListener)

    return () => {
      ref?.removeEventListener('loadedmetadata', loadedMetadataListener)
    }
  }, [audioRef])

  useEffect(() => {
    const animate = () => {
      if (audioRef.current) {
        setTimeProgress(audioRef.current.currentTime)
      }

      animationFrame.current = requestAnimationFrame(animate)
    }

    if (isPlaying) {
      animationFrame.current = requestAnimationFrame(animate)
    }

    return () => {
      cancelAnimationFrame(animationFrame.current)
    }
  }, [isPlaying, audioRef])

  if (!audioRef.current) return null

  return (
    <div className="flex gap-3">
      <span className="text-gray-300 text-xs w-10">
        {formatSecondsToTime(timeProgress)}
      </span>
      <Slider
        value={[timeProgress]}
        max={duration}
        step={1}
        onValueChange={onProgressChange}
      />
      <span className="text-gray-300 text-xs w-10 text-right">
        {formatSecondsToTime(duration)}
      </span>
    </div>
  )
}
