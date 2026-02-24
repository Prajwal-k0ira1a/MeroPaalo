export default function Avatar({ initials }) {
  return (
    <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600 shrink-0">
      {initials}
    </div>
  );
}
