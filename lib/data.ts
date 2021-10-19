import { Argument, Prisma } from "@prisma/client";
import useSWR from "swr";
import { ProofWithArguments } from "./prisma";

const fetcher = (url: RequestInfo, options?: RequestInit) => fetch(url, options).then((res) => res.json());

// queries
export function useProofs() {
    return useSWR<{ proofs: ProofWithArguments[] }>("/api/proofs", fetcher);
}

export function useArguments() {
    return useSWR<{ arguments: Argument[] }>("/api/arguments", fetcher);
}

export function useProof(id?: string) {
    return useSWR<{ proof: ProofWithArguments }>(id ? `/api/proof/${id}` : null, fetcher);
}

// mutations
export function createProof(values: Prisma.ProofCreateInput) {
    return fetcher('/api/proof/create', { method: 'POST', body: JSON.stringify(values) })
}

export function deleteProof(id: number) {
    return fetcher(`/api/proof/${id}`, { method: 'DELETE' })
}