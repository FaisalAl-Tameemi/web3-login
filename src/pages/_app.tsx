import { Inter } from 'next/font/google'
import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'
import { ConfigProvider } from 'antd'
import AppHead from '@/components/app-head'
import { theme } from '@/utils/config'

import '@/styles/globals.css'
import 'antd/dist/reset.css'

const inter = Inter({ subsets: ['latin'] })

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <ConfigProvider theme={theme}>
      <SessionProvider session={session} refetchInterval={5} basePath='/api/v1'>
        <AppHead />
        <Component className={`${inter.className}`} {...pageProps} />
      </SessionProvider>
    </ConfigProvider>
  )
}
