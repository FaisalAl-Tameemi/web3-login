import { Inter } from 'next/font/google'
import AppHead from '@/components/app-head'
import styles from '@/styles/Home.module.css'
import { useSession } from 'next-auth/react'
import { useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Secrets() {
  const session = useSession()
  const [ secretData, setSecretData ] = useState<string | null>(null)

  if (session.status === 'unauthenticated') {
    // redirect to home page
    window.location.href = '/'
    return null
  }

  const _loadSecretData = async () => {
    // the auth cookie is automatically included in the headers of the 
    // request to the API, so we can just call it like this
    const response = await fetch('/api/v1/secret')
    const data = await response.json()
    setSecretData(data)
  }

  const Loading = (
    <main className={`${styles.main} ${inter.className}`}>
      Loading
    </main>
  )

  const Authed = (
    <main className={`${styles.main} ${inter.className}`}>
      <div>
        <p>
          ✅ Authenticated
        </p>
        {
          !secretData && 
            <button onClick={() => _loadSecretData()}>
              Load Data
            </button>
        }
        {
          secretData && 
            <p>
              { JSON.stringify(secretData) }
            </p>
        }
      </div>
    </main>
  )
  
  return (
    <>
      <AppHead />
      {
        session.status === 'loading' && Loading
      }
      {
        session.status === 'authenticated' && Authed
      }
    </>
  )
}