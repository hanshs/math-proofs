import '../public/styles/global.css'
import type { AppProps } from 'next/app'
import React from 'react'
import 'tailwindcss/tailwind.css'
import Layout from '../components/Layout'

export default function ProofsApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}
