function ShortButton({ selected = false, children, className = '', ...props }) {
  return (
    <button
      type="button"
      className={`text-body5 rounded-[8px] px-3.5 py-2 ${
        selected ? 'bg-orange50 text-gray0' : 'bg-gray30 text-gray60'
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export default ShortButton
