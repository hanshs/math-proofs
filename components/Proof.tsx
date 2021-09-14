import { useState } from "react"
import { IProof } from "../lib"

function ProofStep(props: { step: IProof }) {
  const { step } = props
  const [isOpen, setIsOpen] = useState(false)

  return (
    <li>
      <div
        className={`${(step.detailed || step.steps || step.subproof) ? 'hover:text-green-600 cursor-pointer' : ''} inline-block`}
        onClick={() => setIsOpen(!isOpen)}>
        {step.statement}
      </div>
      {isOpen && (
        <div className="pl-8">
          {step.detailed}
          {step.steps && <Proof proof={{ steps: step.steps }} />}
          {step.subproof && <Proof proof={step.subproof} />}
        </div>)}
    </li>
  )
}

export default function Proof(props: { proof: IProof }) {
  return (
    <ol className="list-decimal list-inside">
      <h3>{props.proof.statement}</h3>
      {props.proof.steps.map((step, index) => <ProofStep key={index} step={step} />)}
    </ol>
  )
}