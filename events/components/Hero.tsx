"use client"
import { motion } from "framer-motion"
import Link from "next/link"

export default function Hero() {
  return (
    <section className="relative min-h-[70vh] sm:min-h-[80vh] lg:min-h-[90vh] flex items-center overflow-hidden">
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=1600&auto=format&fit=crop)",
        }}
        aria-hidden
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

      <div className="bk-container grid lg:grid-cols-[1.1fr_0.9fr] gap-6 sm:gap-8 lg:gap-10 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-brand-300"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
            <span className="text-brand-300 italic">Stress‑Free</span> Event
            <br /> Planning, Flawlessly
            <br /> Executed!
          </h1>
          <p className="mt-3 sm:mt-4 max-w-2xl text-sm sm:text-base">
            From concept to celebration, we handle every detail so you can enjoy
            what truly matters.
          </p>
          <div className="mt-6 sm:mt-8 flex flex-wrap gap-3">
            <Link href="/book" className="bk-btn bg-brand-400 hover:bg-brand-500">
              Book Your Event Now
            </Link>
            <Link href="/about" className="px-5 py-2.5 rounded-md border border-brand-300 text-brand-300 bg-brand-50/10 hover:bg-brand-50/20">
              About Us
            </Link>
          </div>
        </motion.div>

        <motion.aside
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="hidden lg:block bg-white/90 backdrop-blur rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="aspect-[16/9] w-full bg-cover bg-center" style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=1200&auto=format&fit=crop)",
          }} />
          <div className="p-5">
            <h3 className="text-lg font-semibold">Top Event Planner in India</h3>
            <p className="mt-1 text-sm text-neutral-600">
              Planning an event should not feel overwhelming. Let our team handle
              every detail while you enjoy the experience.
            </p>
          </div>
        </motion.aside>
      </div>
    </section>
  )
}
