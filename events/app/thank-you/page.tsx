import Link from 'next/link'

export default function ThankYouPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-50 to-white px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-6">
          <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
            <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
        
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Thank You!</h1>
        <p className="text-lg text-gray-600 mb-2">Your booking has been received successfully.</p>
        <p className="text-gray-600 mb-8">We will contact you shortly to confirm your event details.</p>
        
        <div className="space-y-3">
          <Link href="/" className="bk-btn block">
            Back to Home
          </Link>
          <Link href="/packages" className="block px-5 py-2.5 rounded-md border border-brand-500 text-brand-600 hover:bg-brand-50">
            View Our Packages
          </Link>
        </div>
      </div>
    </div>
  )
}
