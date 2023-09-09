import { NextPageWithLayout } from '@/shared/types'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { SWRConfig } from 'swr'
import { SWRDevTools } from 'swr-devtools'

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
