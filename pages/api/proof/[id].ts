import { NextApiRequest, NextApiResponse } from 'next';
import { ProofWithArguments } from '../../../lib/prisma';
import prisma from '../../../lib/prisma'

type Request = NextApiRequest
type Response = NextApiResponse<{
    success: boolean
    proof?: ProofWithArguments | null
    error?: unknown
}>

export default async function handler(req: Request, res: Response) {
    if (req.method === 'GET') {
        getProof(req, res)
    } else if (req.method === 'PUT') {
        // updateProof(req, res)
        // res.status(400)
    } else {
        res.status(400)
    }
}

async function getProof(req: Request, res: Response) {
    const id = req.query.id

    if (!req.query.id) {
        res.status(400)
    }

    try {
        const proof = await prisma.proof.findFirst({
            where: { id: Number(id) },
            include: {
                arguments: {
                    include: { argument: true },
                    orderBy: { orderIndex: 'asc' }
                }
            }
        })

        res.status(200).json({ success: true, proof })
    } catch (error) {
        console.log('Error getting Proof:', id, { error })
        res.status(500).json({ success: false, error })
    }
}

    // async function updateProof(req: Request, res: Response) {
    //     res.status(200).send("Implement me")
    // }

