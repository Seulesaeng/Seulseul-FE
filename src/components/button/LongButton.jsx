function LongButton({ disabled = false, children, className = '', ...props }) {
  return (
    <button
      type="button"
      disabled={disabled}
      className={`text-body1 leading-[-0.32px] w-full rounded-xl px-5 py-3 text-center ${
        disabled ? 'bg-gray30 text-gray60' : 'bg-orange50 text-gray0'
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export default LongButton
