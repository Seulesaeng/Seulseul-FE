import { useNavigate } from 'react-router-dom'
import IcBack from '@/assets/icons/ic_back_24.svg?react'

const STATS = [
  { key: 'photos', value: '247', label: '사진 확인' },
  { key: 'measurements', value: '12', label: '상태 측정' },
  { key: 'suggestions', value: '3', label: '먼저 제안' },
]

const LOG_ENTRIES = [
  {
    key: 'growth',
    dateLabel: '오늘',
    time: '03:12',
    title: '네일 상태 변화 감지',
    description: '사진 34장 확인 → 6장에서 측정 → 주기 26일→21일 보정',
  },
  {
    key: 'wedding',
    dateLabel: '8/8',
    time: '02:50',
    title: '결혼식 일정 발견',
    description: '캘린더에 8/15 일정 추가됨 → 역산 스케줄 준비',
  },
  {
    key: 'hold',
    dateLabel: '8/6',
    time: '03:05',
    title: '판단 보류',
    description: '사진이 어두워 뿌리염색 상태를 확신할 수 없어 알림을 미룸',
  },
  {
    key: 'reschedule',
    dateLabel: '8/4',
    time: '18:30',
    title: '예약 시간 조정 제안',
    description: '야근 일정이 새로 생겨 8/5 19시 → 8/6 20시로 옮길지 물어봄',
  },
  {
    key: 'lash',
    dateLabel: '8/2',
    time: '03:01',
    title: '속눈썹 아직 여유',
    description: '사진상 밀도 양호 → 알림 보내지 않음',
  },
]

function Log() {
  const navigate = useNavigate()

  return (
    <div className="flex min-h-screen flex-col px-5 pt-16 pb-8">
      <div className="flex items-center gap-2">
        <button type="button" onClick={() => navigate(-1)}>
          <IcBack className="text-gray90 h-6 w-6" />
        </button>
        <h1 className="text-body3 text-gray90">슬슬이 한 일</h1>
      </div>

      <p className="text-caption1 text-gray60 mt-6">
        지난 7일 동안 화연님이 아무것도 안 하시는 사이에
      </p>

      <div className="mt-4 grid grid-cols-3 gap-2">
        {STATS.map(({ key, value, label }) => (
          <div key={key} className="border-gray30 rounded-2xl border p-3 text-center">
            <p className="text-title3 text-orange50">{value}</p>
            <p className="text-caption3 text-gray60 mt-1">{label}</p>
          </div>
        ))}
      </div>

      <div className="border-gray30 mt-4 rounded-2xl border">
        {LOG_ENTRIES.map(({ key, dateLabel, time, title, description }, index) => (
          <div
            key={key}
            className={`flex gap-3 p-4 ${
              index < LOG_ENTRIES.length - 1 ? 'border-gray20 border-b' : ''
            }`}
          >
            <div className="w-10 shrink-0 text-center">
              <p className="text-caption3 text-gray50">{dateLabel}</p>
              <p className="text-caption3 text-gray50">{time}</p>
            </div>
            <div className="flex-1">
              <p className="text-body4 text-gray90">{title}</p>
              <p className="text-caption2 text-gray60 mt-1">{description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-orange10 mt-4 rounded-2xl p-4">
        <p className="text-caption2 text-gray90 font-semibold">
          알림을 보내지 않은 것도 기록해요.
        </p>
        <p className="text-caption2 text-gray60 mt-1">
          슬슬은 확실할 때만 말을 합니다. 잔소리가 되는 순간 알림은 끄시니까요.
        </p>
      </div>
    </div>
  )
}

export default Log
