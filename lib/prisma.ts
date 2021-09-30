import { PrismaClient, Proof, Step } from '@prisma/client'

// look away
export interface IProof extends Proof {
    steps: IProofStep[];
}

export interface IProofStep extends Step {
    subProof: (Proof & {
        steps: Step[];
    });
    steps: Step[];
}

export interface ISubProof extends Proof {
    steps: Step[];
}

class DatabaseClient {
    public prisma: PrismaClient
    private static instance: DatabaseClient

    private constructor() {
        this.prisma = new PrismaClient()
    }

    public static getInstance = () => {
        if (!DatabaseClient.instance) {
            DatabaseClient.instance = new DatabaseClient()
        }

        return DatabaseClient.instance
    }
}

export default DatabaseClient

