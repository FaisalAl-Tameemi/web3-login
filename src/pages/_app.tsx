import '@/styles/globals.css'
import 'antd/dist/reset.css'
import { Inter } from 'next/font/google'
import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'
import AppHead from '@/components/app-head'
import { ConfigProvider } from 'antd'
import { theme } from '@/utils/config'

const inter = Inter({ subsets: ['latin'] })

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <ConfigProvider theme={theme}>
      <AppHead />
      <SessionProvider session={session} basePath='/api/v1'>
        <Component className={`${inter.className}`} {...pageProps} />
      </SessionProvider>
    </ConfigProvider>
  )
}
