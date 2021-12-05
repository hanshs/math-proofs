
import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import { useTheorems } from '../lib/data'
import Latex from 'react-latex-next'
import { useState } from 'react'
import { ITheorem } from "../lib/prisma"
import useSession from '../lib/use-session'


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

      <div className="flex justify-center">
        <input type="text" id="search-field" data-cy="search" placeholder="Enter search phrase ..." onChange={event => { setSearchPhrase(event.target.value) }} />
      </div>

      <div className="flex justify-between">
        <div>
          <h1 className="font-semibold text-2xl">Theorems</h1>
          <p className="mb-4">Here you can find the list of all theorems currently in the system.</p>
        </div>
        {session.status === 'authenticated' &&
          <Link href={'/create'}><a className="btn" data-cy="create-link">Create Theorem</a></Link>}
      </div>
      <div className="flex">
        <ol className="w-full" data-cy="main-ol">
          {theorems?.filter(searchPredicate).map((theorem, index) => (
            <li key={index} className="hover:text-green-600 text-green-800 proofListItem">
              <Link href={`/theorem/${theorem.id}`} >
                <a data-cy="theorem-title"><Latex>{theorem.claim.statement}</Latex></a>
              </Link>
            </li>
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