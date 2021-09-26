import { Proof, Step } from '@prisma/client';
import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import { getProofSlugs, loadProof } from '../lib'
import prisma from '../lib/prisma';
interface IIndexPageProps {
  proofs: {
    slug: string, statement: string
  }[],
  prismaProofs: (Proof & {
    steps: (Step & {
      subProof: (Proof & {
        steps: Step[];
      }) | null;
    })[];
  })[]
}

export default function IndexPage(props: IIndexPageProps) {
  console.log(props.prismaProofs)
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
            <Link href={`/proof/${p.slug}`} >
              <a>{p.statement}</a>
            </Link>
          </li>
        ))}
        <pre>{JSON.stringify(props.prismaProofs, undefined, 2)}</pre>
      </ul>
    </>
  )
}

export async function getStaticProps() {
  return {
    props: {
      // nii saab proofsid yml failidest kätte
      proofs: getProofSlugs().map(proof => ({
        slug: proof,
        statement: loadProof(proof).statement
      })),
      // nii saab kõik proofsid hetkel prismast
      prismaProofs: await prisma.proof.findMany({ include: { steps: { include: { subProof: { include: { steps: true } } } } } })
    }
  }
}