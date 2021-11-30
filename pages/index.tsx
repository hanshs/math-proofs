
import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import { useTheorems } from '../lib/data'
import { useSession } from 'next-auth/react'
import Latex from 'react-latex-next'
import { useState } from 'react'


export default function IndexPage() {
  const theorems = useTheorems()
  const session = useSession({ required: false })
  const [searchPhrase, setSearchPhrase] = useState("");


  return (
    <>
      <Head>
        <title>Mathematical theorems</title>
        <meta name="description" content="Environment for structured mathematical proofs" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex justify-center">
        <input type="text" id="search-field" placeholder="Enter search phrase ..." onChange={event => { setSearchPhrase(event.target.value) }} />
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
          {theorems?.filter((theorem) => {
            if (searchPhrase == "") {
              return theorem;
            } else if (theorem.claim.statement.toLowerCase().includes(searchPhrase.toLowerCase())) {
              return theorem;
            } else {
              let steps = theorem.proof.filter((step) => {
                if (step.claim.statement.toLowerCase().includes(searchPhrase.toLowerCase())) {
                  return step;
                }
              });
              if (steps.length > 0) {
                return theorem;
              }
            }
          }).map((theorem, index) => (
            <li key={index} className="hover:text-green-600 text-green-800 proofListItem">
              <Link href={`/theorem/${theorem.id}`} >
                <a><Latex>{theorem.claim.statement}</Latex></a>
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