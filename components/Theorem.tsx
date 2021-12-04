import React from "react"
import { IProofStep, ITheorem } from "../lib/prisma"
import Claim from "./Claim"

interface SubProofProps {
    subProof: IProofStep[]
    refIndex: string
}

function SubProof(props: SubProofProps) {
    return (
        <div className=" ml-4">
            <ol className="list-decimal list-inside">
                {props.subProof.sort((a, b) => a.orderKey - b.orderKey).map((step, index) => {
                    const refIndex = `${props.refIndex}.${index + 1}`

                    return (
                        <li key={step.id || index}>
                            <Claim claim={step.claim} refIndex={refIndex} />
                            {step.subProof && <SubProof refIndex={refIndex} subProof={step.subProof} />}
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
            <ol className="list-decimal list-inside space-y-4">
                <h3 className="text-xl"><Claim claim={props.theorem.claim} /></h3>
                {props.theorem.proof.sort((a, b) => a.orderKey - b.orderKey).map((step, index) => {
                    return (
                        <li key={step.id || index}>
                            <Claim refIndex={String(index + 1)} claim={step.claim} />
                            {step.subProof && <SubProof refIndex={String(index + 1)} subProof={step.subProof} />}
                        </li>
                    )
                })}

            </ol>
        </div>
    )
}