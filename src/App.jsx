import { useState } from 'react'
import UrlForm from './components/UrlForm'
import FileUploader from './components/FileUploader'
import ResultCard from './components/ResultCard'

function App() {
  const [result, setResult] = useState(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.06),transparent_55%)]"></div>

      <header className="relative z-10 pt-12 text-center">
        <div className="inline-flex items-center justify-center mb-4">
          <img src="/flame-icon.svg" alt="Flames" className="w-16 h-16 drop-shadow-[0_0_20px_rgba(59,130,246,0.5)]" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight">Find the song from any Instagram link</h1>
        <p className="text-blue-200/80 mt-2">Paste a Reel/Post URL or upload a short clip. We’ll identify the track and artist.</p>
      </header>

      <main className="relative z-10 max-w-2xl mx-auto p-6">
        <div className="mt-8 bg-slate-800/50 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-6 shadow-xl">
          <h2 className="text-xl font-semibold mb-3">Paste Instagram link</h2>
          <UrlForm onResult={setResult} />

          <div className="my-6 h-px bg-white/10" />

          <h2 className="text-xl font-semibold mb-3">Or upload a clip</h2>
          <p className="text-sm text-white/60 mb-2">Best results with 5–15 seconds where the music is clear.</p>
          <FileUploader onResult={setResult} />

          <ResultCard result={result} />
        </div>

        <p className="mt-6 text-center text-xs text-white/50">
          Tip: For private or region-locked content, upload a short screen recording with the audio.
        </p>
      </main>
    </div>
  )
}

export default App
