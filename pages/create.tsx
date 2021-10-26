
import React from 'react'

import Head from 'next/head'
import CreateProof from "../components/CreateProof";

export default function CreateProofPage() {

  return (
    <>
      <Head>
        <title>Create a proof</title>
      </Head>

      <h1 className="font-semibold text-2xl pb-2">Create a proof</h1>
      <CreateProof />

    </>
  )
}