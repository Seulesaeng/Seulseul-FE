import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LongButton from '@/components/button/LongButton'
import CareLimitSheet from './CareLimitSheet'
import IcBack from '@/assets/icons/ic_back_24.svg?react'
import IcNail from '@/assets/icons/ic_nail_24.svg?react'
import IcPedi from '@/assets/icons/ic_pedi_24.svg?react'
import IcLash from '@/assets/icons/ic_lash_24.svg?react'
import IcBrow from '@/assets/icons/ic_brow_24.svg?react'
import IcWaxing from '@/assets/icons/ic_waxing_24.svg?react'
import IcDye from '@/assets/icons/ic_dye_24.svg?react'
import IcCut from '@/assets/icons/ic_cut_24.svg?react'
import IcSkin from '@/assets/icons/ic_skin_24.svg?react'
import IcMassage from '@/assets/icons/ic_massage_24.svg?react'
import IcAdd from '@/assets/icons/ic_add_24.svg?react'

const FREE_LIMIT = 3

const CARE_OPTIONS = [
  { key: 'nail', label: '네일', Icon: IcNail },
  { key: 'pedi', label: '페디', Icon: IcPedi },
  { key: 'lash', label: '속눈썹', Icon: IcLash },
  { key: 'brow', label: '눈썹', Icon: IcBrow },
  { key: 'waxing', label: '왁싱', Icon: IcWaxing },
  { key: 'dye', label: '염색', Icon: IcDye },
  { key: 'hair', label: '헤어', Icon: IcCut },
  { key: 'skin', label: '피부', Icon: IcSkin },
  { key: 'massage', label: '경락', Icon: IcMassage },
]

function CareSelect() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState([])
  const [showLimitSheet, setShowLimitSheet] = useState(false)

  const toggleCare = (key) => {
    setSelected((prev) => {
      if (prev.includes(key)) return prev.filter((item) => item !== key)
      if (prev.length >= FREE_LIMIT) {
        setShowLimitSheet(true)
        return prev
      }
      return [...prev, key]
    })
  }

  return (
    <div className="flex min-h-screen flex-col px-6 pt-9 pb-8">
      <h1 className="text-title2 text-gray90">어떤 관리를 받고 계세요?</h1>
      <p className="text-body4 text-gray60">받고 계신 걸 모두 골라주세요</p>

      <div className="mt-9.5 grid grid-cols-5 gap-x-1.5 gap-y-3">
        {CARE_OPTIONS.map(({ key, label, Icon }) => {
          const isSelected = selected.includes(key)
          return (
            <button
              key={key}
              type="button"
              onClick={() => toggleCare(key)}
              className="flex flex-col items-center gap-2"
            >
              <span
                className={`flex h-16.5 w-16.5 items-center justify-center rounded-[14px] border ${
                  isSelected
                    ? 'bg-orange10 border-orange50 text-orange50'
                    : 'bg-gray10 border-transparent text-gray60'
                }`}
              >
                <Icon className="h-7 w-7" />
              </span>
              <span className={`text-body6 ${isSelected ? 'text-orange50' : 'text-gray60'}`}>
                {label}
              </span>
            </button>
          )
        })}

        <button type="button" className="flex flex-col items-center gap-2">
          <span className="bg-gray10 text-gray60 flex h-16.5 w-16.5 items-center justify-center rounded-[14px]">
            <IcAdd className="h-7 w-7" />
          </span>
          <span className="text-body6 text-gray60">직접추가</span>
        </button>
      </div>

      <p className="text-body6 text-gray60 mt-6.5 text-center">
        <span className="text-orange50 font-bold">{selected.length}</span>개 선택 · 무료는 {FREE_LIMIT}
        개까지
      </p>

      <div className="mt-auto pt-8">
        <LongButton
          disabled={selected.length === 0}
          onClick={() => navigate('/onboarding/permission')}
        >
          다음
        </LongButton>
      </div>

      {showLimitSheet && (
        <CareLimitSheet
          onDismiss={() => setShowLimitSheet(false)}
          onSubscribe={() => setShowLimitSheet(false)}
        />
      )}
    </div>
  )
}

export default CareSelect
