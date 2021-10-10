import { PrismaClient, Proof, Argument, ArgumentsOnProof } from '@prisma/client'

export interface ProofWithArguments extends Proof {
    arguments: (ArgumentsOnProof & {
        argument: Argument;
    })[];
}

declare global {
    var prisma: PrismaClient | undefined;
}

const prisma = global.prisma || new PrismaClient({ log: ["info"] });

if (process.env.NODE_ENV !== "production") global.prisma = prisma;

export default prisma;