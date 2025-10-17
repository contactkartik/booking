"use client"
import Link from 'next/link'
import Hero from '../components/Hero'
import WhoWeAre from '../components/WhoWeAre'
import RecentWorks from '../components/RecentWorks'
import ServicesMosaic from '../components/ServicesMosaic'
import ServicesDropdown from '../components/ServicesDropdown'

export default function HomePage() {
  const mainUrl = (process.env.NEXT_PUBLIC_MAIN_URL || 'http://localhost:8080').replace(/\/$/, '')
  return (
    <main>
      <header className="sticky top-0 z-40 bg-white/70 backdrop-blur border-b">
        <div className="bk-container flex items-center justify-between py-3">
          <Link href="/" className="text-xl font-bold" aria-label="Book Karo India – Event Planner">Book Karo India</Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/about">About</Link>
            <ServicesDropdown />
            <Link href="/packages">Packages</Link>
            <Link href="/gallery">Gallery</Link>
            <Link href="/contact">Contact</Link>
            <Link className="bk-btn" href="/book">Get In Touch</Link>
          </nav>
          <div className="md:hidden">
            <Link className="bk-btn" href="/book">Get In Touch</Link>
          </div>
        </div>
      </header>

      <Hero />
      <WhoWeAre />
      <RecentWorks />
      <ServicesMosaic />

      <footer className="border-t">
        <div className="bk-container py-8 flex items-center justify-between">
          <p className="text-sm text-neutral-600">© {new Date().getFullYear()} Book Karo India</p>
          <a href={`${mainUrl}`} target="_blank" rel="noopener noreferrer" className="bk-link">Back to BookKaroIndia</a>
        </div>
      </footer>
    </main>
  )
}
