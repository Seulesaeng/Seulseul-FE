import LongButton from '@/components/button/LongButton'

function CareLimitSheet({ onDismiss, onSubscribe }) {
  return (
    <div className="bg-[#0A0C10]/45 fixed inset-0 z-50 flex items-end justify-center">
      <div className="bg-gray0 w-full max-w-md rounded-t-[20px] px-6 pt-4 pb-8.5">
        <div className="bg-gray30 mx-auto h-1 w-10 rounded-full" />

        <h2 className="text-title3 font-extrabold text-gray90 mt-5 text-center">3개까지는 무료예요</h2>
        <p className="text-body6 text-gray60 mt-2 text-center">
          4개 이상 관리하시려면 슬슬 프로가 필요해요
        </p>

        <div className="mt-6 grid grid-cols-2 gap-2">
          <div className="border-gray30 rounded-xl border py-4 px-3.5">
            <p className="text-body5 text-gray60">무료</p>
            <ul className="text-body6 text-gray60 mt-2.5">
              <li>케어 3개</li>
              <li>사진 분석 월 3회</li>
            </ul>
          </div>
          <div className="border-orange70 bg-orange10 rounded-xl border py-4 px-3.5">
            <p className="text-body5 text-orange70">프로</p>
            <ul className="text-body6 text-orange70 mt-2.5">
              <li>케어 무제한</li>
              <li>분석 무제한</li>
              <li>일정 역산 예약</li>
            </ul>
          </div>
        </div>

        <div className="mt-5 text-center">
          <p className="text-title2 font-extrabold text-gray90">
            ₩4,900<span className="text-body6 text-gray60"> /월</span>
          </p>
          <p className="text-caption2 text-gray60 mt-1.5">첫 7일 무료 · 언제든 해지</p>
        </div>

        <div className="mt-5">
          <LongButton onClick={onSubscribe}>7일 무료로 체험하기</LongButton>
        </div>

        <button
          type="button"
          className="text-body2 text-gray60 mt-4 w-full text-center"
          onClick={onDismiss}
        >
          3개만 쓸게요
        </button>
      </div>
    </div>
  )
}

export default CareLimitSheet
