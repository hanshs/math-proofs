import { NextApiRequest, NextApiResponse } from 'next';

import prisma from '../../../lib/prisma'

type Response = {
    success: boolean
    proofId?: number
    error?: unknown
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
    if (req.method === 'POST') {
        const values = JSON.parse(req.body)
        try {
            const result = await prisma.proof.create({ data: values })

            res.status(200).json({ success: true, proofId: result.id })
        } catch (error) {
            console.log('Error creating Proof:', { values, error })
            res.status(500).json({ success: false, error })
        }
    } else {
        res.status(400)
    }
}