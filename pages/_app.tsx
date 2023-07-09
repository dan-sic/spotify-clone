import { PlayerLayout } from '@/components/player-layout/player-layout'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <PlayerLayout>
      <Component {...pageProps} />
    </PlayerLayout>
  )
}

export default App
