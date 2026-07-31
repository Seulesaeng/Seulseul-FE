import { useNavigate } from 'react-router-dom'
import LongButton from '@/components/button/LongButton'
import IcPhoto from '@/assets/icons/ic_photo_24.svg?react'
import IcCalendar from '@/assets/icons/ic_calendar_24.svg?react'
import IcRoundedCheck from '@/assets/icons/ic_rounded_check_24.svg?react'
import IcLock from '@/assets/icons/ic_lock_24.svg?react'

const PERMISSIONS = [
  {
    key: 'photo',
    Icon: IcPhoto,
    title: '사진첩 접근',
    description: '손톱·머리·피부가 담긴 사진만 골라서 볼게요',
  },
  {
    key: 'calendar',
    Icon: IcCalendar,
    title: 'Google 캘린더 연동',
    description: '일정을 읽어 미리 방문을 계산하고 예약을 캘린더에 바로 넣어드려요',
  },
]

function Permission() {
  const navigate = useNavigate()

  return (
    <div className="flex min-h-screen flex-col px-5 pt-16 pb-8">
      <h1 className="text-title2 text-gray90">슬슬이 대신 지켜볼게요</h1>
      <p className="text-caption1 text-gray60 mt-2">
        두 가지만 허락해 주시면, 그 다음부터는 회원님이 아무것도 안 하셔도 돼요
      </p>

      <div className="mt-8 flex flex-col gap-3">
        {PERMISSIONS.map(({ key, Icon, title, description }) => (
          <div
            key={key}
            className="border-gray30 flex items-center gap-3 rounded-2xl border p-4"
          >
            <span className="bg-orange10 text-orange50 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl">
              <Icon className="h-5 w-5" />
            </span>
            <div className="flex-1">
              <p className="text-body3 text-gray90">{title}</p>
              <p className="text-caption2 text-gray60 mt-1">{description}</p>
            </div>
            <IcRoundedCheck className="text-orange50 h-6 w-6 shrink-0" />
          </div>
        ))}
      </div>

      <div className="bg-gray10 mt-4 flex items-start gap-2 rounded-2xl p-4">
        <IcLock className="text-gray60 mt-0.5 h-4 w-4 shrink-0" />
        <p className="text-caption2 text-gray60">
          사진은 기기 밖으로 나가지 않아요. 분석은 기기 안에서 이뤄지고, 서버에는 “네일 ·
          2.8mm · 8월 1일” 같은 숫자만 전송되며, 원본 사진과 날짜는 절대 보내지 않아요.
        </p>
      </div>

      <div className="mt-auto pt-8">
        <LongButton onClick={() => navigate('/onboarding/scanning')}>
          다음으로 예약하기
        </LongButton>
      </div>
    </div>
  )
}

export default Permission
