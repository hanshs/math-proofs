import { Argument, Proof } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma'

type Response = {
    success: boolean
    arguments?: Argument[]
    error?: unknown
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
    if (req.method === 'GET') {
        try {
            res.status(200).json({
                success: true,
                arguments: await prisma.argument.findMany()
            })
        } catch (error) {
            console.log('Error getting Arguments:', { error })
            res.status(500).json({ success: false, error })
        }
    } else {
        res.status(400)
    }
}