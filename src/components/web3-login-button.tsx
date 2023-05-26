import { useState, useEffect } from 'react'
import { signIn } from 'next-auth/react'
import { WalletSelect } from '@talismn/connect-components'
import { Wallet, WalletAccount } from '@talismn/connect-wallets'
import { getMessageToSign } from '@/utils/signature'

interface Web3LoginButtonProps {
    dappName: string,
    message?: string,
}

export default function Web3LoginButton(props: Web3LoginButtonProps) {
    const [wallet, setWallet] = useState<Wallet | null>(null)
    const [accounts, setAccounts] = useState<WalletAccount[]>([])

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

    return (
        <WalletSelect
            dappName={props.dappName}
            triggerComponent={
                <button style={{ padding: 12 }}>
                    Signin with Wallet
                </button>
            }
            onWalletConnectClose={() => console.log('onWalletConnectClose')}
            onWalletSelected={(wallet) => setWallet(wallet)}
            onUpdatedAccounts={(accounts) => setAccounts(accounts || [])}
            onAccountSelected={(account) => console.log('onAccountSelected', account)}
            onError={(error) => console.log('onError', error)}
        />
    )
}
