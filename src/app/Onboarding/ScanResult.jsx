import { useNavigate } from 'react-router-dom'
import LongButton from '@/components/button/LongButton'
import IcNail from '@/assets/icons/ic_nail_24.svg?react'
import IcDye from '@/assets/icons/ic_dye_24.svg?react'
import IcLash from '@/assets/icons/ic_lash_24.svg?react'
import IcRoundedCheck from '@/assets/icons/ic_rounded_check_24.svg?react'

const FOUND_CARES = [
  {
    key: 'nail',
    Icon: IcNail,
    title: '네일',
    description: '가장 최근 네일 상태를 찾았어요 · 8월 9일 사진',
  },
  {
    key: 'dye',
    Icon: IcDye,
    title: '뿌리염색',
    description: '가장 최근 머리 길이를 찾았어요 · 8월 7일 사진',
  },
]

function ScanResult() {
  const navigate = useNavigate()

  return (
    <div className="flex min-h-screen flex-col px-6 pt-8 pb-10.5">
      <h1 className="text-title2 text-gray90">사진첩에서 이만큼 찾았어요</h1>
      <p className="text-body4 text-gray60 mt-0.5">못 찾은 건 직접 알려주시면 돼요</p>

      <section className="mt-8">
        <h2 className="text-body5 text-gray60 mb-2">사진에서 찾았어요</h2>
        <div className="flex flex-col gap-2">
          {FOUND_CARES.map(({ key, Icon, title, description }) => (
            <div
              key={key}
              className="flex items-center gap-3.5 px-4 py-3.5"
            >
              <Icon className="h-6 w-6 text-orange50" />
            
              <div className="flex-1">
                <p className="text-body1 text-gray90">{title}</p>
                <p className="text-body6 font-normal text-gray60 mt-1">{description}</p>
              </div>
              <IcRoundedCheck className="text-orange50 h-6 w-6 shrink-0" />
            </div>
          ))}
        </div>
      </section>

      <section className="mt-6">
        <h2 className="text-body5 text-gray60">직접 알려주세요</h2>
        <div className="border-orange50 rounded-xl border px-4 pt-5.5 pb-3.5">
          <div className="flex items-center gap-3.5">
           <IcLash className="h-6 w-6 text-gray50" />
           
            <div className="flex-1">
              <p className="text-body1 text-gray90">속눈썹펌</p>
              <p className="text-caption2 text-gray60 mt-1">사진에서는 확인이 어려웠어요</p>
            </div>
          </div>
          <div className="mt-3.5 flex gap-2">
            <button
              type="button"
              className="border-gray30 text-gray70 text-body6 font-bold flex-1 rounded-lg border py-2.5"
            >
              마지막 시술일 선택
            </button>
            <button
              type="button"
              className="border-gray30 text-gray60 text-body6 rounded-lg border py-2.5 px-6"
            >
              기억 안나요
            </button>
          </div>
        </div>
      </section>

      <div className="mt-auto pt-8">
        <LongButton onClick={() => navigate('/home')}>시작하기</LongButton>
      </div>
    </div>
  )
}

export default ScanResult
