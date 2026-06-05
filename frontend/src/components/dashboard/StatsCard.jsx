export default function StatsCard({
  title,
  value,
  icon,
}) {
  return (
    <div
      className="
      rounded-2xl
      border border-white/10
      bg-white/[0.04]
      p-6
    "
    >
      <div className="text-3xl mb-3">
        {icon}
      </div>

      <p className="text-gray-400">
        {title}
      </p>

      <h2 className="text-4xl font-bold mt-2">
        {value}
      </h2>
    </div>
  );
}