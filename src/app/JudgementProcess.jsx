import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LongButton from '@/components/button/LongButton'
import IcBack from '@/assets/icons/ic_back_24.svg?react'
import IcAdd from '@/assets/icons/ic_add_24.svg?react'
import api from '@/lib/axios'
import { useFlow } from '@/context/FlowContext'
import ErrorBanner from '@/components/ErrorBanner'
import { formatMonthDay } from '@/lib/date'

const EVIDENCE_STEP_TITLES = {
  1: '사진첩 훑기',
  2: '상태 측정',
  3: '주기 계산',
  4: '관리 시점 판단',
  5: '일정 확인',
  6: '역방향 일정 계산',
}

function ResultPreview({ result }) {
  if (!result) return null
  return (
    <div className="bg-gray10 mt-3 rounded-xl p-3">
      {Object.entries(result).map(([key, value]) => (
        <p key={key} className="text-caption3 text-gray70 font-mono">
          <span className="text-gray50">{key}</span>{' '}
          {Array.isArray(value) ? value.join(', ') : String(value)}
        </p>
      ))}
    </div>
  )
}

function JudgementProcess() {
  const navigate = useNavigate()
  const { analysisId, analysis, schedule, patch } = useFlow()
  const [expandedKey, setExpandedKey] = useState('step-2')
  const [error, setError] = useState(null)
  const [loadingSchedule, setLoadingSchedule] = useState(false)
  const [attempt, setAttempt] = useState(0)

  // "슬롯 대조" 단계를 보여주기 위해 예약 후보를 미리 한 번 조회해 컨텍스트에 저장해 둔다.
  // AgentChat은 이 결과를 다시 불러오지 않고 그대로 재사용한다.
  useEffect(() => {
    if (!analysisId || !analysis?.canSchedule || schedule) return undefined
    let cancelled = false
    setLoadingSchedule(true)
    setError(null)

    api
      .post(`/api/analyses/${analysisId}/schedule`, {})
      .then(({ data }) => {
        if (cancelled) return
        patch({ schedule: data })
      })
      .catch((err) => {
        if (cancelled) return
        setError(err)
      })
      .finally(() => {
        if (!cancelled) setLoadingSchedule(false)
      })

    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [analysisId, attempt])

  const steps = useMemo(() => {
    const evidenceSteps = (analysis?.evidenceLogs ?? []).map((log) => ({
      key: `step-${log.step}`,
      title: EVIDENCE_STEP_TITLES[log.step] ?? `단계 ${log.step}`,
      summary: log.message,
      result: log.result,
    }))

    if (schedule) {
      evidenceSteps.push({
        key: 'step-schedule',
        title: '슬롯 대조',
        summary: `예약 후보 ${schedule.candidates.length}개 선정`,
        result: {
          제외된슬롯: schedule.excludedSlots.length,
          agentMode: schedule.agentMode,
        },
      })
    }
    return evidenceSteps
  }, [analysis, schedule])

  if (!analysis) {
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
    <div className="flex min-h-screen flex-col px-5 pt-16 pb-8">
      <div className="flex items-center gap-2">
        <button type="button" onClick={() => navigate(-1)}>
          <IcBack className="text-gray90 h-6 w-6" />
        </button>
        <h1 className="text-body3 text-gray90">슬슬의 판단 과정</h1>
      </div>

      <p className="text-caption3 text-orange50 mt-6 font-semibold tracking-wide">
        AGENT REASONING
      </p>
      <h2 className="text-title2 text-gray90 mt-2">
        {analysis.reversePlan ? (
          <>
            네일을 <span className="text-orange50">{formatMonthDay(analysis.reversePlan.recommendedStart)}</span>
            에 받으시는 게 좋겠어요
          </>
        ) : (
          analysis.careStatus.message
        )}
      </h2>
      <p className="text-caption1 text-gray60 mt-2">
        {steps.length}단계를 거쳤어요 · 각 단계를 눌러 근거를 볼 수 있어요
      </p>

      {error && (
        <ErrorBanner error={error} onRetry={() => setAttempt((prev) => prev + 1)} className="mt-4" />
      )}

      <div className="mt-6 flex flex-col gap-5">
        {steps.map(({ key, title, summary, result }, index) => {
          const isExpanded = expandedKey === key
          return (
            <div
              key={key}
              className={isExpanded ? 'bg-orange10 border-orange50 rounded-2xl border p-4' : ''}
            >
              <button
                type="button"
                onClick={() => setExpandedKey((prev) => (prev === key ? null : key))}
                className="flex w-full items-center gap-3 text-left"
              >
                <span
                  className={`text-body6 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
                    isExpanded ? 'bg-orange50 text-gray0' : 'text-orange50'
                  }`}
                >
                  {index + 1}
                </span>
                <div className="flex-1">
                  <p className="text-body4 text-gray90">{title}</p>
                  <p className="text-caption2 text-gray60 mt-0.5">{summary}</p>
                </div>
                <IcAdd
                  className={`h-4 w-4 shrink-0 transition-transform ${
                    isExpanded ? 'text-orange50 rotate-45' : 'text-gray40'
                  }`}
                />
              </button>

              {isExpanded && <ResultPreview result={result} />}
            </div>
          )
        })}

        {loadingSchedule && (
          <p className="text-caption2 text-gray60 text-center">예약 후보를 찾는 중이에요…</p>
        )}
      </div>

      {(analysis.changeSignal.visionFailed || analysis.changeSignal.confidence === 'LOW') && (
        <div className="bg-gray10 mt-4 rounded-2xl p-4">
          <p className="text-caption2 text-gray60">
            {analysis.fallbackReason ?? '이번 판단은 신뢰도가 낮아 다음 사진에서 다시 확인할게요.'}
          </p>
        </div>
      )}

      <div className="mt-auto pt-8">
        <LongButton disabled={!schedule} onClick={() => navigate('/agent-chat')}>
          그럼 예약 잡아줘
        </LongButton>
      </div>
    </div>
  )
}

export default JudgementProcess
