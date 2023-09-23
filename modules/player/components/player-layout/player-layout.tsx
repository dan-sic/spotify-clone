import { FC, ReactNode } from 'react'
import { AppLogo } from '../../../../shared/components/app-logo'
import { Navigation } from './components/navigation'
import { Playlists } from './components/playlists'
import { Separator } from '@/shared/components/separator'

interface PlayerLayoutProps {
  children: ReactNode
}

export const PlayerLayout: FC<PlayerLayoutProps> = ({ children }) => {
  return (
    <div className="h-screen grid grid-cols-[15%_85%] grid-rows-[90%_10%]">
      <aside className="col-start-1 col-end-2 row-start-1 row-end-2 flex flex-col">
        <div className="flex-1 py-2 space-y-4">
          <div className="px-3">
            <AppLogo />
          </div>
          <Navigation />
          <Separator className="bg-gray-500" />
        </div>
        <div className="flex-2 overflow-y-auto">
          <Playlists />
        </div>
      </aside>
      <main className="col-start-2 col-end-3 row-start-1 row-end-2">
        {children}
      </main>
      <footer className="col-start-1 col-end-3 row-start-2 row-end-3 bg-blue-500">
        Footer
      </footer>
    </div>
  )
}
