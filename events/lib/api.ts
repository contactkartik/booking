export const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8080'

export async function postJSON<T>(path: string, data: any) : Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data), cache: 'no-store' })
  if(!res.ok) throw new Error(await res.text())
  return res.json()
}

export async function getJSON<T>(path: string, adminPassword?: string): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, { headers: adminPassword ? { 'x-admin-password': adminPassword } : undefined, cache: 'no-store' })
  if(!res.ok) throw new Error(await res.text())
  return res.json()
}
