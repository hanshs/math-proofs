import { Prisma } from "@prisma/client";

export function createProof(values: Prisma.ProofCreateInput) {
    return fetch('/api/proof/create', { method: 'POST', body: JSON.stringify(values) }).then(r => r.json())
}