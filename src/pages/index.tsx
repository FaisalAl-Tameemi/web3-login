import { Inter } from 'next/font/google'
import AppHead from '@/components/app-head'
import Web3LoginButton from '@/components/web3-login-button'
import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

const APP_NAME = 'Web3 Login'

export default function Home() {
  return (
    <>
      <AppHead />
      <main className={`${styles.main} ${inter.className}`}>
        <div className={styles.description}>
          <p>
            Get started by editing&nbsp;
            <code className={styles.code}>src/pages/index.tsx</code>
          </p>
          <div>
            <Web3LoginButton dappName={APP_NAME} />
          </div>
        </div>
      </main>
    </>
  )
}
