"use client"
import Navbar from '@/components/Navbar'
import { useState } from 'react'
import { postJSON } from '@/lib/api'

export default function ContactPage(){
  const mainUrl = (process.env.NEXT_PUBLIC_MAIN_URL || 'https://bookkaroindia.com').replace(/\/$/, '')
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState<string | null>(null)
  const [err, setErr] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault(); setLoading(true); setMsg(null); setErr(null)
    const data = Object.fromEntries(new FormData(e.currentTarget).entries())
    try{
      await postJSON('/api/contact', data)
      setMsg('Thanks! We will get back to you shortly.')
      ;(e.currentTarget as HTMLFormElement).reset()
    }catch(e:any){ setErr(e.message || 'Something went wrong') }
    finally{ setLoading(false) }
  }

  return (
    <main>
      <Navbar />
      <section className="section">
        <div className="bk-container grid lg:grid-cols-2 gap-10">
          <div>
            <h1 className="section-title">Contact Us</h1>
            <p className="section-sub">Phone: +91 8756456123 · Email: hello@bookkaroindia.com · Address: Pan-India</p>
            <p className="mt-6 text-sm text-neutral-600">Back to <a className="bk-link" href={mainUrl}>BookKaroIndia.com</a></p>
          </div>
          <div className="rounded-xl border bg-white p-6">
            <form onSubmit={onSubmit} className="grid gap-4">
              <input name="name" required placeholder="Your Name" className="border rounded-md px-3 py-2"/>
              <input name="email" type="email" required placeholder="Email" className="border rounded-md px-3 py-2"/>
              <input name="phone" required placeholder="Phone" className="border rounded-md px-3 py-2"/>
              <textarea name="message" required placeholder="Message" className="border rounded-md px-3 py-2 min-h-[120px]"/>
              <button disabled={loading} className="bk-btn">{loading? 'Sending...' : 'Send Message'}</button>
              {msg && <p className="text-green-600 text-sm">{msg}</p>}
              {err && <p className="text-red-600 text-sm">{err}</p>}
            </form>
          </div>
        </div>
      </section>
    </main>
  )
}
