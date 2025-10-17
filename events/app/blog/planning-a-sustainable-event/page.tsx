"use client"
import Navbar from "@/components/Navbar"
import Link from "next/link"

export default function BlogPostPage() {
  const post = {
    title: "How to Plan a Sustainable and Eco-Friendly Event",
    date: "October 5, 2025",
    content: `
      <p>In today's world, sustainability is more important than ever. Here are some tips for planning a sustainable and eco-friendly event:</p>
      <ul class="list-disc list-inside space-y-2 mt-4">
        <li><strong>Go Paperless:</strong> Use digital invitations, registration forms, and event materials.</li>
        <li><strong>Choose a Green Venue:</strong> Select a venue that has sustainable practices in place, such as energy-efficient lighting and waste reduction programs.</li>
        <li><strong>Source Locally:</strong> Work with local vendors and suppliers to reduce transportation emissions.</li>
        <li><strong>Minimize Waste:</strong> Use compostable or reusable tableware, and provide recycling and composting bins.</li>
        <li><strong>Donate Leftovers:</strong> Arrange to donate leftover food and event materials to a local charity.</li>
        <li><strong>Offer Sustainable Transportation Options:</strong> Encourage attendees to use public transportation, carpool, or bike to the event.</li>
        <li><strong>Educate Attendees:</strong> Share information about your sustainability efforts and encourage attendees to participate.</li>
      </ul>
    `,
  }

  return (
    <main>
      <Navbar />
      <section className="section">
        <div className="bk-container max-w-3xl">
          <Link href="/blog" className="text-brand-600 font-semibold">← Back to Blog</Link>
          <h1 className="mt-4 text-4xl font-bold">{post.title}</h1>
          <p className="mt-2 text-sm text-neutral-500">{post.date}</p>
          <div className="prose lg:prose-xl mt-8" dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
      </section>
    </main>
  )
}
