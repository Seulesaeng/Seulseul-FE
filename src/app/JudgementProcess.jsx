import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LongButton from '@/components/button/LongButton'
import IcBack from '@/assets/icons/ic_back_24.svg?react'
import IcAdd from '@/assets/icons/ic_add_24.svg?react'

const STEPS = [
  {
    key: 'gallery',
    title: '사진첩 훑기',
    summary: (
      <>
        최근 7일 사진 <span className="text-gray90 font-semibold">34장</span> 중{' '}
        <span className="text-gray90 font-semibold">6장</span> 선별
      </>
    ),
    detail: '손톱이 선명하게 보이는 사진만 남겼어요',
  },
  {
    key: 'state',
    title: '상태 측정',
    summary: (
      <>
        자란 길이 <span className="text-gray90 font-semibold">2.8mm</span>
      </>
    ),
    detail: (
      <div className="mt-3 flex flex-col gap-2">
        <span className="bg-orange10 text-orange60 w-fit rounded-md px-2 py-1 font-mono text-[11px]">
          analyze_nail_growth()
        </span>
        <div className="bg-gray10 rounded-xl p-3">
          <p className="text-caption2 text-gray90">큐티클 라인 노출 확인 · 우측 약지 들뜸</p>
          <p className="text-caption3 text-gray60 mt-1">
            신뢰도 <span className="text-gray90 font-semibold">87%</span>
          </p>
        </div>
      </div>
    ),
  },
  {
    key: 'history',
    title: '기록과 대조',
    summary: (
      <>
        평소보다 <span className="text-gray90 font-semibold">18%</span> 빠름
      </>
    ),
    detail: '최근 3회 시술 간격 평균과 비교했어요',
  },
  {
    key: 'cycle',
    title: '주기 재계산',
    summary: (
      <>
        <span className="text-gray90 font-semibold">26일</span> →{' '}
        <span className="text-gray90 font-semibold">21일</span>로 보정
      </>
    ),
    detail: '성장 속도를 반영해 다음 주기를 앞당겼어요',
  },
  {
    key: 'calendar',
    title: '일정 확인 후 역산',
    summary: (
      <>
        Google 캘린더의 <span className="text-gray90 font-semibold">8/15 결혼식</span> →{' '}
        <span className="text-gray90 font-semibold">8/12~13</span>이 최적
      </>
    ),
    detail: '결혼식 2~3일 전이 가장 깔끔한 타이밍이에요',
  },
  {
    key: 'slot',
    title: '슬롯 대조',
    summary: (
      <>
        후보 <span className="text-gray90 font-semibold">3개</span> 선정
      </>
    ),
    detail: '샵 영업시간과 회원님 일정이 겹치는 시간만 골랐어요',
  },
]

function JudgementProcess() {
  const navigate = useNavigate()
  const [expandedKey, setExpandedKey] = useState('state')

  const toggleStep = (key) => {
    setExpandedKey((prev) => (prev === key ? null : key))
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
        네일을 <span className="text-orange50">8월 12일</span>에 받으시는 게 좋겠어요
      </h2>
      <p className="text-caption1 text-gray60 mt-2">
        6단계를 거쳤어요 · 각 단계를 눌러 근거를 볼 수 있어요
      </p>

      <div className="mt-6 flex flex-col gap-5">
        {STEPS.map(({ key, title, summary, detail }, index) => {
          const isExpanded = expandedKey === key
          return (
            <div
              key={key}
              className={isExpanded ? 'bg-orange10 border-orange50 rounded-2xl border p-4' : ''}
            >
              <button
                type="button"
                onClick={() => toggleStep(key)}
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

              {isExpanded && detail}
            </div>
          )
        })}
      </div>

      <div className="bg-gray10 mt-4 rounded-2xl p-4">
        <p className="text-caption2 text-gray60">
          확실치 않은 게 하나 있어요. 8/9 사진이 실내 조명이라 색이 정확하지 않았어요.
          뿌리염색은 좀 더 지켜보고 말씀드릴게요.
        </p>
      </div>

      <div className="mt-auto pt-8">
        <LongButton>그럼 예약 잡아줘</LongButton>
      </div>
    </div>
  )
}

export default JudgementProcess
