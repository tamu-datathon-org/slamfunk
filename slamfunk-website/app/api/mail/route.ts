import type { NextApiRequest, NextApiResponse } from 'next'
 
type ResponseData = {
  message: string
}
 
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
    if (req.method === 'POST') {
        res.status(200).json({message: 'Email sent'})
    } else {
        res.status(405).json({message: 'Method not allowed'})
    }
}
