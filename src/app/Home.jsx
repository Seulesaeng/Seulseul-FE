import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import bannerBg from '@/assets/images/img_banner_background.png'
import IcList from '@/assets/icons/ic_list_24.svg?react'
import IcProfile from '@/assets/icons/ic_profile_24.svg?react'
import IcCalendar from '@/assets/icons/ic_calendar_24.svg?react'
import IcChevron from '@/assets/icons/ic_back_24.svg?react'
import IcAdd from '@/assets/icons/ic_add_24.svg?react'
import IcNail from '@/assets/icons/ic_nail_24.svg?react'
import IcDye from '@/assets/icons/ic_dye_24.svg?react'
import IcLash from '@/assets/icons/ic_lash_24.svg?react'
import IcPin from '@/assets/icons/ic_pin_24.svg?react'
import IcCamera from '@/assets/icons/ic_camera_24.svg?react'
import IcCircle from '@/assets/icons/ic_circle_24.svg?react'

const WEEKDAY_LABELS = ['월', '화', '수', '목', '금', '토', '일']

const WEEK_DAYS = [10, 11, 12, 13, 14, 15, 16]

const EVENT_DAYS = { 15: 'personal', 16: 'reservation' }
const TODAY = 10

const CARE_ITEMS = [
  {
    key: 'nail',
    Icon: IcNail,
    title: '네일',
    status: '지금',
    statusTone: 'urgent',
    location: '프리즘네일 홍대 · 22일 전',
    description: '어제 사진 기준 · 2.8mm',
  },
  {
    key: 'dye',
    Icon: IcDye,
    title: '뿌리염색',
    status: '슬슬',
    statusTone: 'soon',
    location: '살롱드 서교 · 27일 전',
    description: '8/11 권장 · 결혼식 역산',
  },
  {
    key: 'lash',
    Icon: IcLash,
    title: '속눈썹펌',
    status: '아직',
    statusTone: 'later',
    location: '루미래쉬 합정 · 15일 전',
    description: '사진상 아직 여유',
  },
]

const CARD_BORDER_CLASS = {
  urgent: 'border-orange50',
  soon: 'border-gray30',
  later: 'border-gray30',
}

const ICON_TONE_CLASS = {
  urgent: 'bg-orange10 text-orange50',
  soon: 'bg-orange10 text-orange50',
  later: 'bg-gray10 text-gray40',
}

const STATUS_BADGE_CLASS = {
  urgent: 'bg-orange50 text-gray0',
  soon: 'bg-orange10 text-orange50',
  later: 'bg-gray30 text-gray60',
}

function getMonthMatrix(year, monthIndex) {
  const firstWeekday = new Date(year, monthIndex, 1).getDay()
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate()

  const cells = Array(firstWeekday).fill(null)
  for (let day = 1; day <= daysInMonth; day++) cells.push(day)
  while (cells.length % 7 !== 0) cells.push(null)

  return cells
}

function getDateClass(date) {
  if (date === TODAY) return 'bg-orange50 text-gray0'
  if (EVENT_DAYS[date] === 'reservation') return 'text-orange50'
  return 'text-gray90'
}

function EventDot({ type }) {
  if (!type) return <span className="h-1 w-1" />
  return (
    <span
      className={`h-1 w-1 rounded-full ${type === 'reservation' ? 'bg-orange50' : 'bg-gray90'}`}
    />
  )
}

