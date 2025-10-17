"use client"
import { useState } from 'react'
import { postJSON } from '@/lib/api'

export default function BookingForm(){
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault()
    const form = e.currentTarget
    setLoading(true); setError(null); setSuccess(null)
    const data = Object.fromEntries(new FormData(form).entries())
    try{
      const res = await postJSON<{success: boolean, id: string}>('/api/bookings', data)
      if(res.success) setSuccess('Thanks! We will contact you shortly.')
      form.reset()
    }catch(err:any){ setError(err.message || 'Something went wrong') }
    finally{ setLoading(false) }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <div className="grid gap-2 sm:grid-cols-2">
        <input name="name" required placeholder="Your Name" className="border rounded-md px-3 py-2"/>
        <input name="email" type="email" required placeholder="Email" className="border rounded-md px-3 py-2"/>
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        <input name="phone" required placeholder="Phone" className="border rounded-md px-3 py-2"/>
        <input name="date" type="date" required className="border rounded-md px-3 py-2"/>
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        <select name="package" className="border rounded-md px-3 py-2">
          <option>Silver</option>
          <option>Gold</option>
          <option>Platinum</option>
        </select>
        <input name="message" placeholder="Message (optional)" className="border rounded-md px-3 py-2"/>
      </div>
      <button disabled={loading} className="bk-btn">{loading? 'Submitting...' : 'Submit Booking'}</button>
      {success && <p className="text-green-600 text-sm">{success}</p>}
      {error && <p className="text-red-600 text-sm">{error}</p>}
    </form>
  )
}
