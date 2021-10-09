import { Proof } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import * as API from '../../lib/api'

type Response = {
    success: boolean
    proofs?: Proof[]
    error?: unknown
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
    if (req.method === 'GET') {
        try {
            res.status(200).json({
                success: true,
                proofs: await API.getAllProofs()
            })
        } catch (error) {
            console.log('Error getting Proofs:', { error })
            res.status(500).json({ success: false, error })
        }
    } else {
        res.status(400)
    }
}