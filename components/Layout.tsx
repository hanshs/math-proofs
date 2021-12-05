import React from "react";
import { signIn, signOut } from 'next-auth/react'
import useSession from "../lib/use-session";
//import { signIn, signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function Layout(props: React.PropsWithChildren<{}>) {
    const session = useSession({ required: false })
    const { asPath, pathname } = useRouter()

    const image = session.data?.user?.image
    const email = session.data?.user?.email
    const name = session.data?.user?.name

    return <>
        <div className="container max-w-4xl mx-auto flex items-end rounded mt-4 mb-4">
            {asPath !== "/" &&
            <div>
                <Link href="/">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" opacity="0.6" data-cy="back">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z" />
                    </svg>
                </Link>
            </div>
            }

            {session.status === 'unauthenticated' && <a
                href={`/api/auth/signin`}
                className="shadow ml-auto btn bg-gray-700"
                onClick={(e) => {
                    e.preventDefault()
                    signIn()
                }}
            >
                Sign in
            </a>}

            {session.status === "authenticated" && <>
                <div className="ml-auto bg-white rounded shadow-lg px-2">
                    <div className="bg-white flex items-center ">

                        {image && <div style={{ backgroundImage: `url(${image})` }} className="rounded float-left h-10 w-10 bg-white bg-cover bg-no-repeat" />}
                        <div className="p-2">
                            <small>{email || name}</small>
                            <a
                                href={`/api/auth/signout`}
                                className="block ml-auto hover:text-secondary text-yellow-800"
                                data-cy="signout"
                                onClick={(e) => {
                                    e.preventDefault()
                                    signOut()
                                }}
                            >
                                <small>Sign out</small>
                            </a>
                        </div>
                    </div>
                </div>
            </>}
        </div>
        <div className="container mx-auto py-6 max-w-4xl bg-white p-5 rounded shadow">{props.children}</div>
    </>
}