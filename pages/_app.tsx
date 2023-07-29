import '@/styles/globals.css'
import { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { ReactElement, ReactNode } from 'react'
import { SWRConfig } from 'swr'
import { SWRDevTools } from 'swr-devtools'

export type NextPageWithLayout<P = unknown, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout || ((page) => page)
  return (
    <SWRDevTools>
      <SWRConfig
        value={{ revalidateOnFocus: process.env.NODE_ENV === 'production' }}
      >
        {getLayout(<Component {...pageProps} />)}
      </SWRConfig>
    </SWRDevTools>
  )
}

export default App
