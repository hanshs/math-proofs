import { Theorem } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma'

type Response = {
    success: boolean
    theorems?: Theorem[]
    error?: unknown
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
    if (req.method === 'GET') {
        try {
            res.status(200).json({
                success: true,
                theorems: await prisma.theorem.findMany({ 
                    include: { 
                        claim: true,
                        proof: {
                            include: {
                                claim: true
                            }
                        }
                    } })
            })
        } catch (error) {
            console.log('Error getting Theorems:', { error })
            res.status(500).json({ success: false, error })
        }
    } else {
        res.status(400)
    }
}