import '../public/styles/global.css'
import 'katex/dist/katex.min.css'
import type { AppProps } from 'next/app'
import React from 'react'
import 'tailwindcss/tailwind.css'
import Layout from '../components/Layout'

import { SessionProvider } from "next-auth/react"

export default function ProofsApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  )
}
