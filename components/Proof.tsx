import { useState } from "react"
import { IProof, IProofStep } from "../lib/prisma"

function ProofStep(props: { step: IProofStep }) {
  const { step } = props
  const [isOpen, setIsOpen] = useState(false)

  return (
    <li>
      <div
        className={`${(step.detailed || step.subProof) ? 'hover:text-green-600 cursor-pointer' : ''} inline-block`}
        onClick={() => setIsOpen(!isOpen)}>
        {step.statement}
      </div>
      {isOpen && (
        <div className="pl-8">
          {step.detailed}
          {/* {step.steps && <Proof proof={{ steps: step.steps }} />} */}
          {step.subProof && <Proof proof={step.subProof as IProof} />}
        </div>)}
    </li>
  )
}

export default function Proof(props: { proof: IProof }) {
  return (
    <ol className="list-decimal list-inside">
      <h3>{props.proof.description}</h3>
      {props.proof.steps.map((step, index) => <ProofStep key={index} step={step} />)}
    </ol>
  )
}