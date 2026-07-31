import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LongButton from '@/components/button/LongButton'
import IcBack from '@/assets/icons/ic_back_24.svg?react'
import IcStar from '@/assets/icons/ic_star_24.svg?react'
import IcPin from '@/assets/icons/ic_pin_24.svg?react'
import IcClock from '@/assets/icons/ic_clock_24.svg?react'
import IcCheck from '@/assets/icons/ic_check_bold_24.svg?react'
import api from '@/lib/axios'
import { useFlow } from '@/context/FlowContext'
import ErrorBanner from '@/components/ErrorBanner'
import { formatDateRangeShort, formatDateTimeKR, formatMonthDay } from '@/lib/date'

const BLOCKS = ['intro', 'reasoning', 'offer', 'candidates', 'note']
const CANDIDATE_ICONS = [IcStar, IcPin, IcClock]

function AgentBubble({ children }) {
  return (
    <div className="animate-chat-in bg-gray10 text-gray90 text-caption1 w-fit max-w-[85%] rounded-2xl rounded-tl-sm px-4 py-3">
      {children}
    </div>
  )
}

function AgentChat() {
  const navigate = useNavigate()
  const { analysisId, analysis, schedule, patch } = useFlow()
  const [revealCount, setRevealCount] = useState(0)
  const [selectedId, setSelectedId] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [loadError, setLoadError] = useState(null)
  const [confirmError, setConfirmError] = useState(null)
  const [confirming, setConfirming] = useState(false)
  const [attempt, setAttempt] = useState(0)

  // JudgementProcess를 거치지 않고 바로 들어온 경우 대비: 예약 후보가 없으면 여기서 조회한다.
  useEffect(() => {
    if (schedule || !analysisId) return undefined
    let cancelled = false
    setLoadError(null)

    api
      .post(`/api/analyses/${analysisId}/schedule`, {})
      .then(({ data }) => {
        if (cancelled) return
        patch({ schedule: data })
      })
      .catch((err) => {
        if (cancelled) return
        setLoadError(err)
      })

    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [analysisId, attempt])

  useEffect(() => {
    if (!schedule || revealCount >= BLOCKS.length) return undefined
    const timer = setTimeout(
      () => setRevealCount((count) => count + 1),
      revealCount === 0 ? 300 : 500,
    )
    return () => clearTimeout(timer)
  }, [schedule, revealCount])

  const isVisible = (block) => revealCount > BLOCKS.indexOf(block)
  const candidates = schedule?.candidates ?? []
  const selectedCandidate = candidates.find((candidate) => candidate.candidateId === selectedId)
  const reasoningLines = (schedule?.executionLogs ?? [])
    .filter((log) => log.step > 1)
    .map((log) => ({
      fn: log.tool ? `${log.tool}()` : `${log.type.toLowerCase()}()`,
      result: log.message,
    }))

  const reversePlan = analysis?.reversePlan
  const upcomingEvent = analysis?.upcomingEvent

  async function handleConfirm() {
    if (!selectedCandidate) return
    setConfirming(true)
    setConfirmError(null)
    try {
      const { data } = await api.post(`/api/bookings/${selectedCandidate.candidateId}/confirm`, {})
      patch({ selectedCandidate, confirmation: data })
      navigate('/reserve-complete')
    } catch (err) {
      setShowModal(false)
      setConfirmError(err)
    } finally {
      setConfirming(false)
    }
  }

  if (!analysisId) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-5">
        <ErrorBanner error={{ message: '분석 데이터를 찾을 수 없어요. 홈으로 돌아가 다시 시도해주세요.' }} />
        <button type="button" onClick={() => navigate('/home')} className="text-body6 text-gray60">
          홈으로
        </button>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex items-center gap-2 px-5 pt-16">
        <button type="button" onClick={() => navigate(-1)}>
          <IcBack className="text-gray90 h-6 w-6" />
        </button>
        <h1 className="text-body3 text-gray90">슬슬</h1>
      </div>

      <div className="flex flex-1 flex-col gap-3 px-5 py-5">
        {loadError && (
          <ErrorBanner error={loadError} onRetry={() => setAttempt((prev) => prev + 1)} />
        )}
        {confirmError && <ErrorBanner error={confirmError} onRetry={() => setConfirmError(null)} />}

        {!schedule && !loadError && (
          <AgentBubble>예약 가능한 시간을 찾고 있어요…</AgentBubble>
        )}

        {isVisible('intro') && (
          <AgentBubble>
            네일 상태 확인했어요.{' '}
            {upcomingEvent
              ? `${formatMonthDay(upcomingEvent.date)} ${upcomingEvent.title}까지 고려하면`
              : '관리 주기를 고려하면'}{' '}
            {reversePlan && formatDateRangeShort(reversePlan.recommendedStart, reversePlan.recommendedEnd)}이
            가장 좋겠어요.
          </AgentBubble>
        )}

        {isVisible('reasoning') && (
          <div className="animate-chat-in bg-gray10 rounded-2xl p-4">
            <p className="text-caption2 text-gray60 mb-2 flex items-center gap-1.5">
              <span className="bg-orange50 h-1.5 w-1.5 rounded-full" />
              슬슬이 확인하는 중
            </p>
            <div className="flex flex-col gap-1.5">
              {reasoningLines.map(({ fn, result }, index) => (
                <p key={`${fn}-${index}`} className="text-caption3 font-mono">
                  <span className="text-orange60">{fn}</span>
                  <span className="text-gray70"> → {result}</span>
                </p>
              ))}
            </div>
          </div>
        )}

        {isVisible('offer') && (
          <AgentBubble>세 개 골라봤어요. 왜 골랐는지도 같이 적어 뒀어요.</AgentBubble>
        )}

        {isVisible('candidates') && (
          <div className="flex flex-col gap-3">
            {candidates.map((candidate, index) => {
              const Icon = CANDIDATE_ICONS[index % CANDIDATE_ICONS.length]
              const isSelected = selectedId === candidate.candidateId
              return (
                <button
                  key={candidate.candidateId}
                  type="button"
                  onClick={() => setSelectedId(candidate.candidateId)}
                  style={{ animationDelay: `${index * 100}ms` }}
                  className={`animate-chat-in w-full rounded-2xl border p-4 text-left ${
                    isSelected ? 'border-orange50 bg-orange10' : 'border-gray30'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <p className="text-body4 text-gray90">{candidate.shop}</p>
                    <p className="text-body4 text-gray90">{candidate.price.toLocaleString('ko-KR')}원</p>
                  </div>
                  <p className="text-caption2 text-gray60 mt-1">{formatDateTimeKR(candidate.start)}</p>
                  <p className="text-caption2 text-gray60 mt-1 flex items-center gap-1">
                    <Icon className="text-orange50 h-3.5 w-3.5 shrink-0" />
                    {candidate.recommendationReason}
                  </p>
                </button>
              )
            })}
          </div>
        )}

        {isVisible('note') && (
          <AgentBubble>
            참고로 뿌리염색은 8월 11일에 먼저 받으시는 걸 추천해요. 염색 후 손에 얼룩이 남을
            수 있어서 순서를 그렇게 잡았어요.
          </AgentBubble>
        )}
      </div>

      <div className="border-gray20 sticky bottom-0 border-t bg-white px-5 py-4">
        <LongButton disabled={!selectedId} onClick={() => setShowModal(true)}>
          이 시간으로 예약
        </LongButton>
      </div>

      {showModal && selectedCandidate && (
        <div className="bg-gray100/50 fixed inset-0 z-50 flex items-center justify-center px-6">
          <div className="bg-gray0 w-full max-w-sm rounded-3xl p-5">
            <p className="text-body3 text-gray90 text-center">이렇게 예약할까요?</p>

            <div className="bg-gray10 mt-4 rounded-2xl p-4 text-center">
              <p className="text-body3 text-gray90">{selectedCandidate.shop}</p>
              <p className="text-caption2 text-gray60 mt-1">{formatDateTimeKR(selectedCandidate.start)}</p>
              <p className="text-caption2 text-gray60 mt-0.5">
                {selectedCandidate.service} · {selectedCandidate.price.toLocaleString('ko-KR')}원
              </p>
            </div>

            <div className="bg-orange10 mt-3 flex items-start gap-1.5 rounded-xl p-3">
              <IcCheck className="text-orange50 mt-0.5 h-4 w-4 shrink-0" />
              <p className="text-caption2 text-orange70">
                확정 전에 꼭 여쭤봐요. 예약은 화연님이 정하시는 거예요.
              </p>
            </div>

            <div className="mt-4">
              <LongButton disabled={confirming} onClick={handleConfirm}>
                {confirming ? '예약하는 중…' : '예약하기'}
              </LongButton>
            </div>
            <button
              type="button"
              onClick={() => setShowModal(false)}
              disabled={confirming}
              className="text-body6 text-gray60 mt-3 w-full text-center"
            >
              다시 고를래요
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AgentChat
