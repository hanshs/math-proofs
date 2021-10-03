import { Proof } from '@prisma/client'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import AddProof from '../components/AddProof'

import * as API from '../lib/api'

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
      <ul>
        {props.proofs.map((proof, index) => (
          <li key={index} className="hover:text-green-600">
            <Link href={`/proof/${proof.id}`} >
              <a>{proof.assumption}</a>
            </Link>
          </li>
        ))}
        <small>
          <pre>{JSON.stringify(props.proofs, undefined, 2)}</pre>
        </small>
      </ul>
      <AddProof />
    </>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {
      proofs: await API.getAllProofs()
    }
  }
}