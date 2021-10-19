
import React from 'react'
import { useRouter } from 'next/router'

import Argument from '../../components/Argument'
import { deleteProof, useProof } from '../../lib/data'
import Head from 'next/head'

export default function ProofPage() {
  const router = useRouter()
  const { data } = useProof(String(router.query.id))
  if (!data?.proof) return null
  const { proof } = data

  const onClickDelete = async () => {
    const confirm = window.confirm('Are you sure?')

    if (confirm) {
      const res = await deleteProof(proof.id)

      if (res.success) {
        router.push('/')
      }
    }
  }

  return (
    <>
      <Head>
        <title>{proof.assumption}</title>
      </Head>
      <div className="mainContainer space-y-3">
        <ol className="list-decimal list-inside">
          <h3>Assumption: {proof.assumption}</h3>

          <p>{proof?.detailed && proof.detailed}</p>

          {proof?.arguments?.map((a, index) => (
            <Argument key={index} argument={a.argument} />
          ))}

          <p>Conclusion: {proof?.conclusion}</p>
        </ol>
        {/*
        <small>
          <pre>{JSON.stringify(proof, null, 2)}</pre>
        </small>
        */}
        <button className="btn btn-secondary block ml-auto" onClick={onClickDelete}>Delete Proof</button>
      </div>
    </>
  )
}