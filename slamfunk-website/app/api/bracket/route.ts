import type { NextApiRequest, NextApiResponse } from 'next'
 
type ResponseData = {
  message: string
}
 
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
    if (req.method === 'GET') {
        res.status(200).json({message: 'Successfully created bracket'})
    } else if (req.method === 'POST') {
        res.status(201).json({message: 'Successfully created bracket'})
    } else if (req.method === 'PUT') {
        res.status(200).json({message: 'Successfully created bracket'})
    } else if (req.method === 'DELETE') {
        res.status(200).json({message: 'Successfully created bracket'})
    } else {
        res.status(405).json({ message: 'Method not allowed' })
    }
}

