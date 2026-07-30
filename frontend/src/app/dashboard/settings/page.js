"use client";

import Link from "next/link";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
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
        md:p-6
      "
      >
        <p className="uppercase tracking-widest text-violet-400 text-sm">
          Account Settings
        </p>

        <h1 className="mt-2 text-3xl font-bold md:text-4xl">
          Settings ⚙️
        </h1>

        <p className="mt-2 text-gray-400">
          Manage application preferences and support options.
        </p>
      </div>

      {/* SUPPORT */}

      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-4">
        <h2 className="mb-4 text-xl font-semibold">Support</h2>

        <div className="grid gap-4">
          <button
            className="
            flex
            items-center
            justify-between
            rounded-2xl
            border
            border-white/10
            p-3
          "
          >
            <span>Contact Support</span>

            <span className="text-violet-400">→</span>
          </button>

          <button
            className="
            flex
            items-center
            justify-between
            rounded-2xl
            border
            border-white/10
            p-3
          "
          >
            <span>Feature Requests</span>

            <span className="text-violet-400">→</span>
          </button>
        </div>
      </div>

      {/* LEGAL */}

      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-4">
        <h2 className="mb-3 text-xl font-semibold">Legal</h2>

        <div className="grid gap-4">
          <Link
            href="/dashboard/settings/privacy-policy"
            className="
            flex
            items-center
            justify-between
            rounded-2xl
            border
            border-white/10
            p-4
            transition
            hover:border-violet-500/40
            hover:bg-white/[0.02]
          "
          >
            <span>Privacy Policy</span>

            <span className="text-sm text-violet-400">↗</span>
          </Link>

          <Link
            href="/dashboard/settings/terms"
            className="
            flex
            items-center
            justify-between
            rounded-2xl
            border
            border-white/10
            p-4
            transition
            hover:border-violet-500/40
            hover:bg-white/[0.02]
          "
          >
            <span>Terms & Conditions</span>

            <span className="text-sm text-violet-400">↗</span>
          </Link>
        </div>
      </div>
    </div>
  );
}