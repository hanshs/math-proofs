import { Prisma } from '@prisma/client'
import prisma from './prisma'

export function getAllProofs() {
    return prisma.proof.findMany()
}

export function getAllProofIds() {
    return prisma.proof.findMany({ select: { id: true } })
}

export function getProofById(id: string) {
    return prisma.proof.findFirst({
        where: { id: Number(id) },
        include: {
            arguments: true
        }
    })
}

export function createProof(data: Prisma.ProofCreateInput) {
    return prisma.proof.create({ data })
}

export function updateProof(proofId: number, data: Prisma.ProofUpdateInput) {
    return prisma.proof.update({ where: { id: proofId }, data })
}

export function deleteProof(proofId: number) {
    return updateProof(proofId, { deletedFlag: true })
}

export function createArgument(data: Prisma.ArgumentCreateInput) {
    return prisma.argument.create({ data })
}

export function deleteArgument(argumentId: number) {
    return updateArgument(argumentId, { deletedFlag: true })
}

export function updateArgument(argumentId: number, data: Prisma.ArgumentUpdateInput) {
    return prisma.argument.update({ where: { id: argumentId }, data })
}