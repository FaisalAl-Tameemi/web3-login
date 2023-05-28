import { useState, useEffect } from 'react'
import { signIn, useSession, signOut } from 'next-auth/react'
import { WalletSelect } from '@talismn/connect-components'
import { Wallet, WalletAccount } from '@talismn/connect-wallets'
import { getMessageToSign } from '@/utils/signature'
import { Button } from 'antd'

interface Web3LoginButtonProps {
  dappName: string,
  message?: string,
  button?: React.ReactElement,
}

export default function Web3LoginButton(props: Web3LoginButtonProps) {
  const [wallet, setWallet] = useState<Wallet | null>(null)
  const [accounts, setAccounts] = useState<WalletAccount[]>([])
  const [ isSigninLoading, setIsSigninLoading ] = useState<boolean>(false)
  const session = useSession()

  // Once both the wallet and the selected account is known
  // we prompt the user to sign a message which will be sent to the API
  // for verification and to obtain a JWT token
  useEffect(() => {
    if (wallet && accounts.length > 0) {
      const accountAddress = accounts[0].address
      const message = props.message || getMessageToSign(accountAddress)

      wallet.signer.signRaw({
        type: 'payload',
        data: message,
        address: accountAddress,
      }).then(async ({ signature }: { signature: string }) => {
        setIsSigninLoading(true)
        // validate signature via API to obtain session
        await signIn('credentials', {
          address: accountAddress,
          message,
          signature,
          redirect: true,
          callbackUrl: '/secrets'
        })
      })
    }
  }, [wallet, accounts, props.message])

  const DefaultButton = (
    <Button type='primary' loading={isSigninLoading}>
      Signin with Wallet
    </Button>
  )

  if (session.status === 'authenticated') {
    return (
      <Button
        type='primary'
        danger
        onClick={() => {
          setIsSigninLoading(true)
          signOut()
        }}
        loading={isSigninLoading}
      >
        Signout
      </Button>
    )
  }

  return (
    <WalletSelect
      dappName={props.dappName}
      triggerComponent={props.button || DefaultButton}
      onWalletConnectClose={() => console.log('onWalletConnectClose')}
      onWalletSelected={(wallet) => setWallet(wallet)}
      onUpdatedAccounts={(accounts) => setAccounts(accounts || [])}
      onAccountSelected={(account) => console.log('onAccountSelected', account)}
      onError={(error) => console.log('onError', error)}
    />
  )
}
