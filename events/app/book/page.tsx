"use client"
import Navbar from '@/components/Navbar'
import BookingForm from '@/components/BookingForm'

export default function BookPage(){
  return (
    <main>
      <Navbar />
      <section className="section">
        <div className="bk-container max-w-2xl">
          <h1 className="section-title">Book Your Event</h1>
          <p className="section-sub">Share a few details and our planners will get in touch.</p>
          <div className="mt-8 rounded-xl border bg-white p-6">
            <BookingForm />
          </div>
        </div>
      </section>
    </main>
  )
}
