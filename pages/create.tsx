
import React from 'react'

import Head from 'next/head'
import CreateProof from "../components/CreateProof";
import { Prisma } from '@prisma/client';
import { createTheorem } from '../lib/data';
import Theorem from '../components/Theorem';
import { TheoremWithProofSteps } from '../lib/prisma';

interface Claim {
  statement: string
  successor?: Claim
}

interface ProofStep {
  claim: Claim[]
}

interface CreateClaimProps {
  className?: string
  claim?: Claim
  onChange: (claim: Claim) => void
}

interface CreateProofStepsProps {
  onChange: (steps: ProofStep[]) => void
}

function CreateProofSteps({ onChange }: CreateProofStepsProps) {
  const [steps, setSteps] = React.useState<ProofStep[]>([{ claim: [{ statement: '' }] }])

  const addStep = () => {
    const newSteps = [...steps]
    newSteps.push({ claim: [{ statement: '' }] })
    setSteps(newSteps)
  }

  const addClaimToStep = (stepIndex: number) => {
    const newSteps = [...steps]
    newSteps[stepIndex].claim.push({ statement: '' })
    setSteps(newSteps)
  }

  const updateClaim = (claim: Claim, stepIndex: number, claimIndex: number) => {
    const newSteps = [...steps]
    newSteps[stepIndex].claim[claimIndex] = claim
    setSteps(newSteps)
  }

  React.useEffect(() => {
    onChange(steps)
  }, [steps, onChange])

  return (
    <ol className="space-y-4">
      {steps.map((step, stepIndex) => (

        <li className="space-x-4 flex" key={stepIndex}>
          <div className="flex items-center">

            <div className="text-2xl font-semibold mr-4 self-start pt-2">{stepIndex + 1}.</div>

            <div className="space-y-2">
              {step.claim.map((claim, claimIndex) => (
                <div key={claimIndex}>
                  <CreateClaim claim={claim} onChange={(claim) => updateClaim(claim, stepIndex, claimIndex)} />
                </div>
              ))}
            </div>

          </div>

          <button className="btn self-end" onClick={() => addClaimToStep(stepIndex)}>Add Statement</button>
        </li>

      ))}
      <button className="btn btn-secondary" onClick={addStep}>Add Step</button>
    </ol>
  )
}


function CreateClaim(props: CreateClaimProps) {
  const [claim, setClaim] = React.useState<Claim>(props.claim || { statement: '' })

  const addSuccessor = () => {
    setClaim({ ...claim, successor: { statement: '' } })
  }

  const onChangeSuccessor = (successor: Claim) => {
    setClaim({ ...claim, successor })
  }

  const onChangeStatement = (e: React.ChangeEvent<HTMLInputElement>) => {
    setClaim({ ...claim, statement: e.target.value })
  }

  React.useEffect(() => {
    props.onChange(claim)
  }, [claim])

  return (
    <div className={`space-y-1 ${props.className || ''}`}>
      <input className="basic-input" placeholder="Insert statement" onChange={onChangeStatement} />
      {claim.successor && <CreateClaim className="ml-4" claim={claim.successor} onChange={onChangeSuccessor} />}
      {!claim.successor && <button className="ml-2" onClick={addSuccessor}>➕</button>}
    </div>
  )
}

export default function CreateProofPage() {
  const [claim, setClaim] = React.useState<Claim>()
  const [proof, setProof] = React.useState<ProofStep[]>()

  const onChangeTheoremClaim = (claim: Claim) => {
    setClaim(claim)
  }

  const onChangeTheoremProofSteps = (steps: ProofStep[]) => {
    setProof(steps)
  }

  const claim1: Prisma.ClaimCreateNestedOneWithoutTheoremInput = {
    create: {
      statement: 'This is a theorem statement',
    }
  }
  const proof1: Prisma.ProofStepCreateNestedManyWithoutTheoremInput = {
    create: [
      { claim: { create: { statement: 'Theoreem proof step one', successor: { create: { statement: 'Step one more detailed' } } } } },
      { claim: { create: { statement: 'Theorem proof step two' } } },
      {
        claim: {
          create: [
            { statement: 'Step three 1' },
            { statement: 'Step three 2' },
            { statement: 'Step three 3', successor: { create: { statement: 'Step three 3 more detailed' } } }
          ]
        }
      },
      { explanation: 'I am a step with just an explanation' }
    ]
  }




  const create = async () => {
    if (!claim && !proof) return
    // const steps: Prisma.ProofStepCreateNestedManyWithoutTheoremInput =
    //  proof?.map(step => step.claim.forEach(createClaim))

    const createClaim = (claim: Claim): Prisma.ClaimCreateNestedOneWithoutTheoremInput => {
      return {
        create: {
          statement: claim.statement,
          ...(claim.successor ? { successor: createClaim(claim.successor) } : {})
        }
      }
    }
    // if (claim && proof) {
    //   for (const step of proof) {
    //     const claims = []

    //     for (const claim of step.claim) {
    //       claims.push({ claim: { create: createClaim(claim) } })
    //     }

    //     steps.push(claims)
    //   }
    // }
    // const steps = () =>

    // console.log(steps)

    const input: Prisma.TheoremCreateInput = {
      claim: createClaim(claim!),
      proof: {
        create: proof?.map(step => {
          return {
            claim: {
              create: step.claim.map((claim, index) => ({
                statement: claim.statement,
                successor: claim.successor ? createClaim(claim.successor) : undefined,
                orderIndex: index,
              }))
            }
          }
        })
      }
    }
    const response = await createTheorem(input)

    console.log({ response })
  }

  return (
    <>
      <Head>
        <title>Create a theorem</title>
      </Head>

      <h1 className="font-semibold text-2xl mb-4">Create a theorem</h1>

      <div className="space-y-4">
        <div className="bg-yellow-50 py-6 px-4">
          <p className="font-semibold text-xl mb-6">Claim</p>
          <CreateClaim onChange={onChangeTheoremClaim} />
        </div>

        <div className="bg-yellow-50 py-6 px-4">
          <p className="font-semibold text-xl mb-6">Proof Steps</p>
          <CreateProofSteps onChange={onChangeTheoremProofSteps} />
        </div>

        {claim && proof && claim.statement !== '' && (
          <div className="bg-gray-100 py-6 px-4 relative">
            <span className="absolute right-4 top-2 text-gray-400">Theorem Preview</span>
            <Theorem theorem={{ claim, proof } as TheoremWithProofSteps} />
            {proof[0].claim[0].statement !== '' && (
              <button className="btn ml-auto block" onClick={create}>Create</button>
            )}
          </div>
        )}
      </div>
    </>
  )
}