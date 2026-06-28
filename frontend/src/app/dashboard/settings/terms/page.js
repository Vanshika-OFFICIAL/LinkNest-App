import Link from "next/link";
export default function TermsPage() {
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
          Terms & Conditions 📜
        </h1>

        <p className="text-gray-400 mt-3">
          Rules and guidelines for using LinkNest.
        </p>
      </div>

      {/* CONTENT */}

      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 md:p-8 space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-3">
            Acceptance of Terms
          </h2>

          <p className="text-gray-400">
            By accessing or using LinkNest, you agree to
            comply with these Terms and Conditions.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3">
            User Accounts
          </h2>

          <p className="text-gray-400">
            Users are responsible for maintaining the
            confidentiality of their account credentials.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3">
            Acceptable Use
          </h2>

          <p className="text-gray-400">
            Users must not use LinkNest for illegal,
            harmful or unauthorized activities.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3">
            Intellectual Property
          </h2>

          <p className="text-gray-400">
            The LinkNest platform, branding and content are
            protected by applicable intellectual property
            laws.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3">
            Service Availability
          </h2>

          <p className="text-gray-400">
            We strive to keep the platform available but
            do not guarantee uninterrupted service.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3">
            Limitation of Liability
          </h2>

          <p className="text-gray-400">
            LinkNest shall not be liable for any indirect,
            incidental or consequential damages arising
            from the use of the platform.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3">
            Changes to Terms
          </h2>

          <p className="text-gray-400">
            We reserve the right to modify these terms at
            any time. Continued use of the platform
            indicates acceptance of updated terms.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3">
            Contact
          </h2>

          <p className="text-gray-400">
            Questions regarding these terms may be sent to:
          </p>

          <p className="text-violet-400 mt-2">
            coming soon
          </p>
        </section>
      </div>
    </div>
  );
}