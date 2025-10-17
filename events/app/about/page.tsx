import Navbar from '@/components/Navbar'

export default function AboutPage(){
  return (
    <main>
      <Navbar />
      <section className="section">
        <div className="bk-container">
          <h1 className="section-title">About Us</h1>
          <p className="section-sub">
            At <strong>Book Karo India</strong> we make travel seamless, affordable, and truly memorable. Whether it is a quick weekend escape or a long-awaited holiday, our mission is to give you the freedom to explore without the stress of planning.
          </p>
          <p className="section-sub mt-3">
            We combine smart tools, reliable services, and a traveler-first approach to ensure every journey is smooth from start to finish. With us, you don’t just visit destinations, you create experiences worth cherishing.
          </p>
          <p className="section-sub mt-3">
            So pack your bags, open your heart, and remember: life’s best stories begin when you <em>Ghoomo Khulke!</em>
          </p>
        </div>
      </section>

      <section className="section">
        <div className="bk-container">
          <h2 className="section-title">Why Choose Us</h2>
          <ul className="section-sub list-disc pl-6 space-y-2">
            <li>Nationwide coverage & unique travel options</li>
            <li>Smart planning tools tailored for Indian travelers</li>
            <li>Partnerships only with trusted platforms</li>
            <li>Friendly support that travels with you</li>
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="bk-container">
          <h2 className="section-title">Contact Us</h2>
          <div className="section-sub space-y-1">
            <p><strong>Email:</strong> bookkaroindia@gmail.com</p>
            <p><strong>Phone/WhatsApp:</strong> +91 8756456123</p>
            <p><strong>Address:</strong> Unchahar, Raebareli, Uttar Pradesh - 229404</p>
          </div>
        </div>
      </section>
    </main>
  )
}
