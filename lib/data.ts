import useSWR from "swr";
import { ProofWithArguments } from "./prisma";

const get = (url: string) => fetch(url).then((res) => res.json());

export function useProofs() {
    return useSWR<ProofWithArguments[]>("/api/proofs", get);
}

export function useProof(id?: string) {
    return useSWR<{ proof: ProofWithArguments }>(id ? `/api/proof/${id}` : null, get);
}
