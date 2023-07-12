import { Separator } from '@/components/ui/separator'
import { FC, ReactNode } from 'react'
import { AppLogo } from './components/app-logo'
import { Navigation } from './components/navigation'
import { Playlists } from './components/playlists'

interface PlayerLayoutProps {
  children: ReactNode
}

export const PlayerLayout: FC<PlayerLayoutProps> = ({ children }) => {
  return (
    <div className="w-screen h-screen">
      <aside className="absolute h-[calc(100%-100px)] w-[200px] bg-gray-900 p-5 space-y-4">
        <AppLogo />
        <Navigation />
        <Separator className="bg-gray-500" />
        <Playlists />
      </aside>
      <main className="w-full h-[calc(100%-100px)] overflow-auto ml-[200px] bg-orange-500">
        {children}
      </main>
      <footer className="absolute bottom-0 w-full h-[100px] bg-blue-500">
        Footer
      </footer>
    </div>
  )
}
