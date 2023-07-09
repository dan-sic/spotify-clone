import { FC, ReactNode } from 'react'

interface PlayerLayoutProps {
  children: ReactNode
}

export const PlayerLayout: FC<PlayerLayoutProps> = ({ children }) => {
  return (
    <div>
      Layout <div>{children}</div>
    </div>
  )
}
