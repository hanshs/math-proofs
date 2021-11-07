
import React from "react"
import { IClaimCreate, CreateClaim } from "./CreateClaim"

export interface IProofStepCreate {
    claim: IClaimCreate
    subProof?: IProofStepCreate[]
}

interface CreateProofStepsProps {
    onChange: (steps: IProofStepCreate[]) => void
    className?: string
}

export function CreateProofSteps(props: CreateProofStepsProps) {
    const emptyClaim = { claim: { statement: '' } }
    const [steps, setSteps] = React.useState<IProofStepCreate[]>([emptyClaim])

    const addStep = () => {
        const newSteps = [...steps]
        newSteps.push(emptyClaim)
        setSteps(newSteps)
    }

    const addSubProof = (stepIndex: number) => {
        const newSteps = [...steps]
        newSteps[stepIndex].subProof = [emptyClaim]
        setSteps(newSteps)
    }

    const updateClaim = (claim: IClaimCreate, stepIndex: number) => {
        const newSteps = [...steps]
        newSteps[stepIndex].claim = claim
        setSteps(newSteps)
    }

    const updateSubProof = (subProof: IProofStepCreate[], stepIndex: number) => {
        const newSteps = [...steps]
        newSteps[stepIndex].subProof = subProof
        setSteps(newSteps)
    }

    React.useEffect(() => {
        props.onChange(steps)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [steps])

    return (
        <ol className="space-y-4">
            {steps.map((step, stepIndex) => (

                <li className="space-x-4 flex" key={stepIndex}>
                    <div className="flex items-center">

                        <div className="text-2xl font-semibold mr-4 self-start pt-2">{stepIndex + 1}.</div>

                        <div className="space-y-2">

                            <CreateClaim claim={step.claim} onChange={(claim) => updateClaim(claim, stepIndex)} />

                            {step.subProof && (
                                <div className="text-sm scale-95 p-3 border">
                                    <CreateProofSteps onChange={(subProof) => updateSubProof(subProof, stepIndex)} />
                                </div>
                            )}
                        </div>

                    </div>

                    {!step.subProof && <button className="btn self-end" onClick={() => addSubProof(stepIndex)}>Add SubProof</button>}
                </li>

            ))}
            <button className="btn btn-secondary" onClick={addStep}>Add Step</button>
        </ol>
    )
}
