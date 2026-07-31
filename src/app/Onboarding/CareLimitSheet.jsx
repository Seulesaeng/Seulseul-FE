import LongButton from '@/components/button/LongButton'

function CareLimitSheet({ onDismiss, onSubscribe }) {
  return (
    <div className="bg-gray100/50 fixed inset-0 z-50 flex items-end justify-center">
      <div className="bg-gray0 w-full max-w-md rounded-t-3xl px-5 pt-3 pb-8">
        <div className="bg-gray30 mx-auto h-1 w-10 rounded-full" />

        <h2 className="text-title3 text-gray90 mt-5 text-center">3개까지는 무료예요</h2>
        <p className="text-caption1 text-gray60 mt-1 text-center">
          4개 이상 관리하시려면 슬슬 프로가 필요해요
        </p>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <div className="border-gray30 rounded-2xl border p-4">
            <p className="text-body3 text-gray90">무료</p>
            <ul className="text-caption2 text-gray60 mt-2 space-y-1">
              <li>케어 3개</li>
              <li>사진 분석 월 3회</li>
            </ul>
          </div>
          <div className="border-orange50 bg-orange10 rounded-2xl border-2 p-4">
            <p className="text-body3 text-orange50">프로</p>
            <ul className="text-caption2 text-orange50 mt-2 space-y-1">
              <li>케어 무제한</li>
              <li>분석 무제한</li>
              <li>일정 역산 예약</li>
            </ul>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-title2 text-gray90">
            ₩4,900<span className="text-body3 text-gray60"> /월</span>
          </p>
          <p className="text-caption2 text-gray60 mt-1">첫 7일 무료 · 언제든 해지</p>
        </div>

        <div className="mt-6">
          <LongButton onClick={onSubscribe}>7일 무료로 체험하기</LongButton>
        </div>

        <button
          type="button"
          className="text-body4 text-gray60 mt-4 w-full text-center"
          onClick={onDismiss}
        >
          3개만 쓸게요
        </button>
      </div>
    </div>
  )
}

export default CareLimitSheet
