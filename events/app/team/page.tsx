import Navbar from '@/components/Navbar'

const team = [
  { name: 'Rithik Kumar', role: 'Founder & Lead Planner' },
  { name: 'Kishan Sirvastava', role: 'Founder & Creative Head' },
  { name: 'Gyani', role: 'Client & Vendor Manager' },
  { name: 'Anjali', role: 'Ops & Logistics Manager' }
]

export default function TeamPage(){
  return (
    <main>
      <Navbar />
      <section className="section">
        <div className="bk-container">
          <h1 className="section-title">Our Wedding Organizer Team</h1>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.map(m => (
              <div key={m.name} className="rounded-2xl border bg-white p-6 text-center">
                <div className="mx-auto h-28 w-28 rounded-full bg-neutral-100" aria-hidden />
                <h3 className="mt-4 font-semibold">{m.name}</h3>
                <p className="text-sm text-neutral-600">{m.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
