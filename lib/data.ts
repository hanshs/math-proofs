import { Argument, Prisma } from "@prisma/client";
import useSWR from "swr";
import { ProofWithArguments } from "./prisma";

const get = (url: string) => fetch(url).then((res) => res.json());
const post = (url: string, data: any) => fetch(url, {
    method: 'POST',
    body: JSON.stringify(data)
}).then((res) => res.json());

// queries
export function useProofs() {
    return useSWR<ProofWithArguments[]>("/api/proofs", get);
}

export function useArguments() {
    return useSWR<{ arguments: Argument[] }>("/api/arguments", get);
}

export function useProof(id?: string) {
    return useSWR<{ proof: ProofWithArguments }>(id ? `/api/proof/${id}` : null, get);
}

// mutations
export function createProof(values: Prisma.ProofCreateInput) {
    return post('/api/proof/create', values)
}
