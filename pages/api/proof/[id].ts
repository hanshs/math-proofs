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
    const id = req.query.id

    if (!req.query.id) {
        res.status(400)
    }

    if (req.method === 'GET') {
        getProof(req, res)
    }

    if (req.method === 'DELETE') {
        deleteProof(req, res)
    }

    res.status(400)

}

async function getProof(req: Request, res: Response) {
    try {
        const proof = await prisma.proof.findFirst({
            where: { id: Number(req.query.id), deletedFlag: false },
            include: {
                arguments: {
                    include: { argument: true },
                    orderBy: { orderIndex: 'asc' }
                }
            }
        })

        res.status(200).json({ success: true, proof })
    } catch (error) {
        console.log('Error getting Proof:', req.query.id, { error })
        res.status(500).json({ success: false, error })
    }
}

async function deleteProof(req: Request, res: Response) {
    try {
        await prisma.proof.update({ where: { id: Number(req.query.id) }, data: { deletedFlag: true } })

        res.status(200).json({ success: true })
    } catch (error) {
        res.status(500).json({ success: false, error })
    }
}

