import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from "next-auth/next"
import { authOptions } from "./[...nextauth]"
import { getToken } from 'next-auth/jwt'

type Data = {
  secret: string
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  // check if the method is valid
  if (req.method !== 'GET') {
    return res.status(405).end()
  }

  // Check either the session or Bearer token.
  // 
  // This approach allows experimentation with the API, however, in a production scenario
  // this should ideally be either a session or a token verification, depending on the use case.
  // 
  // This logic would normally be placed in a middleware method such that it can be reused 
  // for multiple protected API routes.
  const session = await getServerSession(req, res, authOptions)
  const token = await getToken({ req, secret: process.env.JWT_SECRET! })

  if (!session && !token) {
    return res.status(401).end()
  }

  res.status(200).json({
    secret: 'some secret here'
  })
}

export default handler
