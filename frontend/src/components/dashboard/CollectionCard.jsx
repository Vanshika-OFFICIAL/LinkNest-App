import Link from "next/link";

export default function CollectionCard({
  collection,
}) {
  return (
    <Link
      href={`/dashboard/collections/${collection._id}`}
    >
      <div
        className="
        rounded-2xl
        border border-white/10
        bg-white/[0.03]
        p-5

        hover:border-violet-500/30
        hover:-translate-y-1

        transition
      "
      >
        <div className="text-4xl mb-4">
          📁
        </div>

        <h3 className="font-semibold">
          {collection.name}
        </h3>

        <p className="text-xs text-gray-500 mt-3">
          {new Date(
            collection.createdAt
          ).toLocaleDateString()}
        </p>
      </div>
    </Link>
  );
}