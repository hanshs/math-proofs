import { PrismaClient, Proof, Argument, ArgumentsOnProof } from '@prisma/client'

export interface ProofWithArguments extends Proof {
    arguments: (ArgumentsOnProof & {
        argument: Argument;
    })[];
}

declare global {
    var prisma: PrismaClient
}

if (process.env.NODE_ENV === 'production') {
    prisma = new PrismaClient()
} else {
    if (!global.prisma) {
        global.prisma = new PrismaClient()
    }
    prisma = global.prisma
}

export default prisma
