import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LongButton from '@/components/button/LongButton'
import IcBack from '@/assets/icons/ic_back_24.svg?react'
import IcStar from '@/assets/icons/ic_star_24.svg?react'
import IcPin from '@/assets/icons/ic_pin_24.svg?react'
import IcClock from '@/assets/icons/ic_clock_24.svg?react'
import IcCheck from '@/assets/icons/ic_check_bold_24.svg?react'

const BLOCKS = ['intro', 'reasoning', 'offer', 'candidates', 'note']

const REASONING_LINES = [
  { fn: 'google_calendar.list_events()', result: '8/12 19시 이후 비어 있음' },
  { fn: 'search_shops(nail, 홍대)', result: '후보 7곳' },
  { fn: 'filter(단골 우선)', result: '프리즘네일 4회 방문 기록' },
  { fn: 'cross(빈시간 × 예약가능)', result: '3개로 좁힘' },
]

const CANDIDATES = [
  {
    id: 'a',
    Icon: IcStar,
    shop: '프리즘네일 홍대',
    service: '젤네일',
    price: '45,000원',
    datetime: '8/12 (수) 19:00',
    note: '결혼식 D-3 · 화연님이 4번 가신 곳',
  },
  {
    id: 'b',
    Icon: IcPin,
    shop: '무드네일 합정',
    service: '젤네일',
    price: '42,000원',
    datetime: '8/13 (목) 20:00',
    note: '회사에서 10분 · 그날 야근 없으세요',
  },
  {
    id: 'c',
    Icon: IcClock,
    shop: '프리즘네일 홍대',
    service: '젤네일',
    price: '45,000원',
    datetime: '8/12 (수) 14:00',
    note: '반차 쓰시면 여유롭게 · 대기 없음',
  },
]

function AgentBubble({ children }) {
  return (
    <div className="animate-chat-in bg-gray10 text-gray90 text-caption1 w-fit max-w-[85%] rounded-2xl rounded-tl-sm px-4 py-3">
      {children}
    </div>
  )
}

function AgentChat() {
  const navigate = useNavigate()
  const [revealCount, setRevealCount] = useState(0)
  const [selectedId, setSelectedId] = useState(null)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    if (revealCount >= BLOCKS.length) return undefined
    const timer = setTimeout(
      () => setRevealCount((count) => count + 1),
      revealCount === 0 ? 300 : 500,
    )
    return () => clearTimeout(timer)
  }, [revealCount])

  const isVisible = (block) => revealCount > BLOCKS.indexOf(block)
  const selectedCandidate = CANDIDATES.find((candidate) => candidate.id === selectedId)

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex items-center gap-2 px-5 pt-16">
        <button type="button" onClick={() => navigate(-1)}>
          <IcBack className="text-gray90 h-6 w-6" />
        </button>
        <h1 className="text-body3 text-gray90">슬슬</h1>
      </div>

      <div className="flex flex-1 flex-col gap-3 px-5 py-5">
        {isVisible('intro') && (
          <AgentBubble>
            네일 상태 확인했어요. 8월 15일 결혼식까지 고려하면 12~13일이 가장 좋겠어요.
          </AgentBubble>
        )}

        {isVisible('reasoning') && (
          <div className="animate-chat-in bg-gray10 rounded-2xl p-4">
            <p className="text-caption2 text-gray60 mb-2 flex items-center gap-1.5">
              <span className="bg-orange50 h-1.5 w-1.5 rounded-full" />
              슬슬이 확인하는 중
            </p>
            <div className="flex flex-col gap-1.5">
              {REASONING_LINES.map(({ fn, result }) => (
                <p key={fn} className="text-caption3 font-mono">
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
            {CANDIDATES.map(({ id, Icon, shop, price, datetime, note }, index) => {
              const isSelected = selectedId === id
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => setSelectedId(id)}
                  style={{ animationDelay: `${index * 100}ms` }}
                  className={`animate-chat-in w-full rounded-2xl border p-4 text-left ${
                    isSelected ? 'border-orange50 bg-orange10' : 'border-gray30'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <p className="text-body4 text-gray90">{shop}</p>
                    <p className="text-body4 text-gray90">{price}</p>
                  </div>
                  <p className="text-caption2 text-gray60 mt-1">{datetime}</p>
                  <p className="text-caption2 text-gray60 mt-1 flex items-center gap-1">
                    <Icon className="text-orange50 h-3.5 w-3.5 shrink-0" />
                    {note}
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
              <p className="text-caption2 text-gray60 mt-1">{selectedCandidate.datetime}</p>
              <p className="text-caption2 text-gray60 mt-0.5">
                {selectedCandidate.service} · {selectedCandidate.price}
              </p>
            </div>

            <div className="bg-orange10 mt-3 flex items-start gap-1.5 rounded-xl p-3">
              <IcCheck className="text-orange50 mt-0.5 h-4 w-4 shrink-0" />
              <p className="text-caption2 text-orange70">
                확정 전에 꼭 여쭤봐요. 예약은 화연님이 정하시는 거예요.
              </p>
            </div>

            <div className="mt-4">
              <LongButton
                onClick={() => {
                  const { shop, service, price, datetime } = selectedCandidate
                  navigate('/reserve-complete', {
                    state: { candidate: { shop, service, price, datetime } },
                  })
                }}
              >
                예약하기
              </LongButton>
            </div>
            <button
              type="button"
              onClick={() => setShowModal(false)}
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
