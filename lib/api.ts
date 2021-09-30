import DatabaseClient from './prisma'

const prisma = DatabaseClient.getInstance().prisma

export function getAllProofs() {
    return prisma.proof.findMany({ include: { steps: { include: { subProof: { include: { steps: true } } } } } })
}

export function getAllProofIds() {
    return prisma.proof.findMany({ select: { id: true } })
}

export function getProofById(id: string) {
    return prisma.proof.findFirst({
        where: { id: Number(id) },
        include: {
            steps: {
                include: {
                    subProof: { include: { steps: true } },
                    steps: true
                }
            }
        }
    })
}

export function createProof(data: {}) {
    return prisma.proof.create({ data })
}

export function updateStep(stepId: number, data: {}) {
    return prisma.step.update({ where: { id: stepId }, data })
}