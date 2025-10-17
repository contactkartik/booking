"use client"
import Navbar from '@/components/Navbar'
import { useEffect, useState } from 'react'
import { getJSON } from '@/lib/api'

type Booking = { _id:string; name:string; email:string; phone:string; date:string; package:string; message?:string; createdAt:string }

export default function AdminPage(){
  const [password, setPassword] = useState('')
  const [bookings, setBookings] = useState<Booking[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function load(){
    setError(null)
    try{
      const data = await getJSON<Booking[]>('/api/bookings', password)
      setBookings(data)
    }catch(e:any){ setError(e.message || 'Failed to fetch') }
  }

  useEffect(()=>{ /* no auto-load */ }, [])

  return (
    <main>
      <Navbar />
      <section className="section">
        <div className="bk-container">
          <h1 className="section-title">Admin – Bookings</h1>
          <div className="mt-6 flex gap-3">
            <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Admin password" className="border rounded-md px-3 py-2"/>
            <button className="bk-btn" onClick={load}>Load</button>
          </div>
          {error && <p className="mt-4 text-red-600 text-sm">{error}</p>}
          <div className="mt-8 grid gap-4">
            {bookings?.map(b=> (
              <div key={b._id} className="rounded-xl border bg-white p-4">
                <div className="font-semibold">{b.name} · {b.phone} · {b.email}</div>
                <div className="text-sm text-neutral-600">Date: {b.date} · Package: {b.package}</div>
                {b.message && <p className="mt-2 text-sm">{b.message}</p>}
              </div>
            ))}
            {bookings && bookings.length===0 && (<p className="text-sm text-neutral-600">No bookings yet.</p>)}
          </div>
        </div>
      </section>
    </main>
  )
}
