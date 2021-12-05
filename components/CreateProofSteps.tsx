
import React from "react"
import { IClaimCreate, CreateClaim } from "./CreateClaim"

export interface IProofStepCreate {
    claim: IClaimCreate
    subProof?: IProofStepCreate[]
}

interface CreateProofStepsProps {
    onChange: (steps: IProofStepCreate[]) => void
    className?: string
    isSubProof?: boolean
    onRemoveSubProof?: () => void
}

export function CreateProofSteps(props: CreateProofStepsProps) {
    const emptyClaim = { claim: { statement: '' } }
    const [steps, setSteps] = React.useState<IProofStepCreate[]>([emptyClaim])
    const [hoverStep, setHoverStep] = React.useState<number | undefined>()

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

    const removeStep = (stepIndex: number) => {
        const newSteps = [...steps]
        newSteps.splice(stepIndex, 1)
        setSteps(newSteps)
    }

    const removeSubProof = (stepIndex: number) => {
        const newSteps = steps.map((step, index) => index === stepIndex ? { ...step, subProof: undefined } : step)
        setSteps(newSteps)
    }

    React.useEffect(() => {
        props.onChange(steps)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [steps])

    return (
        <ol className="space-y-4">
            {steps.map((step, stepIndex) => (

                <li className={`space-x-4 flex justify-between p-2 rounded ${stepIndex === hoverStep ? ' bg-red-200' : ''}`} key={stepIndex}>
                    <div className="flex items-center">

                        <div className="text-2xl font-semibold mr-4 self-start pt-2">{stepIndex + 1}.</div>

                        <div className="space-y-2">

                            <CreateClaim claim={step.claim} onChange={(claim) => updateClaim(claim, stepIndex)} />

                            {step.subProof && (
                                <div className={`text-sm scale-95 p-3 border w-full`}>
                                    <CreateProofSteps onChange={(subProof) => updateSubProof(subProof, stepIndex)} isSubProof={true} onRemoveSubProof={() => removeSubProof(stepIndex)} />
                                </div>
                            )}
                        </div>

                    </div>
                    <div className="flex items-center space-x-4">
                        {stepIndex !== 0 && <button className="btn btn-small" onClick={() => removeStep(stepIndex)} onMouseEnter={() => setHoverStep(stepIndex)} onMouseLeave={() => setHoverStep(undefined)}>Delete Step</button>}
                        {!step.subProof && <button className="btn btn-secondary btn-small" data-cy="add-subproof" onClick={() => addSubProof(stepIndex)}>Add Subproof</button>}
                    </div>

                </li>

            ))}
            <div className="flex justify-between">
                <button className="btn btn-secondary" data-cy="add-step" onClick={addStep}>Add Step</button>
                {props.isSubProof && <button className="btn" onClick={props.onRemoveSubProof}>Delete Subproof</button>}
            </div>
        </ol>
    )
}
