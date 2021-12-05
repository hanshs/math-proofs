
import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import { useTheorems } from '../lib/data'
import { useSession } from 'next-auth/react'
import Latex from 'react-latex-next'
import { useState } from 'react'
import { ITheorem } from "../lib/prisma"


export default function IndexPage() {
  const theorems = useTheorems()
  const session = useSession({ required: false })
  const [searchPhrase, setSearchPhrase] = useState("");
  const searchPredicate = (theorem: ITheorem) => {
    if (searchPhrase.length == 0) {
      return true;
    }

    const matchesClaim = theorem.claim.statement.toLowerCase().includes(searchPhrase.toLowerCase());
    const matchesStepClaim = theorem.proof.some(step => step.claim.statement.toLowerCase().includes(searchPhrase.toLowerCase()));

    return matchesClaim || matchesStepClaim;
  }

  return (
    <>
      <Head>
        <title>Mathematical theorems</title>
        <meta name="description" content="Environment for structured mathematical proofs" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex justify-end mb-2">
        <input type="text" id="search-field" placeholder="Enter search phrase..." onChange={event => { setSearchPhrase(event.target.value) }} />
      </div>

      <div className="flex justify-between">
        <div>
          <h1 className="font-semibold text-2xl">Theorems</h1>
          <p className="mb-4">Here you can find the list of all theorems currently in the system.</p>
        </div>
        {session.status === 'authenticated' &&
          <Link href={'/create'}><a className="btn">Create Theorem</a></Link>}
      </div>
      <div className="flex">
        <ol className="w-full">
          {theorems?.filter(searchPredicate).map((theorem, index) => (
              <Link key={index} href={`/theorem/${theorem.id}`}>
                <li className="hover:text-green-600 text-green-800 proofListItem cursor-pointer">
                    <a><Latex>{theorem.claim.statement}</Latex></a>
                </li>
              </Link>
          ))}
        </ol>
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