import { PrismaClient, Proof, Argument } from '@prisma/client'

export interface ProofWithArguments extends Proof {
    arguments: Argument[];
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

export default DatabaseClient.getInstance().prisma