function Home() {
  const navigate = useNavigate()
  const [mode, setMode] = useState('week')
  const monthCells = getMonthMatrix(2026, 7)

  return (
    <div className="min-h-screen pb-10">
      <header className="flex items-center justify-between px-5 pt-4">
        <div className="flex items-center gap-1.5">
          <span className="bg-orange50 h-5 w-5 rounded-md" />
          <span
            className="text-gray90 font-extrabold"
            style={{
              fontFamily: "'Ria Sans', var(--font-sans)",
              fontSize: '18px',
              lineHeight: '22px',
              letterSpacing: '-1.1px',
            }}
          >
            슬슬
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button type="button">
            <IcList className="text-gray70 h-6 w-6" />
          </button>
          <button type="button">
            <IcProfile className="text-gray70 h-6 w-6" />
          </button>
        </div>
      </header>

      <div
        className="relative mx-5 mt-4 overflow-hidden rounded-3xl bg-cover bg-right p-5"
        style={{ backgroundImage: `url(${bannerBg})` }}
      >
        <p className="text-body3 text-gray90">자기관리에 진심인 갓생러 주목</p>
        <p className="text-caption2 text-gray70 mt-1">관리 루틴 둘러보기 →</p>
        <span className="text-caption3 text-gray60 absolute right-4 bottom-3">1/2</span>
      </div>

      <div className="bg-orange10 mx-5 mt-3 rounded-2xl px-4 py-3">
        <p className="text-caption2 text-orange70 flex items-center gap-1.5">
          <span className="bg-orange50 h-1.5 w-1.5 shrink-0 rounded-full" />
          밤사이 사진 34장을 확인했어요 · 03:12
        </p>
      </div>

      <div className="mt-5 px-5">
        <h1 className="text-title3 text-gray90">안녕하세요, 화연님</h1>
        <p className="text-caption1 text-gray60 mt-1">
          오늘 예약하면 좋을 관리가 <span className="text-orange50 font-semibold">1개</span>{' '}
          있어요
        </p>
      </div>

      <button
        type="button"
        onClick={() => setMode((prev) => (prev === 'week' ? 'month' : 'week'))}
        className="border-gray30 mx-5 mt-4 block w-[calc(100%-2.5rem)] rounded-2xl border p-4 text-left"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <IcCalendar className="text-gray60 h-4 w-4" />
            <span className="text-caption2 text-gray60">Google 캘린더 연동됨</span>
          </div>
          <div className="bg-gray10 flex rounded-full p-0.5">
            <span
              className={`text-caption3 rounded-full px-3 py-1 ${
                mode === 'week' ? 'bg-gray0 text-gray90 shadow-sm' : 'text-gray40'
              }`}
            >
              주
            </span>
            <span
              className={`text-caption3 rounded-full px-3 py-1 ${
                mode === 'month' ? 'bg-gray0 text-gray90 shadow-sm' : 'text-gray40'
              }`}
            >
              월
            </span>
          </div>
        </div>

        {mode === 'week' ? (
          <div className="mt-3">
            <p className="text-body4 text-gray90">8월 둘째 주</p>
            <div className="mt-2 grid grid-cols-7 gap-1">
              {WEEK_DAYS.map((date, index) => (
                <div key={date} className="flex flex-col items-center gap-1">
                  <span className="text-caption3 text-gray50">{WEEKDAY_LABELS[index]}</span>
                  <span
                    className={`text-body6 flex h-11 w-11 items-center justify-center rounded-2xl ${getDateClass(date)}`}
                  >
                    {date}
                  </span>
                  <EventDot type={EVENT_DAYS[date]} />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="mt-3">
            <p className="text-body3 text-gray90 text-center">2026년 8월</p>
            <div className="mt-3 grid grid-cols-7 gap-y-2 text-center">
              {WEEKDAY_LABELS.map((label) => (
                <span key={label} className="text-caption3 text-gray50">
                  {label}
                </span>
              ))}
              {monthCells.map((day, index) => (
                <div key={index} className="flex flex-col items-center gap-1">
                  {day && (
                    <>
                      <span
                        className={`text-body6 flex h-8 w-8 items-center justify-center rounded-xl ${getDateClass(day)}`}
                      >
                        {day}
                      </span>
                      <EventDot type={EVENT_DAYS[day]} />
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-3 flex items-center justify-center gap-4">
          <span className="text-caption3 text-gray60 flex items-center gap-1">
            <span className="bg-orange50 h-1.5 w-1.5 rounded-full" />
            예약
          </span>
          <span className="text-caption3 text-gray60 flex items-center gap-1">
            <span className="bg-gray90 h-1.5 w-1.5 rounded-full" />
            내 일정
          </span>
        </div>
      </button>

      <div className="mt-6 px-5">
        <h2 className="text-body3 text-gray90 mb-3">지금 하고 있는 관리</h2>
        <div className="flex flex-col gap-2">
          {CARE_ITEMS.map(
            ({ key, Icon, title, status, statusTone, location, description }) => (
              <div
                key={key}
                className={`flex items-center gap-3 rounded-2xl border p-3 ${CARD_BORDER_CLASS[statusTone]}`}
              >
                <span
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${ICON_TONE_CLASS[statusTone]}`}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <div className="flex-1">
                  <div className="flex items-center gap-1.5">
                    <p className="text-body4 text-gray90">{title}</p>
                    <span
                      className={`text-caption3 rounded-full px-1.5 py-0.5 ${STATUS_BADGE_CLASS[statusTone]}`}
                    >
                      {status}
                    </span>
                  </div>
                  <p className="text-caption2 text-gray60 mt-0.5 flex items-center gap-1">
                    <IcPin className="h-3 w-3 shrink-0" />
                    {location}
                  </p>
                  <p className="text-caption2 text-gray60 mt-0.5">{description}</p>
                </div>
                <IcChevron className="text-gray40 h-4 w-4 rotate-180" />
              </div>
            ),
          )}

          <button
            type="button"
            className="border-gray30 text-gray60 flex items-center justify-center gap-1 rounded-2xl border border-dashed p-3"
          >
            <IcAdd className="h-4 w-4" />
            <span className="text-body6">케어 추가</span>
          </button>

          <p className="text-caption3 text-gray60 text-center">
            3/3 사용 중 · <span className="text-orange50">프로로 무제한 →</span>
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={() => navigate('/judgement-process')}
        className="border-orange50 mx-5 mt-4 block w-[calc(100%-2.5rem)] rounded-2xl border p-4 text-left"
      >
        <div className="flex items-center justify-between">
          <p className="text-caption3 text-orange50 flex items-center gap-1.5">
            <span className="bg-orange50 h-1.5 w-1.5 rounded-full" />
            방금 감지했어요
          </p>
          <span className="text-caption3 text-gray50">03:12</span>
        </div>
        <p className="text-body3 text-gray90 mt-2">네일이 꽤 자랐어요</p>
        <p className="text-caption2 text-gray60 mt-1 flex items-center gap-1">
          <IcCamera className="h-3.5 w-3.5 shrink-0" />
          어제 사진 기준 · 자란 길이 <span className="text-orange50 font-semibold">2.8mm</span>
        </p>
        <p className="text-caption2 text-orange50 mt-3">슬슬이 어떻게 판단했는지 보기 →</p>
      </button>

      <button
        type="button"
        onClick={() => navigate('/scheduling')}
        className="border-gray30 mx-5 mt-3 block w-[calc(100%-2.5rem)] rounded-2xl border p-4 text-left"
      >
        <p className="text-caption3 text-gray60 flex items-center gap-1.5">
          <IcCircle className="h-3.5 w-3.5 shrink-0" />
          일정에서 거꾸로 계산했어요
        </p>
        <p className="text-body3 text-gray90 mt-2">8월 15일 친구 결혼식</p>
        <p className="text-caption2 text-gray60 mt-1">
          네일 <span className="text-orange50 font-semibold">8/12~13</span> · 뿌리염색{' '}
          <span className="text-orange50 font-semibold">8/11</span>
        </p>
        <p className="text-caption2 text-orange50 mt-3">두 개 한번에 잡기 →</p>
      </button>
    </div>
  )
}

export default Home
