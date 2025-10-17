"use client"
import Navbar from "@/components/Navbar"
import Link from "next/link"

const blogPosts = [
  {
    slug: "top-5-wedding-destinations",
    title: "Top 5 Wedding Destinations in India",
    date: "October 16, 2025",
    excerpt: "From royal palaces in Rajasthan to serene backwaters in Kerala, discover the most breathtaking wedding destinations India has to offer.",
  },
  {
    slug: "corporate-event-planning-tips",
    title: "10 Tips for a Successful Corporate Event",
    date: "October 10, 2025",
    excerpt: "Planning a corporate event? Here are 10 tips to ensure your event is a resounding success, from budgeting to post-event follow-up.",
  },
  {
    slug: "planning-a-sustainable-event",
    title: "How to Plan a Sustainable and Eco-Friendly Event",
    date: "October 5, 2025",
    excerpt: "Learn how to reduce your carbon footprint and host a beautiful, sustainable event with these eco-friendly planning tips.",
  },
]

export default function BlogPage() {
  return (
    <main>
      <Navbar />
      <section className="section">
        <div className="bk-container">
          <h1 className="section-title">Our Blog</h1>
          <p className="section-sub">Event planning tips, trends, and inspiration.</p>
          <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post) => (
              <Link href={`/blog/${post.slug}`} key={post.slug}>
                <div className="rounded-2xl border bg-white p-6 transition-shadow duration-300 hover:shadow-lg">
                  <h2 className="text-xl font-semibold">{post.title}</h2>
                  <p className="mt-2 text-sm text-neutral-500">{post.date}</p>
                  <p className="mt-4 text-neutral-700">{post.excerpt}</p>
                  <div className="mt-4 font-semibold text-brand-600">Read More</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
