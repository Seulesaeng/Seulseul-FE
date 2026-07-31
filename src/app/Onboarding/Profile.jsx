import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ShortButton from '@/components/button/ShortButton'
import LongButton from '@/components/button/LongButton'

const GENDER_OPTIONS = ['여성', '남성', '선택하지 않음']
const AGE_OPTIONS = ['10대', '20대', '30대', '40대', '50대', '60대 이상']

function Profile() {
  const navigate = useNavigate()
  const [gender, setGender] = useState(null)
  const [ageGroup, setAgeGroup] = useState(null)

  const isValid = Boolean(gender) && Boolean(ageGroup)

  return (
    <div className="flex min-h-screen flex-col justify-between px-6 pt-8 pb-10.5">
      <div>
        <h1 className="text-title2 text-gray90">먼저 간단히 알려주세요</h1>
        <p className="text-body4 text-gray60">관리 주기를 더 정확하게 잡는 데 써요</p>

        <section className="mt-11">
          <h2 className="text-body1 text-gray90 mb-2.5">성별</h2>
          <div className="flex gap-1.5">
            {GENDER_OPTIONS.map((option) => (
              <ShortButton
                key={option}
                selected={gender === option}
                onClick={() => setGender(option)}
              >
                {option}
              </ShortButton>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-body1 text-gray90 mb-2.5">나이대</h2>
          <div className="flex flex-wrap gap-1.5">
            {AGE_OPTIONS.map((option) => (
              <ShortButton
                key={option}
                selected={ageGroup === option}
                onClick={() => setAgeGroup(option)}
              >
                {option}
              </ShortButton>
            ))}
          </div>
        </section>
      </div>

      <LongButton disabled={!isValid} onClick={() => navigate('/onboarding/care-select')}>
        다음
      </LongButton>
    </div>
  )
}

export default Profile
