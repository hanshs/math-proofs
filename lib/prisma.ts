import { Claim, PrismaClient, ProofStep, Theorem } from '@prisma/client'

// export interface ProofWithArguments extends Proof {
//     arguments: (ArgumentsOnProof & {
//         argument: Argument;
//     })[];
// }

export interface TheoremWithClaim extends Theorem {
    claim: Claim & {
        successor: Claim | null;
    };
}

export interface TheoremWithProofSteps extends TheoremWithClaim {
    proof: (ProofStep & {
        claim: (Claim & {
            successor: Claim | null;
        })[];
    })[];
}


declare global {
    var prisma: PrismaClient | undefined;
}

const prisma = global.prisma || new PrismaClient({ log: ["info"] });

if (process.env.NODE_ENV !== "production") global.prisma = prisma;

export default prisma;