import React from "react"
import { IProofStep, ITheorem } from "../lib/prisma"
import Claim from "./Claim"

interface SubProofProps {
    subProof: IProofStep[]
}

function SubProof(props: SubProofProps) {
    return (
        <div className=" ml-4">
            <ol className="list-decimal list-inside space-y-4 pl-4 border-gray-300 border-l-2 mt-2">
                {props.subProof.sort((a, b) => a.orderKey - b.orderKey).map((step, index) => {
                    return (
                        <li key={step.id || index}>
                            <Claim claim={step.claim} />
                            {step.subProof && <SubProof subProof={step.subProof} />}
                        </li>
                    )
                })}

            </ol>
        </div>
    )
}


interface TheoremProps {
    theorem: ITheorem
}

export default function Theorem(props: TheoremProps) {
    return (
        <div className="space-y-3">
            <h3 className="text-xl"><Claim claim={props.theorem.claim} /></h3>
            <ol className="list-decimal list-inside space-y-4 pl-4 border-gray-300 border-l-2">

                {props.theorem.proof.sort((a, b) => a.orderKey - b.orderKey).map((step, index) => {
                    return (
                        <li key={step.id || index}>
                            <Claim claim={step.claim} />
                            {step.subProof && <SubProof subProof={step.subProof} />}
                        </li>
                    )
                })}

            </ol>
        </div>
    )
}