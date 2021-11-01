import { Claim, Prisma, ProofStep, Theorem } from "@prisma/client";
import useSWR from "swr";
import { TheoremWithClaim, TheoremWithProofSteps } from "./prisma";
// import { ProofWithArguments } from "./prisma";

const fetcher = (url: RequestInfo, options?: RequestInit) => fetch(url, options).then((res) => res.json());

// queries
export function useTheorems() {
    return useSWR<{ theorems: TheoremWithClaim[] }>("/api/theorems", fetcher).data?.theorems;
}

export function useTheorem(id?: string) {
    return useSWR<{ theorem: TheoremWithProofSteps }>(id ? `/api/theorem/${id}` : null, fetcher).data?.theorem;
}

// mutations
export function createTheorem(input: Prisma.TheoremCreateInput) {
    return fetcher('/api/theorem/create', { method: 'POST', body: JSON.stringify(input) })
}

export function deleteTheorem(id: number) {
    return fetcher(`/api/theorem/${id}`, { method: 'DELETE' })
}