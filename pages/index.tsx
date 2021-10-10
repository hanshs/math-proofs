import { Proof } from '@prisma/client'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import CreateProof from '../components/CreateProof'
import prisma from '../lib/prisma'

interface IIndexPageProps {
  proofs: Proof[]
}

export default function IndexPage(props: IIndexPageProps) {
  return (
    <>
      <Head>
        <title>Mathematical proofs</title>
        <meta name="description" content="Environment for structured mathematical proofs" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="font-semibold mb-2">Mathematical Proofs</h1>
      <div className="flex">
        <ol>
          {props.proofs.map((proof, index) => (
            <li key={index} className="hover:text-green-600 text-green-800">
              <Link href={`/proof/${proof.id}`} >
                <a>{proof.assumption}</a>
              </Link>
            </li>
          ))}
          <small>
            <pre>{JSON.stringify(props.proofs, undefined, 2)}</pre>
          </small>
        </ol>
        <CreateProof />
      </div>

    </>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const proofs = await prisma.proof.findMany()

  return {
    props: { proofs }
  }
}