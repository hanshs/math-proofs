import { Claim, PrismaClient, ProofStep, Theorem } from '@prisma/client'

export interface IClaim extends Claim {
    successor: IClaim | null
}

export interface ITheorem extends Theorem {
    claim: IClaim
    proof: IProofStep[];
}

export interface IProofStep extends ProofStep {
    claim: IClaim
    subProof?: IProofStep[],
    orderKey: number
}

declare global {
    var prisma: PrismaClient | undefined;
}

const prisma = global.prisma || new PrismaClient({ log: ["info"] });

if (process.env.NODE_ENV !== "production") global.prisma = prisma;

export default prisma;