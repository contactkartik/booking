"use client"
import { motion } from "framer-motion"
import Link from "next/link"

const works = [
  {
    title: "Supporting Women's Voice for International Women's Day",
    blurb:
      "A multi‑venue celebration featuring speakers, performances, and brand partners.",
    cta: "Read Story",
    color: "#e8f7e9",
  },
  {
    title: "Advancing Gender Equality in Education",
    blurb:
      "Impact‑driven conference series with NGOs and educators across regions.",
    cta: "Read Story",
    color: "#e8ecff",
  },
]

const logos = ["https://dummyimage.com/120x40/000/fff&text=Logo", "https://dummyimage.com/120x40/000/fff&text=Logo", "https://dummyimage.com/120x40/000/fff&text=Logo"]

export default function RecentWorks() {
  return (
    <section className="relative">
      <div className="bk-container grid lg:grid-cols-[1.1fr_0.9fr] gap-8 lg:gap-10">
        <div>
          <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-neutral-900">
            <span className="block">Recent</span>
            <span className="block text-brand-600">Works</span>
          </div>
          <div className="mt-8 grid gap-6">
            {works.map((w, i) => (
              <motion.div
                key={w.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="rounded-2xl border overflow-hidden"
                style={{ background: w.color }}
              >
                <div className="p-6">
                  <h3 className="text-xl font-semibold">{w.title}</h3>
                  <p className="mt-2 text-neutral-700 text-xs sm:text-sm md:text-base">{w.blurb}</p>
                  <div className="mt-4">
                    <Link href="#" className="bk-link">{w.cta}</Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        <aside className="space-y-6">
          <div className="rounded-2xl bg-neutral-900 text-white p-6">
            <div className="flex items-center gap-4">
              <img src="https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=400&auto=format&fit=crop" alt="Client" className="w-16 h-16 rounded-full object-cover" />
              <div>
                <div className="font-semibold">Happy Client</div>
                <div className="text-sm text-white/70">CEO, Leading Tech Solutions</div>
              </div>
            </div>
            <p className="mt-4 text-sm text-white/80">
              “The team made our corporate gala seamless. Attention to detail and flawless execution exceeded our expectations.”
            </p>
          </div>
          <div className="rounded-2xl border p-6 bg-white">
            <div className="text-sm font-medium text-neutral-500">Trusted by</div>
            <div className="mt-4 grid grid-cols-3 gap-4 items-center opacity-80">
              {logos.map((src, i) => (
                <img key={i} src={src} alt="Partner logo" className="h-8 object-contain" />
              ))}
            </div>
          </div>
        </aside>
      </div>
    </section>
  )
}
