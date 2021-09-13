import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import { getProofSlugs, loadProof } from '../lib'

interface IIndexPageProps {
  proofs: {
    slug: string, statement: string
  }[]
}

export default function IndexPage(props: IIndexPageProps) {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Environment for structured mathematical proofs" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ul>
        {props.proofs.map((p, index) => <li key={index} className="hover:text-green-600"><Link href={`/proof/${p.slug}`} ><a>{p.statement}</a></Link></li>)}
      </ul>
    </>
  )
}

export function getStaticProps() {
  return {
    props: {
      proofs: getProofSlugs().map(proof => ({
        slug: proof,
        statement: loadProof(proof).statement
      }))
    }
  }
}