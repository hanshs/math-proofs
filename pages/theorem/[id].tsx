
import React from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'

import { deleteTheorem, useTheorem } from '../../lib/data'
import Head from 'next/head'
import Theorem from '../../components/Theorem'

export default function ProofPage() {
  const router = useRouter()
  const theorem = useTheorem(router.query.id)
  const session = useSession({ required: false })

  if (!theorem) return null

  const onClickDelete = async () => {
    const confirm = window.confirm('Are you sure?')

    if (confirm) {
      const res = await deleteTheorem(theorem.id)

      if (res.success) {
        router.push('/')
      }
    }
  }

  return (
    <>
      <Head>
        <title>{theorem.claim.statement}</title>
      </Head>

      <Theorem theorem={theorem} />

      {session.status === 'authenticated' &&
      <button className="mt-4 btn btn-secondary block ml-auto" onClick={onClickDelete}>Delete Theorem</button>}
    </>
  )
}