import type { NextApiRequest, NextApiResponse } from 'next'
import { cryptoWaitReady } from '@polkadot/util-crypto'
import { isValidSignature } from '@/utils/signature'
import { encode } from 'next-auth/jwt'

type Data = {
  token?: string
  error?: string
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  // check if the method is valid
  if (req.method !== 'POST') {
    return res.status(405).end()
  }

  const { message, signature, address } = req.body

  if (!message || !signature || !address) {
    return res.status(400).json({
      error: 'Missing parameters',
    })
  }

  await cryptoWaitReady()
  const isValid = isValidSignature(message, signature, address)

  if (!isValid) {
    return res.status(401).json({
      error: 'Invalid signature',
    })
  }

  // NOTE: this assumes that the JWT_SECRET is available in the process environment
  const token = await encode({
    secret: process.env.JWT_SECRET!,
    token: {
      user: {
        id: address,
      },
    },
  })
  
  res.status(200).json({
    token,
  })
}

export default handler
