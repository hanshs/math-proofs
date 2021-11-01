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
// interface ClaimArgs {
//   include: {
//     successor: ClaimArgs
//   }
// }
function includeNestedSuccessor(amount: number): Prisma.ClaimArgs {
  return {
    include: { successor: amount === 0 ? true : includeNestedSuccessor(amount - 1) }
  }
}

async function getTheorem(req: Request, res: Response) {
  try {
    const theorem = await prisma.theorem.findFirst({
      where: { id: Number(req.query.id) },
      include: {
        claim: includeNestedSuccessor(5),
        proof: { include: { claim: includeNestedSuccessor(5) } }
      }
    })

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

