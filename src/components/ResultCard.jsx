export default function ResultCard({ result }) {
  if (!result) return null
  if (!result.found) {
    return (
      <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/10 text-white">
        No match found. Try a different segment or upload a short clip.
      </div>
    )
  }

  return (
    <div className="mt-6 p-5 rounded-2xl bg-white/5 border border-white/10 text-white space-y-3">
      <div className="text-2xl font-bold">{result.title}</div>
      <div className="text-white/80">by {result.artist}</div>
      {result.album && <div className="text-white/60">Album: {result.album}</div>}
      {result.release_date && (
        <div className="text-white/60">Released: {result.release_date}</div>
      )}
      {result.timecode && (
        <div className="text-white/60">Timecode: {result.timecode}</div>
      )}
      <div className="pt-2 flex flex-wrap gap-2">
        {result?.links?.spotify && (
          <a className="px-3 py-1 rounded bg-green-600/80 hover:bg-green-600" href={result.links.spotify} target="_blank" rel="noreferrer">Spotify</a>
        )}
        {result?.links?.apple_music && (
          <a className="px-3 py-1 rounded bg-pink-600/80 hover:bg-pink-600" href={result.links.apple_music} target="_blank" rel="noreferrer">Apple Music</a>
        )}
        {result?.links?.deezer && (
          <a className="px-3 py-1 rounded bg-blue-600/80 hover:bg-blue-600" href={result.links.deezer} target="_blank" rel="noreferrer">Deezer</a>
        )}
        {result?.links?.audd && (
          <a className="px-3 py-1 rounded bg-slate-700/80 hover:bg-slate-700" href={result.links.audd} target="_blank" rel="noreferrer">Open</a>
        )}
      </div>
    </div>
  )
}
