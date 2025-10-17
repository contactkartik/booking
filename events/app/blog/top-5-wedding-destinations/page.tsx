"use client"
import Navbar from "@/components/Navbar"
import Link from "next/link"

export default function BlogPostPage() {
  // In a real app, you would fetch the blog post content based on the slug
  const post = {
    title: "Top 5 Wedding Destinations in India",
    date: "October 16, 2025",
    content: `
      <p>India, with its rich culture and diverse landscapes, offers a plethora of stunning wedding destinations. Here are our top 5 picks for a truly unforgettable wedding:</p>
      <h3 class="text-2xl font-semibold mt-6 mb-2">1. Udaipur, Rajasthan</h3>
      <p>Known as the 'City of Lakes', Udaipur offers a magical setting with its majestic palaces and shimmering lakes. A wedding here feels nothing short of a royal fairytale.</p>
      <h3 class="text-2xl font-semibold mt-6 mb-2">2. Goa</h3>
      <p>For a more relaxed and bohemian vibe, Goa's sandy beaches and beautiful resorts are the perfect backdrop for a destination wedding. Exchange your vows with the sound of the waves in the background.</p>
      <h3 class="text-2xl font-semibold mt-6 mb-2">3. Kerala</h3>
      <p>The serene backwaters of Kerala, with its lush greenery and tranquil atmosphere, provide a unique and picturesque setting for a wedding. A houseboat wedding here is an experience like no other.</p>
      <h3 class="text-2xl font-semibold mt-6 mb-2">4. Jaipur, Rajasthan</h3>
      <p>The 'Pink City' of Jaipur is another royal destination that offers a blend of history, culture, and grandeur. A palace wedding in Jaipur is a truly regal affair.</p>
      <h3 class="text-2xl font-semibold mt-6 mb-2">5. Andaman and Nicobar Islands</h3>
      <p>For a truly exotic and secluded wedding, the pristine beaches and turquoise waters of the Andaman and Nicobar Islands are an ideal choice. It's the perfect destination for a private and intimate celebration.</p>
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
