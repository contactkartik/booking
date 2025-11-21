import Navbar from '@/components/Navbar'
import { getJSON } from '@/lib/api'
import Link from 'next/link'

type Pkg = { _id: string; name: string; price: number; currency?: string; features?: string[] }

export default async function PackagesPage(){
  let packages: Pkg[] = []
  try{ packages = await getJSON<Pkg[]>('/api/packages') }catch{ /* ignore for first load */ }
  return (
    <main>
      <Navbar />
      <section className="section">
        <div className="bk-container">
          <h1 className="section-title">Packages</h1>
          <p className="section-sub">Transparent pricing tailored to your celebration.</p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {(packages.length ? packages : [
              { _id:'silver', name:'Silver', price: 49999, currency:'INR', features:['Planning','Décor basics','Photo team'] },
              { _id:'gold', name:'Gold', price: 99999, currency:'INR', features:['End-to-end planning','Premium décor','Photo + Video'] },
              { _id:'platinum', name:'Platinum', price: 199999, currency:'INR', features:['Full service','Luxury décor','Cinematic coverage'] }
            ]).map(p=> (
              <div key={p._id} className="rounded-2xl border bg-white p-6 shadow-sm flex flex-col">
                <h3 className="text-xl font-semibold">{p.name}</h3>
                <div className="mt-2 text-3xl font-extrabold">{p.currency || 'INR'} {p.price.toLocaleString()}</div>
                <ul className="mt-4 space-y-2 text-sm text-neutral-700 list-disc pl-5">
                  {(p.features||[]).map(f=> <li key={f}>{f}</li>)}
                </ul>
                <Link href="/book" className="bk-btn mt-6">Choose {p.name}</Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
