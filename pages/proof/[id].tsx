
import React from 'react'
import { useRouter } from 'next/router'

import Argument from '../../components/Argument'
import { useProof } from '../../lib/data'
import Head from 'next/head'

export default function ProofPage() {
  const router = useRouter()
  const { data } = useProof(String(router.query.id))
  if (!data?.proof) return null
  const { proof } = data

  return (
    <>
      <Head>
        <title>{proof.assumption}</title>
      </Head>
      <ol className="list-decimal list-inside">
        <h3>Assumption: {proof.assumption}</h3>

        <p>{proof?.detailed && proof.detailed}</p>

        {proof?.arguments?.map((argument, index) => (
          <Argument key={index} argument={argument} />
        ))}

        <p>Conclusion: {proof?.conclusion}</p>
      </ol>

      <small>
        <pre>{JSON.stringify(proof, null, 2)}</pre>
      </small>
    </>
  )
}