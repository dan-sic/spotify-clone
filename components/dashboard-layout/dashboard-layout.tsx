import { Player } from '@/components/player/player'
import { Separator } from '@/components/ui/separator'
import { usePlayerStore } from '@/lib/store/player-store'
import clsx from 'clsx'
import { FC, ReactNode } from 'react'
import { AppLogo } from '../app-logo'
import { Navigation } from './components/navigation'
import { Playlists } from './components/playlists'

interface DashboardLayoutProps {
  children: ReactNode
}

export const DashboardLayout: FC<DashboardLayoutProps> = ({ children }) => {
  const isCurrentSong = usePlayerStore(
    (state) => !!state.songs[state.currentSongIndex]
  )

  return (
    <div
      className={clsx(
        'h-screen grid grid-cols-[15%_85%] grid-rows-[90%_10%]',
        isCurrentSong ? 'grid-rows-[90%_10%]' : 'grid-rows-[100%]'
      )}
    >
      <aside className="col-start-1 col-end-2 row-start-1 row-end-2 flex flex-col">
        <div className="flex-1 py-2 space-y-4">
          <div className="px-3">
            <AppLogo />
          </div>
          <Navigation />
          <Separator className="bg-gray-500" />
        </div>
        <div className="flex-2 overflow-y-auto scrollbar-thumb-gray-800 scrollbar-track-gray-600 scrollbar-thin">
          <Playlists />
        </div>
      </aside>
      <main className="col-start-2 col-end-3 row-start-1 row-end-2">
        {children}
      </main>
      {isCurrentSong && (
        <footer className="col-start-1 col-end-3 row-start-2 row-end-3">
          <Player />
        </footer>
      )}
    </div>
  )
}
