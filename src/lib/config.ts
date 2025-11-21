const envUrl = (import.meta as any)?.env?.VITE_EVENTS_URL as string | undefined
let runtimeDefault = 'https://booking-12.onrender.com'
if (typeof window !== 'undefined') {
  const host = window.location.hostname
  if (host === 'localhost' || host === '127.0.0.1') {
    runtimeDefault = 'http://localhost:3020'
  }
}
export const EVENTS_URL = envUrl || runtimeDefault
