import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import prisma, { IProof } from '../lib/prisma';
interface IIndexPageProps {
  proofs: IProof[]
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
        {props.proofs.map((p, index) => (
          <li key={index} className="hover:text-green-600">
            <Link href={`/proof/${p.id}`} >
              <a>{p.description}</a>
            </Link>
          </li>
        ))}
        {/* <pre>{JSON.stringify(props.proofs, undefined, 2)}</pre> */}
      </ul>
    </>
  )
}

export async function getStaticProps() {
  return {
    props: {
      proofs: await prisma.proof.findMany({ include: { steps: { include: { subProof: { include: { steps: true } } } } } })
    }
  }
}