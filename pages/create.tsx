import React from 'react'

import Head from 'next/head'
import { Prisma } from '@prisma/client';
import { useRouter } from 'next/router';

import Theorem from '../components/Theorem';
import { ITheorem } from '../lib/prisma';
import { CreateClaim, IClaimCreate } from '../components/CreateClaim';
import { CreateProofSteps, IProofStepCreate } from '../components/CreateProofSteps';

import { createTheorem } from '../lib/data';
import useSession from '../lib/use-session';


export default function CreateProofPage() {
  const [claim, setClaim] = React.useState<IClaimCreate>()
  const [proof, setProof] = React.useState<IProofStepCreate[]>()
  const router = useRouter()
  const session = useSession({ required: false })

  const onChangeTheoremClaim = (claim: IClaimCreate) => {
    setClaim(claim)
  }

  const onChangeTheoremProofSteps = (steps: IProofStepCreate[]) => {
    setProof(steps)
  }

  const create = async () => {
    if (!claim || !proof) return

    let inputs, index;

    inputs = document.getElementsByTagName('input');
    for (index = 0; index < inputs.length; ++index) {
      if (inputs[index].value == "") {
        window.alert("Please delete or fill empty proof steps and statements!")
        return
      }
    }
    const createClaimInput = (claim: IClaimCreate): Prisma.ClaimCreateNestedOneWithoutTheoremInput => {
      return {
        create: {
          statement: claim.statement,
          ...(claim.successor ? { successor: createClaimInput(claim.successor) } : {})
        }
      }
    }

    const createStepsInput = (steps: IProofStepCreate[]): Prisma.ProofStepCreateNestedManyWithoutTheoremInput => {
      return {
        create: steps.map((step, index) => {
          return {
            claim: createClaimInput(step.claim),
            subProof: step.subProof ? createStepsInput(step.subProof) : undefined,
            orderKey: index
          }
        })
      }
    }

    const input: Prisma.TheoremCreateInput = {
      claim: createClaimInput(claim),
      proof: createStepsInput(proof)
    }

    const response = await createTheorem(input)

    if (response.success && response.theoremId) {
      router.push(`/theorem/${response.theoremId}`)
    }
  }

  return (
    <>
      <Head>
        <title>Create a theorem</title>
      </Head>

      {session.status === 'unauthenticated' &&
        <p className="font-semibold text-xl mb-2">Please sign in to create a theorem.</p>}

      {session.status === 'authenticated' &&
        <div>
          <h1 className="font-semibold text-2xl mb-4" data-cy="create-title">Create a theorem</h1>
          <div>
            <p>You can use LaTeX in you proof steps</p>
            <p className="mb-2 italic">Hint: try surrounding your variables with $ symbols</p>
          </div>

          <div className="space-y-4">
            <div className="bg-gray-50 py-6 px-4 rounded" data-cy="claim-div">
              <p className="font-semibold text-xl mb-6">Claim</p>
              <CreateClaim onChange={onChangeTheoremClaim} />
            </div>

            <div className="bg-gray-50 py-6 px-4 rounded" data-cy="steps-div">
              <p className="font-semibold text-xl mb-6">Proof Steps</p>
              <CreateProofSteps onChange={onChangeTheoremProofSteps} />
            </div>

            {claim && proof && claim.statement !== '' && (
              <div className="bg-gray-100 py-6 px-4 relative rounded" data-cy="preview-div">
                <span className="absolute right-4 top-2 text-gray-400">Theorem Preview</span>
                <Theorem theorem={{ claim, proof } as ITheorem} />
                {proof[0].claim.statement !== '' && (
                  <button className="btn ml-auto block" data-cy="create-btn" onClick={create}>Create</button>
                )}
              </div>
            )}
          </div>
        </div>
      }
    </>
  )
}