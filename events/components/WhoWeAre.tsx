"use client"
import { motion } from "framer-motion"
import Link from "next/link"

const features = [
  {
    title: "Industry‑Leading Partners",
    desc: "Best vendors across décor, cuisine, and entertainment.",
    img: "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=1400&auto=format&fit=crop",
  },
  {
    title: "Creative & Customized",
    desc: "Tailored concepts that reflect your style and story.",
    img: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Flawless Execution",
    desc: "Our team ensures timing, flow, and polish on the day.",
    img: "https://images.unsplash.com/photo-1521334884684-d80222895322?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Uncompromising Quality",
    desc: "Attention to detail from invites to after‑movie.",
    img: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1200&auto=format&fit=crop",
  },
]

export default function WhoWeAre() {
  return (
    <section className="relative bg-brand-50/40">
      <div className="bk-container grid lg:grid-cols-[0.6fr_1.4fr] gap-8 lg:gap-10 items-start">
        <motion.div initial={{opacity:0, y:20}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{duration:0.6}}>
          <div className="text-brand-400 font-black text-5xl sm:text-6xl md:text-7xl lg:text-[96px] leading-none select-none">
            Who
            <span className="block -mt-2">Are We?</span>
          </div>
          <p className="mt-4 sm:mt-6 text-sm sm:text-base text-neutral-700 max-w-md">
            We design and deliver stress‑free, unforgettable events. From intimate
            gatherings to large celebrations, we go beyond the brief for seamless
            execution.
          </p>
          <div className="mt-4 sm:mt-6">
            <Link href="/about" className="bk-btn">More About Us</Link>
          </div>
        </motion.div>
        <div className="grid sm:grid-cols-2 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{opacity:0, y:15}}
              whileInView={{opacity:1, y:0}}
              viewport={{once:true}}
              transition={{duration:0.5, delay:i*0.05}}
              className="rounded-2xl overflow-hidden border bg-white shadow-sm"
            >
              <div className="aspect-[4/3] bg-cover bg-center" style={{backgroundImage:`url(${f.img})`}} />
              <div className="p-5">
                <h3 className="font-semibold">{f.title}</h3>
                <p className="mt-1 text-sm text-neutral-600">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
