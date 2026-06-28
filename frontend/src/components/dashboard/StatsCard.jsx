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

      p-4
      sm:p-5

      min-h-[110px]
      sm:min-h-[130px]

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
      <div
        className="
        text-2xl
        sm:text-3xl

        mb-2
        "
      >
        {icon}
      </div>

      <p
        className="
        text-gray-400

        text-sm
        sm:text-base
        "
      >
        {title}
      </p>

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
