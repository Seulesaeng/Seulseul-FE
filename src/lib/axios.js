import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
})

// 모든 에러를 { code, message, detail, status } 형태로 통일해서 던진다.
// 컴포넌트는 err.response?.data 같은 axios 세부 구조를 몰라도 됨.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const data = error.response?.data
    return Promise.reject({
      status: error.response?.status ?? null,
      code: data?.code ?? 'NETWORK_ERROR',
      message: data?.message ?? '네트워크 오류가 발생했어요. 잠시 후 다시 시도해주세요.',
      detail: data?.detail ?? null,
    })
  },
)

export default api
