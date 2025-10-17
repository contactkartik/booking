"use client"
import Navbar from "@/components/Navbar"
import Link from "next/link"

export default function BlogPostPage() {
  const post = {
    title: "10 Tips for a Successful Corporate Event",
    date: "October 10, 2025",
    content: `
      <p>Planning a corporate event can be a daunting task, but with the right approach, it can be a huge success. Here are 10 tips to help you plan a memorable corporate event:</p>
      <ol class="list-decimal list-inside space-y-2 mt-4">
        <li><strong>Define the Purpose:</strong> Clearly define the goals and objectives of the event.</li>
        <li><strong>Set a Budget:</strong> Establish a realistic budget and stick to it.</li>
        <li><strong>Choose the Right Venue:</strong> Select a venue that aligns with your event's theme and capacity requirements.</li>
        <li><strong>Plan the Agenda:</strong> Create a detailed agenda with engaging content and activities.</li>
        <li><strong>Arrange for Speakers:</strong> Invite industry experts or keynote speakers to add value to your event.</li>
        <li><strong>Incorporate Technology:</strong> Use event management software and other technologies to streamline the planning process.</li>
        <li><strong>Focus on Attendee Experience:</strong> From registration to post-event follow-up, prioritize the attendee experience.</li>
        <li><strong>Promote the Event:</strong> Use a multi-channel marketing strategy to promote your event and drive registrations.</li>
        <li><strong>Manage Logistics:</strong> Pay close attention to logistics, including catering, transportation, and accommodation.</li>
        <li><strong>Gather Feedback:</strong> Collect feedback from attendees to measure the success of your event and identify areas for improvement.</li>
      </ol>
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
