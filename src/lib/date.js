// API 계약상 모든 날짜/시간 문자열은 Asia/Seoul(+09:00) 기준으로 고정되어 있으므로,
// Date 객체로 파싱해 로컬 타임존에 의존하기보다 문자열을 직접 잘라서 포맷한다.

export function formatMonthDay(dateOrIso) {
  const [, month, day] = dateOrIso.slice(0, 10).split('-')
  return `${Number(month)}월 ${Number(day)}일`
}

export function formatShortDate(dateOrIso) {
  const [, month, day] = dateOrIso.slice(0, 10).split('-')
  return `${Number(month)}/${Number(day)}`
}

export function formatDateRangeShort(startStr, endStr) {
  const [, startMonth, startDay] = startStr.slice(0, 10).split('-')
  const [, endMonth, endDay] = endStr.slice(0, 10).split('-')
  if (startMonth === endMonth) {
    return `${Number(startMonth)}/${Number(startDay)}~${Number(endDay)}`
  }
  return `${formatShortDate(startStr)}~${formatShortDate(endStr)}`
}

export function formatTime(iso) {
  return iso.slice(11, 16)
}

const WEEKDAY_KR = ['일', '월', '화', '수', '목', '금', '토']

export function formatDateTimeKR(iso) {
  const [datePart, timePart] = iso.split('T')
  const [year, month, day] = datePart.split('-').map(Number)
  const time = timePart.slice(0, 5)
  // 요일 계산은 브라우저 타임존 영향을 받지 않도록 날짜만 UTC 기준으로 넣어 구한다.
  const weekday = WEEKDAY_KR[new Date(Date.UTC(year, month - 1, day)).getUTCDay()]
  return `${month}/${day} (${weekday}) ${time}`
}
