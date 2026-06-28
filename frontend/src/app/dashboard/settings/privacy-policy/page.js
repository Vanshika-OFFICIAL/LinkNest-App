import Link from "next/link";
export default function PrivacyPolicyPage() {
  return (
    <div className="space-y-8">
      {/* HERO */}

      <div
        className="
        rounded-3xl
        border
        border-white/10

        bg-gradient-to-r
        from-white/[0.04]
        via-violet-500/[0.04]
        to-white/[0.02]

        p-5
        md:p-8
      "
      >
        <Link
  href="/dashboard/settings"
  className="
  md:hidden

  mb-6

  h-11
  w-11

  rounded-xl

  border
  border-white/10

  flex
  items-center
  justify-center

  hover:bg-white/5

  transition
  "
>
  ←
</Link>
        <h1 className="text-3xl md:text-5xl font-bold mt-3">
          Privacy Policy 🔒
        </h1>

        <p className="text-gray-400 mt-3">
          Learn how LinkNest collects, stores and protects your data.
        </p>
      </div>

      {/* CONTENT */}

      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 md:p-8 space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-3">Information We Collect</h2>

          <p className="text-gray-400">
            LinkNest may collect your name, email address, account information,
            collections, resources, favorites and archived links.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3">
            How We Use Your Information
          </h2>

          <p className="text-gray-400">
            Your information is used to provide account functionality, save
            resources, improve user experience and maintain platform security.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3">Data Storage</h2>

          <p className="text-gray-400">
            Your data is securely stored in our databases and protected using
            industry standard security practices.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3">Third Party Services</h2>

          <p className="text-gray-400">
            LinkNest may use third-party services such as hosting providers,
            databases and analytics tools to operate the platform.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3">Data Deletion</h2>

          <p className="text-gray-400">
            Users may request deletion of their account and associated data by
            contacting support.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3">Contact</h2>

          <p className="text-gray-400">
            For privacy-related concerns, contact:
          </p>

          <p className="text-violet-400 mt-2">coming soon</p>
        </section>
      </div>
    </div>
  );
}
