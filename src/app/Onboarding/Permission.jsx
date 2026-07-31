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
    description: '손톱·머리·눈가가 나온 사진만 골라\n상태 변화를 읽어요',
  },
  {
    key: 'calendar',
    Icon: IcCalendar,
    title: 'Google 캘린더 연동',
    description: '일정을 읽어 미리 받도록 계산하고\n예약을 캘린더에 바로 넣어드려요',
  },
]

function Permission() {
  const navigate = useNavigate()

  return (
    <div className="flex min-h-screen flex-col px-6 pt-9 pb-8">
      <h1 className="text-title2 text-gray90">슬슬이 대신 지켜볼게요</h1>
      <p className="text-body4 text-gray60">
        두 가지만 허락해 주시면, 그 다음부터는\n화연님이 아무것도 안 하셔도 돼요
      </p>

      <div className="mt-8 flex flex-col gap-2">
        {PERMISSIONS.map(({ key, Icon, title, description }) => (
          <div
            key={key}
            className="border-orange50 flex items-center gap-3.5 rounded-xl border p-5"
          >
            <Icon className="text-orange50 h-6 w-6" />
            <div className="flex-1">
              <p className="text-body1 text-gray90">{title}</p>
              <p className="text-caption2 text-gray60 mt-1">{description}</p>
            </div>
            <IcRoundedCheck className="text-orange50 h-6 w-6 shrink-0" />
          </div>
        ))}
      </div>

      <div className="mt-7 px-4">
        <p className="text-caption2 text-gray60">
          <span className="font-bold">사진은 기기 밖으로 나가지 않아요.</span> 분석은 온디바이스에서 이뤄지고, 서버에는 "네일 2.8mm 8월 1일" 같은 숫자만 저장돼요. 원본도, 얼굴도 올라가지 않습니다.
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
