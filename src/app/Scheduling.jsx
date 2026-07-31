import { useNavigate } from 'react-router-dom'
import LongButton from '@/components/button/LongButton'
import IcBack from '@/assets/icons/ic_back_24.svg?react'
import IcCircle from '@/assets/icons/ic_circle_24.svg?react'
import { useFlow } from '@/context/FlowContext'
import { formatDateRangeShort, formatMonthDay } from '@/lib/date'

// 염색은 아직 API가 다루지 않는 목업 타임라인 항목
const MOCK_DYE_STEP = {
  key: 'dye',
  date: '8/11 (화) · D-4',
  title: '뿌리염색',
  description: '염색은 3~4일 지나야 색이 자연스럽게 가라앉아요',
}

function Scheduling() {
  const navigate = useNavigate()
  const { analysis } = useFlow()
  const reversePlan = analysis?.reversePlan
  const upcomingEvent = analysis?.upcomingEvent

  const nailStep = reversePlan && {
    key: 'nail',
    date: formatDateRangeShort(reversePlan.recommendedStart, reversePlan.recommendedEnd),
    title: '네일',
    description: '시술 2~3일 후가 가장 깨끗해요. 당일은 오히려 부담스러워요',
  }

  const eventStep = upcomingEvent && {
    key: 'event',
    date: formatMonthDay(upcomingEvent.date),
    title: upcomingEvent.title,
    description: '모든 관리가 가장 좋은 상태로 맞춰집니다',
    descriptionHighlight: '가장 좋은 상태',
    highlight: true,
  }

  const timeline = [MOCK_DYE_STEP, nailStep, eventStep].filter(Boolean)

  return (
    <div className="flex min-h-screen flex-col px-5 pt-4 pb-8">
      <div className="flex items-center gap-2">
        <button type="button" onClick={() => navigate(-1)}>
          <IcBack className="text-gray90 h-6 w-6" />
        </button>
        <h1 className="text-body3 text-gray90">거꾸로 계산하기</h1>
      </div>

      <div className="bg-orange50 mt-6 rounded-3xl px-5 py-6 text-center">
        {upcomingEvent ? (
          <>
            <p className="text-orange10 text-caption2">{formatMonthDay(upcomingEvent.date)}</p>
            <p className="text-title3 text-gray0 mt-1">{upcomingEvent.title}</p>
          </>
        ) : (
          <>
            <p className="text-orange10 text-caption2">관리 주기 기준</p>
            <p className="text-title3 text-gray0 mt-1">추천 일정</p>
          </>
        )}
      </div>

      <div className="mt-6 flex flex-col">
        {timeline.map(({ key, date, title, description, descriptionHighlight, highlight }, index) => (
          <div key={key} className="flex gap-3">
            <div className="flex flex-col items-center">
              <span className="bg-orange50 mt-1 h-2 w-2 shrink-0 rounded-full" />
              {index < timeline.length - 1 && <span className="bg-orange20 w-px flex-1" />}
            </div>
            <div className="flex-1 pb-5">
              <p className="text-caption2 text-gray60">{date}</p>
              <p className={`text-body3 mt-0.5 ${highlight ? 'text-orange50' : 'text-gray90'}`}>
                {title}
              </p>
              <p className="text-caption2 text-gray60 mt-1">
                {descriptionHighlight ? (
                  <>
                    {description.split(descriptionHighlight)[0]}
                    <span className="text-orange50 font-semibold">{descriptionHighlight}</span>
                    {description.split(descriptionHighlight)[1]}
                  </>
                ) : (
                  description
                )}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gray10 rounded-2xl p-4">
        <p className="text-caption3 text-gray70 flex items-center gap-1.5 font-semibold">
          <IcCircle className="h-3.5 w-3.5" />
          순서까지 고려했어요
        </p>
        <p className="text-caption2 text-gray60 mt-2">
          염색을 네일보다 먼저 잡았어요. 염색 후 손에 얼룩이 남을 수 있어서, 네일을 먼저 하면
          이를 미리 다시 손봐야 하거든요.
        </p>
      </div>

      <div className="mt-auto pt-8">
        <LongButton onClick={() => navigate('/agent-chat')}>두 개 한번에 잡기</LongButton>
        <button
          type="button"
          onClick={() => navigate('/agent-chat')}
          className="text-body6 text-gray60 mt-3 w-full text-center"
        >
          네일만 잡을래요
        </button>
      </div>
    </div>
  )
}

export default Scheduling
