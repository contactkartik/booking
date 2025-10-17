import Navbar from '@/components/Navbar'

const testimonials = [
  { name: 'Rhea & Arjun', text: 'We trusted them with our dream destination wedding — beyond expectations!', stars: 5 },
  { name: 'Kavya & Sameer', text: 'Professional yet warm. They made us feel like family.', stars: 4 },
  { name: 'Aarav & Myra', text: 'The best event planners in the business. Our corporate event was a huge success.', stars: 5 },
  { name: 'Priya & Rohan', text: 'They took care of everything, from the smallest details to the biggest moments. We couldn\'t have asked for more.', stars: 5 },
  { name: 'Sanya & Vikram', text: 'Our baby shower was beautiful and stress-free, all thanks to the team at Book Karo India.', stars: 5 },
  { name: 'Neha & Ishaan', text: 'The team was incredibly creative and resourceful. They brought our vision to life, and then some!', stars: 4 }
]

export default function TestimonialsPage(){
  return (
    <main>
      <Navbar />
      <section className="section">
        <div className="bk-container">
          <h1 className="section-title">Client Testimonials</h1>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {testimonials.map(t => (
              <div key={t.name} className="rounded-2xl border bg-white p-6">
                <div className="font-semibold">{t.name}</div>
                <p className="mt-2 text-neutral-700">“{t.text}”</p>
                <div className="mt-3 text-brand-600" aria-label={`${t.stars} stars`}>
                  {'★★★★★☆☆☆☆☆'.slice(5 - t.stars, 10 - t.stars)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
