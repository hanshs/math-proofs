import { Prisma } from "@prisma/client";

export function createProof(values: Prisma.ProofCreateInput) {
    return fetch('/api/proof/create', { method: 'POST', body: JSON.stringify(values) }).then(r => r.json())
}

export function getProofs() {
    return fetch('/api/proofs').then(r => r.json())
}
export function getProof(id: string | number) {
    return fetch(`/api/proof/${id}`).then(r => r.json())
}