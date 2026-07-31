import { createContext, useContext, useMemo, useState } from 'react'

const FlowContext = createContext(null)

const initialState = {
  albumId: null,
  analysisId: null,
  analysis: null, // AnalyzeResponse
  schedule: null, // ScheduleResponse | RetryResponse
  selectedCandidate: null, // Candidate
  confirmation: null, // ConfirmResponse
}

// albumId -> analysisId -> candidateId로 이어지는 API 계약의 ID 체이닝을
// 화면 간에 들고 다니기 위한 단일 컨텍스트. 데모/단일 사용자 MVP라
// 새로고침 시 초기화되는 걸 감수하고 별도 영속화는 하지 않는다.
export function FlowProvider({ children }) {
  const [state, setState] = useState(initialState)

  const value = useMemo(
    () => ({
      ...state,
      patch: (partial) => setState((prev) => ({ ...prev, ...partial })),
      reset: () => setState(initialState),
    }),
    [state],
  )

  return <FlowContext.Provider value={value}>{children}</FlowContext.Provider>
}

export function useFlow() {
  const ctx = useContext(FlowContext)
  if (!ctx) throw new Error('useFlow는 FlowProvider 내부에서만 사용할 수 있습니다.')
  return ctx
}
