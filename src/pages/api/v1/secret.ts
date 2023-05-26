import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from "next-auth/next"
import { authOptions } from "./[...nextauth]"

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

  const session = await getServerSession(req, res, authOptions)

  if (!session) {
    return res.status(401).end()
  }

  res.status(200).json({
    secret: 'some secret here'
  })
}

export default handler
