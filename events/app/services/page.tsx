'use client'
import Navbar from '@/components/Navbar'
import { useRouter } from 'next/navigation'

const services = [
  { title: 'Photography', desc: 'Story-driven coverage from pre-wedding to reception.' },
  { title: 'Catering', desc: 'Tailored menus featuring regional & global cuisines.' },
  { title: 'Décor', desc: 'Elegant florals, lighting, and staging in brown/white aesthetic.' },
  { title: 'Entertainment', desc: 'Live bands, DJs, and cultural performances.' },
  { title: 'Transportation', desc: 'Guest shuttles and VIP logistics.' }
]

export default function ServicesPage(){
  const router = useRouter()

  const handleClick = () => {
    router.push('/book')
  }

  return (
    <main>
      <Navbar />
      <section className="section">
        <div className="bk-container">
          <h1 className="section-title">Our Services</h1>
          <p className="section-sub">Everything you need for a seamless celebration.</p>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map(s=> (
              <div key={s.title} className="rounded-xl border bg-white p-6 shadow-sm h-full cursor-pointer" onClick={handleClick}>
                <div className="text-4xl">✨</div>
                <h3 className="mt-3 text-lg font-semibold">{s.title}</h3>
                <p className="mt-1 text-sm text-neutral-600">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
