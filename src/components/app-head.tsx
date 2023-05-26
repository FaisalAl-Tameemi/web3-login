import Head from 'next/head'

export const APP_NAME = 'Web3 Login'

export default function AppHead(props: { appName?: string }) {
  return (
    <Head>
        <title>{ APP_NAME || props.appName }</title>
        <meta name="description" content="A simple web3 authentication demo application" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
    </Head>
  )
}