import { Theorem, Prisma } from '.prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
// import { ProofWithArguments } from '../../../lib/prisma';
import prisma from '../../../lib/prisma'

type Request = NextApiRequest
type Response = NextApiResponse<{
  success: boolean
  theorem?: Theorem | null
  error?: unknown
}>

export default async function handler(req: Request, res: Response) {
  if (!req.query.id) {
    res.status(400)
  }

  if (req.method === 'GET') {
    getTheorem(req, res)
  }

  if (req.method === 'DELETE') {
    deleteProof(req, res)
  }

  res.status(400)

}

function includeClaimDetailLevels(amount: number): Prisma.ClaimArgs {
  return {
    include: { successor: amount === 0 ? true : includeClaimDetailLevels(amount - 1) }
  }
}

function includeSubProofLevels(amount: number): Prisma.ProofStepArgs {
  return {
    include: {
      claim: includeClaimDetailLevels(5),
      ...(amount !== 0 ? { subProof: includeSubProofLevels(amount - 1) } : {})
    }
  }
}


async function getTheorem(req: Request, res: Response) {
  try {
    const query = {
      where: { id: Number(req.query.id) },
      include: {
        claim: includeClaimDetailLevels(5),
        proof: {
          include: {
            claim: includeClaimDetailLevels(5),
            subProof: includeSubProofLevels(5)
          }
        }
      }
    }

    const theorem = await prisma.theorem.findFirst(query)

    res.status(200).json({ success: true, theorem })
  } catch (error) {
    console.log('Error getting Proof:', req.query.id, { error })
    res.status(500).json({ success: false, error })
  }
}

async function deleteProof(req: Request, res: Response) {
  try {
    await prisma.theorem.delete({ where: { id: Number(req.query.id) } })

    res.status(200).json({ success: true })
  } catch (error) {
    res.status(500).json({ success: false, error })
  }
}

