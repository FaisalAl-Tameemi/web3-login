import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { Layout, Spin, Table } from 'antd'
import { User } from '@/types'
import styles from '@/styles/Secrets.module.css'

export default function Secrets() {
  const session = useSession()
  const [ secretData, setSecretData ] = useState<User[]>([])

  useEffect(() => {
    // redirect to home page if session isn't valid
    if (session.status === 'unauthenticated') {
      window.location.href = '/'
    }
    // attempt to load secret data if session is valid
    if (session.status === 'authenticated' && secretData.length === 0) {
      _loadSecretData()
    }
  }, [session, secretData])

  const _loadSecretData = async () => {
    // the auth cookie is automatically included in the headers of the 
    // request to the API, so we can just call it like this
    const response = await fetch('/api/v1/secret')
    const data = await response.json()
    setSecretData(data.map((elm: User, index: number) => ({ ...elm, key: index + 1 })))
  }

  const LoadingCotnent = (
    <main>
      <Spin />
    </main>
  )

  const AuthedContent = (
    <div className={styles.table}>
      <Table
        dataSource={secretData}
        columns={[
          {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
          },
          {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
          },
          {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
          },
        ]}
      />
    </div>
  )
  
  return (
    <Layout.Content>
      {
        session.status === 'loading' && LoadingCotnent
      }
      {
        session.status === 'authenticated' && AuthedContent
      }
    </Layout.Content>
  )
}