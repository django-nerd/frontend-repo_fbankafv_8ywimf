import { useState } from 'react'

export default function UrlForm({ onResult }) {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!url) return
    setLoading(true)
    try {
      const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
      const res = await fetch(`${baseUrl}/api/identify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      })
      if (!res.ok) {
        const d = await res.json().catch(() => ({}))
        throw new Error(d.detail || `Request failed: ${res.status}`)
      }
      const data = await res.json()
      onResult(data)
    } catch (err) {
      setError(err.message)
      onResult(null)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="flex gap-2">
        <input
          type="url"
          placeholder="Paste Instagram Reel/Post link"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="flex-1 px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-semibold"
        >
          {loading ? 'Identifying...' : 'Identify'}
        </button>
      </div>
      {error && <p className="text-red-300 text-sm">{error}</p>}
    </form>
  )
}
