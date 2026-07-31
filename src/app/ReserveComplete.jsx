import { useLocation, useNavigate } from 'react-router-dom'
import LongButton from '@/components/button/LongButton'
import IcCheck from '@/assets/icons/ic_check_bold_24.svg?react'
import IcCircle from '@/assets/icons/ic_circle_24.svg?react'

const DEFAULT_CANDIDATE = {
  shop: '프리즘네일 홍대',
  datetime: '8월 12일 (수) 19:00',
  service: '젤네일',
  price: '45,000원',
}

function ReserveComplete() {
  const navigate = useNavigate()
  const location = useLocation()
  const candidate = location.state?.candidate ?? DEFAULT_CANDIDATE

  return (
    <div className="flex min-h-screen flex-col px-5 pt-24 pb-8">
      <div className="flex flex-col items-center">
        <span className="bg-orange50 flex h-16 w-16 items-center justify-center rounded-full">
          <IcCheck className="text-gray0 h-7 w-7" />
        </span>
        <h1 className="text-title2 text-gray90 mt-4">예약됐어요!</h1>
      </div>

      <div className="border-gray30 mt-8 rounded-2xl border p-4">
        <p className="text-body3 text-gray90">{candidate.shop}</p>
        <p className="text-caption2 text-gray60 mt-1">{candidate.datetime}</p>
        <p className="text-caption2 text-gray60 mt-0.5">
          {candidate.service} · {candidate.price}
        </p>

        <div className="border-gray20 my-3 border-t" />

        <p className="text-caption2 text-gray90 flex items-center gap-1.5">
          <IcCheck className="text-gray70 h-3.5 w-3.5 shrink-0" />
          Google 캘린더에 추가했어요
        </p>
        <p className="text-caption2 text-gray90 mt-1.5 flex items-center gap-1.5">
          <IcCheck className="text-gray70 h-3.5 w-3.5 shrink-0" />
          하루 전에 다시 알려드릴게요
        </p>
      </div>

      <div className="bg-orange10 mt-3 rounded-2xl p-4">
        <p className="text-caption3 text-gray70 flex items-center gap-1.5 font-semibold">
          <IcCircle className="h-3.5 w-3.5" />
          그날까지 계속 지켜볼게요
        </p>
        <p className="text-caption2 text-gray60 mt-2">
          일정이 바뀌거나 사진에서 변화가 보이면 먼저 말씀드릴게요.
        </p>
      </div>

      <div className="mt-auto pt-8">
        <LongButton onClick={() => navigate('/home')}>홈으로</LongButton>
      </div>
    </div>
  )
}

export default ReserveComplete
