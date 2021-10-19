import { Proof } from '@prisma/client'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import { useProofs } from '../lib/data'
import prisma from '../lib/prisma'

export default function IndexPage() {
  const proofs = useProofs()?.data?.proofs

  return (
    <>
      <Head>
        <title>Mathematical proofs</title>
        <meta name="description" content="Environment for structured mathematical proofs" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="mainContainer">
        <div className="flex justify-between">
          <div>
            <h1 className="font-semibold text-2xl">Mathematical Proofs</h1>
            <p className="mb-4">Here you can find the list of all proofs currently in the system.</p>
          </div>
          <Link href={'/create'}><a className="btn">Create a proof</a></Link>
        </div>
        <div className="flex">
          <ol className="w-full">
            {proofs?.map((proof, index) => (
              <li key={index} className="hover:text-green-600 text-green-800 proofListItem">
                <Link href={`/proof/${proof.id}`} >
                  <a>{proof.assumption}</a>
                </Link>
              </li>
            ))}
            {/*
            <small>
              <pre>{JSON.stringify(props.proofs, undefined, 2)}</pre>
            </small>
            */}
          </ol>
        </div>
      </div>

    </>
  )
}

// export const getStaticProps: GetStaticProps = async (context) => {
//   const proofs = await prisma.proof.findMany({ where: { deletedFlag: false } })

//   return {
//     props: { proofs }
//   }
// }