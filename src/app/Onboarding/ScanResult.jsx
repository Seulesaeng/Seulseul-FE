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
    <div className="flex min-h-screen flex-col px-5 pt-16 pb-8">
      <h1 className="text-title2 text-gray90">사진첩에서 이만큼 찾았어요</h1>
      <p className="text-caption1 text-gray60 mt-2">못 찾은 건 직접 알려주시면 돼요</p>

      <section className="mt-8">
        <h2 className="text-body3 text-gray90 mb-3">사진에서 찾았어요</h2>
        <div className="flex flex-col gap-3">
          {FOUND_CARES.map(({ key, Icon, title, description }) => (
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
      </section>

      <section className="mt-6">
        <h2 className="text-body3 text-gray90 mb-3">직접 알려주세요</h2>
        <div className="border-orange50 rounded-2xl border p-4">
          <div className="flex items-center gap-3">
            <span className="bg-orange10 text-orange50 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl">
              <IcLash className="h-5 w-5" />
            </span>
            <div className="flex-1">
              <p className="text-body3 text-gray90">속눈썹펌</p>
              <p className="text-caption2 text-gray60 mt-1">사진에서는 확인이 어려워요</p>
            </div>
          </div>
          <div className="mt-3 flex gap-2">
            <button
              type="button"
              className="border-gray30 text-gray70 text-body6 flex-1 rounded-xl border py-2.5"
            >
              마지막 시술일 선택
            </button>
            <button
              type="button"
              className="border-gray30 text-gray70 text-body6 flex-1 rounded-xl border py-2.5"
            >
              기억 안나요
            </button>
          </div>
        </div>
      </section>

      <div className="mt-auto pt-8">
        <LongButton onClick={() => navigate('/')}>시작하기</LongButton>
      </div>
    </div>
  )
}

export default ScanResult
