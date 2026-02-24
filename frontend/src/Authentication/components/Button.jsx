export const Button = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}) => {
  const base =
    "font-bold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 outline-none cursor-pointer";

  const variants = {
    primary:
      "bg-teal-600 text-white hover:bg-teal-700 active:scale-95 shadow disabled:opacity-50 disabled:cursor-not-allowed",
    secondary: "bg-gray-100 text-gray-800 hover:bg-gray-200 active:scale-95",
    outline:
      "border-2 border-gray-300 text-gray-800 hover:border-gray-400 active:scale-95",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-2.5 text-base",
    lg: "px-8 py-3.5 text-base",
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};