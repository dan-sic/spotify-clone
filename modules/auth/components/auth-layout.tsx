import { AppLogo } from '@/components/player-layout/components/app-logo'
import { FC } from 'react'

export const AuthLayout: FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className="grid h-screen place-items-center">
      <div className="flex flex-col items-center space-y-12">
        <AppLogo />
        {children}
      </div>
    </div>
  )
}
