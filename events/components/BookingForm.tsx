"use client"
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { postJSON } from '@/lib/api'

export default function BookingForm(){
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loadingMessage, setLoadingMessage] = useState('Submitting...')

  async function onSubmit(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault()
    const form = e.currentTarget
    setLoading(true)
    setError(null)
    setLoadingMessage('Submitting...')
    const data = Object.fromEntries(new FormData(form).entries())
    
    // Show extended message after 5 seconds
    const messageTimer = setTimeout(() => {
      setLoadingMessage('Server is waking up, please wait...')
    }, 5000)
    
    try{
      const res = await postJSON<{success: boolean, id: string}>('/api/bookings', data)
      clearTimeout(messageTimer)
      if(res.success) {
        // Redirect to thank you page
        router.push('/thank-you')
      }
    }catch(err:any){ 
      clearTimeout(messageTimer)
      console.error('Booking error:', err)
      setError(err.message || 'Unable to submit booking. Please check your connection and try again.')
      setLoading(false)
    }
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
      <button disabled={loading} className="bk-btn px-4 py-2 text-sm w-auto max-w-xs">{loading? loadingMessage : 'Submit Booking'}</button>
      {loading && <p className="text-blue-600 text-sm">⏳ First request may take 30-60 seconds as the server wakes up...</p>}
      {error && <p className="text-red-600 text-sm">{error}</p>}
    </form>
  )
}
