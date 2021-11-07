
import React from 'react'

import Head from 'next/head'
import { Prisma } from '@prisma/client';
import { useRouter } from 'next/router';

import Theorem from '../components/Theorem';
import { ITheorem } from '../lib/prisma';
import { CreateClaim, IClaimCreate } from '../components/CreateClaim';
import { CreateProofSteps, IProofStepCreate } from '../components/CreateProofSteps';

import { createTheorem } from '../lib/data';


export default function CreateProofPage() {
  const [claim, setClaim] = React.useState<IClaimCreate>()
  const [proof, setProof] = React.useState<IProofStepCreate[]>()
  const router = useRouter()

  const onChangeTheoremClaim = (claim: IClaimCreate) => {
    setClaim(claim)
  }

  const onChangeTheoremProofSteps = (steps: IProofStepCreate[]) => {
    setProof(steps)
  }

  const create = async () => {
    if (!claim && !proof) return

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
      claim: createClaimInput(claim!),
      proof: createStepsInput(proof!)
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
            <Theorem theorem={{ claim, proof } as ITheorem} />
            {proof[0].claim.statement !== '' && (
              <button className="btn ml-auto block" onClick={create}>Create</button>
            )}
          </div>
        )}
      </div>
    </>
  )
}