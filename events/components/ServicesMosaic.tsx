"use client"
import { motion } from "framer-motion"
import Link from "next/link"

const services = [
  { title: "Entertainment & Concerts", img: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1400&auto=format&fit=crop" },
  { title: "Birthday Party", img: "https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=1400&auto=format&fit=crop" },
  { title: "Corporate Events", img: "https://images.unsplash.com/photo-1485125639709-a60c3a500bf1?q=80&w=1400&auto=format&fit=crop" },
  { title: "Weddings & Social Events", img: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1400&auto=format&fit=crop" },
  { title: "Trade Shows & Expos", img: "https://images.unsplash.com/photo-1549499732-0918c41331e6?q=80&w=1400&auto=format&fit=crop" },
]

export default function ServicesMosaic() {
  return (
    <section className="relative bg-neutral-50">
      <div className="bk-container">
        <div className="flex items-end justify-between flex-wrap gap-4">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold">Our <span className="text-brand-600">Services</span></h2>
          <Link href="/services" className="bk-btn">Explore Our Range</Link>
        </div>
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <Link href="/book" key={s.title}>
              <motion.div
                initial={{opacity:0, y:20}}
                whileInView={{opacity:1, y:0}}
                viewport={{once:true}}
                transition={{duration:0.5, delay:i*0.05}}
                className="group relative overflow-hidden rounded-2xl shadow-sm border bg-black h-full"
              >
                <div className="absolute inset-0 bg-cover bg-center opacity-80 group-hover:opacity-90 transition" style={{backgroundImage:`url(${s.img})`}} />
                <div className="relative p-5 h-48 flex items-end">
                  <div className="text-white drop-shadow-md">
                    <div className="text-sm opacity-90">{i+1}/6</div>
                    <div className="text-xl font-semibold">{s.title}</div>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
