import { Space, Layout, Row, Typography, Col, Image, Button } from 'antd'
import styles from '@/styles/Home.module.css'
import { REPO_URL } from '@/utils/config'

export default function Home() {
  return (
    <Layout.Content>
      <Row className={styles.main} justify={'center'}>
        <Space align={'center'}>
          <Col span={24}>
            <Typography.Title>
              Web3 Login
            </Typography.Title>
            <Typography.Paragraph>
              A simple web3 authentication demo application using 
              <code>NextJS</code>, <code>AntDesign</code>, and <code>@talisman-connect</code>.
            </Typography.Paragraph>
            <Typography.Paragraph>
              If you have a wallet extension (e.g. Talisman or PolkadotJS) installed, you can click the button in the top right to login.
            </Typography.Paragraph>
            <Button
              type='default'
              icon={
                <Image src='/github-mark.png' alt='github-mark-icon' width={20} />
              }
              href={REPO_URL}
              target='_blank'
            >
              View on Github
            </Button>
          </Col>
        </Space>
      </Row>
    </Layout.Content>
  )
}
