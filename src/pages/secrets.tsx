import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { Layout, Row, Space, Spin, Table } from 'antd'
import { User } from '@/types'
import styles from '@/styles/Secrets.module.css'

export default function Secrets() {
  const router = useRouter()
  const session = useSession()
  const [ secretData, setSecretData ] = useState<User[]>([])

  useEffect(() => {
    // redirect to home page if session isn't valid
    if (session.status === 'unauthenticated') {
      router.push('/')
    }
    // attempt to load secret data if session is valid
    if (session.status === 'authenticated' && secretData.length === 0) {
      _loadSecretData()
    }
  }, [session, secretData, router])

  const _loadSecretData = async () => {
    // the auth cookie is automatically included in the headers of the 
    // request to the API, so we can just call it like this
    const response = await fetch('/api/v1/secret')
    const data = await response.json()
    setSecretData(data.map((elm: User, index: number) => ({ ...elm, key: index + 1 })))
  }

  const LoadingCotnent = (
    <Row className={styles.loadingContainer}>
      <Space align={'center'}>
        <Spin size={'large'} />
      </Space>
    </Row>
  )

  const AuthedContent = (
    <div className={styles.table}>
      <Table
        dataSource={secretData}
        columns={[
          {
            title: 'Username',
            dataIndex: 'name',
            key: 'name',
            width: '30%',
          },
          {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
            width: '20%',
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