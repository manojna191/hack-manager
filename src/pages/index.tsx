import { Geist, Geist_Mono } from 'next/font/google'
import Link from 'next/link'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export default function Home() {
  return (
    <div>
      <h1>Hack Manager</h1>
      <h4>Hack you way around</h4>
      <Link href="/register">Register</Link>
    </div>
  )
}
