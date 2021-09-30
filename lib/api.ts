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

export function updateProof(proofId: number, data: {}) {
    return prisma.proof.update({ where: { id: proofId }, data })
}

export function deleteProof(proofId: number) {
    return updateProof(proofId, { deletedFlag: true })
}

export function createStep(data: { statement: string }) {
    return prisma.step.create({ data })
}

export function deleteStep(stepId: number) {
    return updateStep(stepId, { deletedFlag: true })
}

export function updateStep(stepId: number, data: {}) {
    return prisma.step.update({ where: { id: stepId }, data })
}