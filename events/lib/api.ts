export const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8080'

export async function postJSON<T>(path: string, data: any) : Promise<T> {
  try {
    // Increase timeout for Render free tier cold starts (can take 30-60 seconds)
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 90000) // 90 second timeout
    
    const res = await fetch(`${API_BASE}${path}`, { 
      method: 'POST', 
      headers: { 'Content-Type': 'application/json' }, 
      body: JSON.stringify(data), 
      cache: 'no-store',
      signal: controller.signal
    })
    
    clearTimeout(timeoutId)
    
    if(!res.ok) {
      const errorText = await res.text()
      throw new Error(errorText || `Server error: ${res.status}`)
    }
    
    return res.json()
  } catch (err: any) {
    // Handle network errors
    if (err.name === 'AbortError') {
      throw new Error('Server is taking too long to respond. The service may be starting up. Please try again in a moment.')
    }
    if (err.message === 'Failed to fetch' || err.name === 'TypeError') {
      throw new Error('Unable to connect to server. The service may be waking up (this can take 30-60 seconds on first request). Please try again.')
    }
    throw err
  }
}

export async function getJSON<T>(path: string, adminPassword?: string): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, { headers: adminPassword ? { 'x-admin-password': adminPassword } : undefined, cache: 'no-store' })
  if(!res.ok) throw new Error(await res.text())
  return res.json()
}
