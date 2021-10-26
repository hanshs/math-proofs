import React from "react";
import { signIn, signOut, useSession } from 'next-auth/react'

export default function Layout(props: React.PropsWithChildren<{}>) {
    const session = useSession({ required: false })

    const image = session.data?.user?.image
    const email = session.data?.user?.email
    const name = session.data?.user?.name

    return <>
        <div className="container max-w-4xl mx-auto flex items-end rounded mt-4 mb-4">
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