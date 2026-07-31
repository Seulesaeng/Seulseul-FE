// err: { code, message } 형태 (src/lib/axios.js 인터셉터가 정규화해서 던짐)
function ErrorBanner({ error, onRetry, className = '' }) {
  if (!error) return null

  return (
    <div className={`bg-orange10 border-orange50 rounded-2xl border p-4 text-center ${className}`}>
      <p className="text-caption2 text-orange70">{error.message}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="text-caption3 text-orange50 mt-2 font-bold underline"
        >
          다시 시도
        </button>
      )}
    </div>
  )
}

export default ErrorBanner
