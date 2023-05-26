import { decodeAddress, signatureVerify } from '@polkadot/util-crypto'
import { u8aToHex } from '@polkadot/util'

export const getMessageToSign = (address: string) => `Sign-in request for address ${address}.`

export const isValidSignature = (signedMessage: string, signature: string, address: string): boolean => {
    const publicKey = decodeAddress(address)
    const hexPublicKey = u8aToHex(publicKey)
    return signatureVerify(signedMessage, signature, hexPublicKey).isValid
}
