
import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import { useTheorems } from '../lib/data'


export default function IndexPage() {
  const theorems = useTheorems()
  console.log({ theorems })
  return (
    <>
      <Head>
        <title>Mathematical theorems</title>
        <meta name="description" content="Environment for structured mathematical proofs" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex justify-between">
        <div>
          <h1 className="font-semibold text-2xl">Theorems</h1>
          <p className="mb-4">Here you can find the list of all theorems currently in the system.</p>
        </div>
        <Link href={'/create'}><a className="btn">Create Theorem</a></Link>
      </div>
      <div className="flex">
        <ol className="w-full">
          {theorems?.map((theorem, index) => (
            <li key={index} className="hover:text-green-600 text-green-800 proofListItem">
              <Link href={`/theorem/${theorem.id}`} >
                <a>{theorem.claim.statement}</a>
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