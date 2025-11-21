// Events service URL configuration
// Set VITE_EVENTS_URL in your deployment platform (Vercel/Netlify)
// Fallback is used for production if env var is not set
const envUrl = (import.meta as any)?.env?.VITE_EVENTS_URL as string | undefined

let runtimeDefault = 'https://booking-12.onrender.com' // Production events service

// Local development override
if (typeof window !== 'undefined') {
  const host = window.location.hostname
  if (host === 'localhost' || host === '127.0.0.1') {
    runtimeDefault = 'http://localhost:3020'
  }
}

export const EVENTS_URL = envUrl || runtimeDefault

// Development warning if using fallback in production
if (import.meta.env.PROD && !envUrl) {
  console.warn('⚠️ VITE_EVENTS_URL not set, using fallback:', runtimeDefault)
}
