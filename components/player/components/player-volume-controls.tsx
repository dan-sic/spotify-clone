import { Slider } from '@/components/ui/slider'
import { Icons } from '@/lib/consts/icons'
import { FC, RefObject, useEffect, useState } from 'react'

interface PlayerVolumeControlsProps {
  audioRef: RefObject<HTMLAudioElement>
}

export const PlayerVolumeControls: FC<PlayerVolumeControlsProps> = ({
  audioRef,
}) => {
  const [volume, setVolume] = useState(0.5)

  const onVolumeChange = (value: number[]) => {
    if (!audioRef.current) return

    const newVolume = value[0]

    audioRef.current.volume = newVolume
    setVolume(newVolume)
  }

  useEffect(() => {
    const ref = audioRef.current

    const loadedMetadataListener = () => {
      setVolume(audioRef.current?.volume ?? 0.5)
    }

    ref?.addEventListener('loadedmetadata', loadedMetadataListener)

    return () => {
      ref?.removeEventListener('loadedmetadata', loadedMetadataListener)
    }
  }, [audioRef])

  return (
    <div className="flex space-x-2 items-center w-32">
      <Icons.Speaker className="w-5 h-5 fill-gray-300" />
      <Slider
        value={[volume]}
        max={1}
        step={0.01}
        onValueChange={onVolumeChange}
      />
    </div>
  )
}
