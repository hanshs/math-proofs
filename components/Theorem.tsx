import React from "react"
import { TheoremWithProofSteps } from "../lib/prisma"
import Claim from "./Claim"

interface TheoremProps {
    theorem: TheoremWithProofSteps
}

export default function Theorem({ theorem }: TheoremProps) {
    return (
        <div className="space-y-3">
            <ol className="list-decimal list-inside space-y-4">
                <h3 className="text-xl"><Claim claim={theorem.claim} /></h3>

                {theorem.proof.map(step => {
                    return (
                        <li key={step.id}>
                            <ol className="inline-grid">
                                {step.claim
                                    .sort((a, b) => a.orderIndex! - b.orderIndex!)
                                    .map(claim => <li key={claim.id}><Claim claim={claim} /></li>)
                                }
                            </ol>
                        </li>
                    )
                })}

            </ol>
        </div>
    )
}