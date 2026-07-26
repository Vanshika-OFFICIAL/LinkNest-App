export default function StatsCard({
  title,
  value,
  icon,
  onClick,
  clickable = false,
}) {
  return (
    <div
      onClick={onClick}
      className={`
      rounded-2xl

      border
      border-white/10

      bg-white/[0.04]

      p-3.5
      sm:p-5

      min-h-[88px]
      sm:min-h-[120px]

      transition-all
      duration-300

      hover:border-violet-500/30
      hover:shadow-[0_0_15px_rgba(139,92,246,0.08)]
      ${
        clickable
          ? `
          cursor-pointer
          hover:border-violet-500/30
          hover:shadow-[0_0_15px_rgba(139,92,246,0.08)]
          hover:-translate-y-1
          `
          : ""
      }
      `}
    >
      <div className="flex items-center gap-2">
  <span className="text-xl sm:text-2xl">
    {icon}
  </span>

  <p
    className="
      text-sm
      font-medium
      text-gray-300
    "
  >
    {title}
  </p>
</div>
      <h2
        className="
        text-2xl
        sm:text-3xl

        font-bold

        mt-1
        sm:mt-2
        "
      >
        {value}
      </h2>
      
    </div>
  );
}
