"use client";

import Link from "next/link";

export default function CollectionCard({ collection, onEdit, onDelete }) {
  return (
    <div
      className="
      group

      rounded-3xl

      border
      border-white/10

      bg-gradient-to-br
      from-white/[0.03]
      via-violet-500/[0.02]
      to-white/[0.02]

      backdrop-blur-xl

      p-5 md:p-6

      hover:border-violet-500/40
      hover:-translate-y-1

      transition-all
      duration-300
    "
    >
      <Link href={`/dashboard/collections/${collection._id}`}>
        <div>
         <div className="flex items-center justify-between gap-3">
  {/* Left Side */}
  <div className="flex items-center gap-3 min-w-0 flex-1">
    <div className="text-3xl md:text-4xl flex-shrink-0">
      📁
    </div>

    <h3
      className="
        flex-1
        min-w-0

        text-lg
        md:text-xl

        font-bold

        truncate

        group-hover:text-violet-400
        transition
      "
    >
      {collection.name}
    </h3>
  </div>

  {/* Arrow */}
  <span
    className="
      flex-shrink-0

      text-violet-400
      text-lg
      md:text-xl

      opacity-100
      md:opacity-0

      group-hover:opacity-100

      transition
    "
  >
    →
  </span>
</div>
          <p className="text-gray-500 text-sm 2 py-2">
            Created {new Date(collection.createdAt).toLocaleDateString()}
          </p>

          {collection.linksCount !== undefined && (
            <div
              className="
              mt-3

              inline-flex
              items-center

              gap-2

              px-3
              py-1

              rounded-full

              bg-violet-500/10
              border
              border-violet-500/20

              text-violet-300
              text-xs
            "
            >
              🔗 {collection.linksCount} Links
            </div>
          )}
        </div>
      </Link>

      {(onEdit || onDelete) && (
        <div
          className="
          
          pt-3

          border-t
          border-white/10

          flex
          gap-2
        "
        >
          {onEdit && (
            <button
              onClick={() => onEdit(collection)}
              className="
              flex-1

              py-2 min-h-[44px]

              rounded-xl

              bg-blue-500/10
              border
              border-blue-500/20

              text-blue-300

              hover:bg-blue-500/20

              transition
            "
            >
              Edit
            </button>
          )}

          {onDelete && (
            <button
              onClick={() => onDelete(collection._id)}
              className="
              flex-1

              py-2

              rounded-xl

              bg-red-500/10
              border
              border-red-500/20

              text-red-300

              hover:bg-red-500/20

              transition
            "
            >
              Delete
            </button>
          )}
        </div>
      )}
    </div>
  );
}
