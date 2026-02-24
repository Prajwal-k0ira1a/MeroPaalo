export const Input = ({
  label,
  error,
  icon: Icon,
  className = "",
  ...props
}) => (
  <div className="w-full">
    {label && (
      <label className="block text-sm font-semibold text-gray-800 mb-2">
        {label}
      </label>
    )}

    <div className="relative">
      {Icon && (
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
          <Icon size={18} strokeWidth={1.5} />
        </div>
      )}
      <input
        className={`
          w-full py-3 px-4 ${Icon ? "pl-11" : ""}
          border-2 rounded-xl text-gray-900 placeholder-gray-400 text-sm
          border-gray-200 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100
          transition-all duration-200
          ${error ? "border-red-400 focus:ring-red-100 focus:border-red-400" : ""}
          ${className}
        `}
        {...props}
      />
    </div>

    {error && (
      <p className="text-red-500 text-xs mt-1.5 font-medium">{error}</p>
    )}
  </div>
);
