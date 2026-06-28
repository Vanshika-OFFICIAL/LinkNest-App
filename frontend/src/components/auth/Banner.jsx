import Image from "next/image";

export default function AuthBanner() {
  return (
    <div
      className="
      hidden lg:flex

      relative
      overflow-hidden

      h-full
      w-full

      bg-[linear-gradient(135deg,#050816_0%,#09051F_50%,#130822_100%)]
      "
    >
      {/* Background Glow */}

      <div
        className="
        absolute
        top-[-150px]
        right-[-150px]

        h-[500px]
        w-[500px]

        rounded-full

        bg-violet-500/20

        blur-[180px]
        "
      />

      <div
        className="
        absolute
        bottom-[-200px]
        left-[-150px]

        h-[450px]
        w-[450px]

        rounded-full

        bg-fuchsia-500/10

        blur-[180px]
        "
      />

      <div
        className="
        relative
        z-10

        flex
        flex-col
        justify-center

        w-full

        px-14
        py-12
        "
      >
        {/* Badge */}

        <div>
          <div
            className="
            inline-flex
            items-center
            gap-2

            px-5
            py-2

            rounded-full

            border
            border-white/10

            bg-white/[0.04]

            text-violet-300
            text-sm
            "
          >
            ✦ Personal Knowledge Hub
          </div>
        </div>

        {/* Heading */}

        <div className="mt-10">
          <h1
            className="
            text-5xl

            font-black

            leading-[0.95]

            tracking-tight
            "
          >
            Organize
            
            Everything
            <span className="text-violet-500">.</span>
          </h1>

          <p
            className="
            mt-8

            text-xl

            text-gray-400

            max-w-xl

            leading-relaxed
            "
          >
            Save tutorials, documentation,
            courses, articles and resources
            in one beautifully organized
            workspace.
          </p>

        </div>

        {/* Dashboard Preview */}

        <div
          className="
          mt-4

          relative

          overflow-hidden

          rounded-[32px]

          border
          border-white/10

          bg-[#0B1020]

          shadow-[0_0_100px_rgba(168,85,247,0.20)]
          "
        >
          <Image
            src="/dashboard-preview.png"
            alt="LinkNest Dashboard"
            width={1600}
            height={1000}
            className="
            w-full
            h-auto

            object-cover
            "
            priority
          />

          <div
            className="
            absolute
            inset-0

            bg-gradient-to-t
            from-[#050816]
            via-transparent
            to-transparent
            "
          />
        </div>
      </div>
    </div>
  );
}