'use client'
import { useState } from 'react'

export default function TestBackendPage() {
  const [status, setStatus] = useState<string>('Not tested yet')
  const [loading, setLoading] = useState(false)
  const [details, setDetails] = useState<any>(null)

  async function testBackend() {
    setLoading(true)
    setStatus('Testing... (this may take 30-60 seconds)')
    const startTime = Date.now()
    
    try {
      const response = await fetch('https://booking-5-jtsr.onrender.com/api/health', {
        cache: 'no-store'
      })
      const data = await response.json()
      const duration = ((Date.now() - startTime) / 1000).toFixed(1)
      
      setStatus(`✅ Backend is working! (took ${duration}s)`)
      setDetails(data)
    } catch (err: any) {
      const duration = ((Date.now() - startTime) / 1000).toFixed(1)
      setStatus(`❌ Backend failed after ${duration}s: ${err.message}`)
      setDetails(null)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold mb-4">Backend Status Test</h1>
        
        <button 
          onClick={testBackend}
          disabled={loading}
          className="bk-btn w-full mb-4"
        >
          {loading ? 'Testing...' : 'Test Backend Connection'}
        </button>
        
        <div className="bg-gray-100 rounded p-4 mb-4">
          <p className="font-semibold mb-2">Status:</p>
          <p className={`text-sm ${status.includes('✅') ? 'text-green-600' : status.includes('❌') ? 'text-red-600' : 'text-gray-600'}`}>
            {status}
          </p>
        </div>
        
        {details && (
          <div className="bg-blue-50 rounded p-4">
            <p className="font-semibold mb-2">Response:</p>
            <pre className="text-xs overflow-auto">{JSON.stringify(details, null, 2)}</pre>
          </div>
        )}
        
        <div className="mt-6 text-sm text-gray-600">
          <p className="font-semibold mb-2">What this tests:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Backend server is running</li>
            <li>MongoDB connection status</li>
            <li>Response time (cold start vs warm)</li>
          </ul>
          
          <p className="mt-4 font-semibold">Expected Results:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>First test:</strong> 30-60 seconds (cold start)</li>
            <li><strong>Second test:</strong> 1-2 seconds (warm)</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
