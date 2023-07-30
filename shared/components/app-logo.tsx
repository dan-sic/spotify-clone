import Image from 'next/image'
import Logo from '@/public/spotify_logo_white.png'
import { FC } from 'react'

export const AppLogo: FC = () => {
  return <Image alt="logo" src={Logo} width={200} height={100} />
}
