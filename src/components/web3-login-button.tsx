import { WalletSelect } from '@talismn/connect-components'
import { PolkadotjsWallet, TalismanWallet, Wallet, WalletAccount } from '@talismn/connect-wallets'
import { cryptoWaitReady } from '@polkadot/util-crypto'
import { useState, useEffect } from 'react'
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
            let accountAddress = accounts[0].address

            wallet.signer.signRaw({
                type: 'payload',
                data: props.message || getMessageToSign(accountAddress),
                address: accountAddress,
            }).then(async ({ signature }: { signature: string }) => {
                // TODO: validate signature via API to obtain session
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
