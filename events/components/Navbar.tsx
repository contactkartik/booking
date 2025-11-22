"use client"
import Link from 'next/link'
import { useState } from 'react'

export default function Navbar(){
  const [open, setOpen] = useState(false)
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b shadow-sm">
      <div className="bk-container py-3 flex items-center justify-between">
        <Link href="/" className="text-lg sm:text-xl font-bold" aria-label="Book Karo India – Event Planner">Book Karo India</Link>
        <nav className="hidden md:flex items-center gap-4 lg:gap-6 text-sm">
          <Link href="/about">About</Link>
          <Link href="/services">Services</Link>
          <Link href="/packages">Packages</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/team">Team</Link>
          <Link href="/testimonials">Testimonials</Link>
          <Link href="/gallery">Gallery</Link>
          <Link href="/contact">Contact</Link>
          <Link className="bk-btn" href="/book">Book Now</Link>
        </nav>
        <button aria-label="Toggle menu" className="md:hidden p-2 text-2xl hover:bg-neutral-100 rounded" onClick={()=>setOpen(!open)}>☰</button>
      </div>
      {open && (
        <div className="md:hidden border-t bg-white shadow-lg">
          <div className="bk-container py-4 grid gap-3">
            {['about','services','packages','blog','team','testimonials','gallery','contact'].map(p=> (
              <Link key={p} href={`/${p}`} onClick={()=>setOpen(false)} className="py-1">{p[0].toUpperCase()+p.slice(1)}</Link>
            ))}
            <Link href="/book" onClick={()=>setOpen(false)} className="bk-btn w-full text-center">Book Now</Link>
          </div>
        </div>
      )}
    </header>
  )
}
