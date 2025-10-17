import Navbar from '@/components/Navbar'
import Lightbox from '@/components/Lightbox'

const IMAGES = [
  // Local uploads in events/public/gallery/ with captions
  { src: '/gallery/WhatsApp Image 2025-10-12 at 18.37.30_248a794d.jpg', caption: 'Floral Ring Stage — Location: TBD' },
  { src: '/gallery/WhatsApp Image 2025-10-12 at 18.37.31_72cd4e69.jpg', caption: 'Grand Backdrop with Chandeliers — Location: TBD' },
  { src: '/gallery/WhatsApp Image 2025-10-12 at 18.37.31_f5ebefdf.jpg', caption: 'Pastel Floral Arch — Location: TBD' },
  { src: '/gallery/WhatsApp Image 2025-10-12 at 18.37.32_59f77bab.jpg', caption: 'Royal Sofa Setup — Location: TBD' },
  // Fallback/extra images
  'https://images.unsplash.com/photo-1521335629791-ce4aec67dd53?q=80&w=1400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=1400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=1400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=1400&auto=format&fit=crop'
]

export default function GalleryPage(){
  return (
    <main>
      <Navbar />
      <section className="section">
        <div className="bk-container">
          <h1 className="section-title">Gallery of Our Wedding Activities</h1>
          <p className="section-sub">A glimpse of moments we were honored to craft.</p>
          <div className="mt-8">
            <Lightbox images={IMAGES} />
          </div>
        </div>
      </section>
    </main>
  )
}
