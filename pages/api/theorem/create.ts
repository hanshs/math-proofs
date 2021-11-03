import { Prisma } from '.prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

import prisma from '../../../lib/prisma'

type Response = {
    success: boolean
    theoremId?: number
    error?: unknown
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
    if (req.method === 'POST') {
        const data = JSON.parse(req.body) as Prisma.TheoremCreateInput
        try {
            const result = await prisma.theorem.create({ data })

            res.status(200).json({ success: true, theoremId: result.id })
        } catch (error) {
            console.log('Error creating Theorem:', { data, error })
            res.status(500).json({ success: false, error })
        }
    } else {
        res.status(400)
    }
}