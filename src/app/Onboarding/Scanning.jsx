import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '@/lib/axios'
import { useFlow } from '@/context/FlowContext'
import ErrorBanner from '@/components/ErrorBanner'

const COLUMNS = 4
const ROWS = 5
const TOTAL_CELLS = COLUMNS * ROWS
const HIGHLIGHT_COUNT = 6
const FINAL_PATTERN = [2, 5, 9, 13, 16, 18]
const TICK_MS = 350
const SCAN_DURATION_MS = 3000

function getRandomCells() {
  const indices = Array.from({ length: TOTAL_CELLS }, (_, i) => i)
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[indices[i], indices[j]] = [indices[j], indices[i]]
  }
  return indices.slice(0, HIGHLIGHT_COUNT)
}

function Scanning() {
  const [activeCells, setActiveCells] = useState(getRandomCells)
  const [isDone, setIsDone] = useState(false)
  const [error, setError] = useState(null)
  const [attempt, setAttempt] = useState(0)
  const navigate = useNavigate()
  const { patch } = useFlow()

  // 데모 앨범 연결 + 분석 요청. 최소 SCAN_DURATION_MS 동안은 스캔 애니메이션을 보여준다.
  useEffect(() => {
    if (error) return undefined
    const tick = setInterval(() => setActiveCells(getRandomCells()), TICK_MS)

    let cancelled = false
    const minDelay = new Promise((resolve) => setTimeout(resolve, SCAN_DURATION_MS))

    async function run() {
      try {
        const { data: album } = await api.post('/api/albums/connect', { source: 'DEMO' })
        const { data: analysis } = await api.post('/api/analyses', { albumId: album.albumId })
        await minDelay
        if (cancelled) return
        patch({ albumId: album.albumId, analysisId: analysis.analysisId, analysis })
        clearInterval(tick)
        setActiveCells(FINAL_PATTERN)
        setIsDone(true)
      } catch (err) {
        if (cancelled) return
        clearInterval(tick)
        setError(err)
      }
    }
    run()

    return () => {
      cancelled = true
      clearInterval(tick)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attempt])

  useEffect(() => {
    if (!isDone) return
    const redirect = setTimeout(() => navigate('/onboarding/scan-result'), 800)
    return () => clearTimeout(redirect)
  }, [isDone, navigate])

  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-5 px-21">
        <ErrorBanner
          error={error}
          onRetry={() => {
            setError(null)
            setIsDone(false)
            setActiveCells(getRandomCells())
            setAttempt((prev) => prev + 1)
          }}
        />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-5 px-21">
      <div className="grid grid-cols-4 gap-1">
        {Array.from({ length: TOTAL_CELLS }).map((_, index) => (
          <div
            key={index}
            className={`h-13.75 w-13.75 rounded-sm transition-colors duration-300 ${
              activeCells.includes(index) ? 'bg-orange50' : 'bg-gray10'
            }`}
          />
        ))}
      </div>

      <div className="text-center">
        <p className="text-title3 text-gray90">사진첩을 살펴보고 있어요</p>
        <p className="text-body3 text-gray60 mt-5">기기 안에서만 처리됩니다</p>
      </div>
    </div>
  )
}

export default Scanning
