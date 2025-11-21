import { useState } from 'react'

export default function FileUploader({ onResult }) {
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!file) return
    setLoading(true)
    try {
      const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
      const form = new FormData()
      form.append('file', file)
      const res = await fetch(`${baseUrl}/api/identify-file`, {
        method: 'POST',
        body: form,
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
      <div className="flex items-center gap-2">
        <input
          type="file"
          accept="audio/*,video/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="flex-1 text-white"
        />
        <button
          type="submit"
          disabled={loading || !file}
          className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-semibold"
        >
          {loading ? 'Uploading...' : 'Identify file'}
        </button>
      </div>
      {error && <p className="text-red-300 text-sm">{error}</p>}
    </form>
  )
}
