import type { AppProps } from 'next/app'
import 'tailwindcss/tailwind.css'

export default function ProofsApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
