import Head from 'next/head'
import { Col, Layout, Row, Space, Typography } from 'antd'
import Web3LoginButton from './web3-login-button'

// This could be moved into the env vars or be supplied by the backend.
// It is kept here for simplicity in this example repo.
export const APP_NAME = 'Web3 Login'

export default function AppHead(props: { appName?: string }) {
  return (
    <>
      <Head>
        <title>{ props.appName || APP_NAME }</title>
        <meta name="description" content="A simple web3 authentication demo application" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout.Header>
          <Row justify={'space-between'}>
            <Col>
              <Space align={'center'}>
                <Typography.Title level={5}>
                  Web3 Login App
                </Typography.Title>
              </Space>
            </Col>
            <Col>
              <Web3LoginButton dappName={APP_NAME} />
            </Col>
          </Row>
      </Layout.Header>
    </>
  )
}