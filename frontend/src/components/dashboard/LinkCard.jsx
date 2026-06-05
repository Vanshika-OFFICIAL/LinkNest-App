"use client";

export default function LinkCard({
  link,

  showCollection = true,

  showFavorite = false,

  showArchived = false,

  onFavorite,

  onArchive,

  onDelete,

  onEdit,
}) {
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

      p-6

      hover:border-violet-500/40
      hover:shadow-[0_0_30px_rgba(139,92,246,0.12)]

      transition-all
      duration-300
      "
    >
      {/* HEADER */}

      <div className="flex justify-between items-start gap-4">
        <div className="flex-1">
          <h3
            className="
            text-xl
            font-bold
            text-white
            "
          >
            {link.title}
          </h3>

          <a
            href={link.url}
            target="_blank"
            rel="noreferrer"
            className="
            text-violet-400
            hover:text-violet-300
            break-all
            mt-2
            block

            transition
            "
          >
            {link.url} ↗
          </a>

          {link.description && (
            <p className="text-gray-400 mt-3">
              {link.description}
            </p>
          )}

          {/* TAGS */}

          {link.tags?.length > 0 && (
            <div className="flex gap-2 flex-wrap mt-4">
              {link.tags.map((tag) => (
                <span
                  key={tag}
                  className="
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
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* STATUS */}

        <div className="flex gap-2">
          {showFavorite && (
            <div
              className="
              h-10
              w-10

              rounded-xl

              bg-yellow-500/10

              flex
              items-center
              justify-center

              text-yellow-400
              "
            >
              ⭐
            </div>
          )}

          {showArchived && (
            <span
              className="
              px-4
              py-2

              rounded-xl

              bg-orange-500/10
              border
              border-orange-500/20

              text-orange-300
              text-xs
              font-medium
              "
            >
              Archived
            </span>
          )}
        </div>
      </div>

      {/* FOOTER */}

      <div
        className="
        mt-6
        pt-4

        border-t
        border-white/10
        "
      >
        <div className="flex justify-between items-center">
          <div>
            {showCollection && (
              <div
                className="
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
                📁{" "}
                {link.collectionId?.name ||
                  "No Collection"}
              </div>
            )}

            <p className="text-xs text-gray-500 mt-3">
              {new Date(
                link.createdAt
              ).toLocaleDateString()}
            </p>
          </div>

          {/* ACTIONS */}

          <div className="flex gap-2 flex-wrap">
            {onEdit && (
              <button
                onClick={() =>
                  onEdit(link)
                }
                className="
                px-3
                py-2

                rounded-xl

                bg-blue-500/10
                border
                border-blue-500/20

                text-blue-300
                text-sm

                hover:bg-blue-500/20

                transition
                "
              >
                Edit
              </button>
            )}

            {onFavorite && (
              <button
                onClick={() =>
                  onFavorite(link._id)
                }
                className="
                px-3
                py-2

                rounded-xl

                bg-yellow-500/10
                border
                border-yellow-500/20

                text-yellow-300
                text-sm

                hover:bg-yellow-500/20

                transition
                "
              >
                Favorite
              </button>
            )}

            {onArchive && (
              <button
                onClick={() =>
                  onArchive(link._id)
                }
                className="
                px-3
                py-2

                rounded-xl

                bg-orange-500/10
                border
                border-orange-500/20

                text-orange-300
                text-sm

                hover:bg-orange-500/20

                transition
                "
              >
                Archive
              </button>
            )}

            {onDelete && (
              <button
                onClick={() =>
                  onDelete(link._id)
                }
                className="
                px-3
                py-2

                rounded-xl

                bg-red-500/10
                border
                border-red-500/20

                text-red-300
                text-sm

                hover:bg-red-500/20

                transition
                "
              >
                Delete
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}