"use client";

import { useState } from "react";
import Link from "next/link";

import { logoutUser } from "@/services/authService";

export default function SettingsPage() {
  const [showLogoutModal, setShowLogoutModal] =
    useState(false);
const [openFaq, setOpenFaq] = useState(null);//faq
  const handleLogout = async () => {
    try {
      await logoutUser();

      localStorage.removeItem("token");

      window.location.href = "/login";
    } catch (error) {
      console.error(error);
    }
  };
const faqs = [
  {
    question: "How do collections work?",
    answer:
      "Collections help organize resources into categories such as Frontend, Backend, DSA and Interview Prep."
  },
  {
    question: "Can I archive links?",
    answer:
      "Yes. Archived links are moved to the Archive section and can be restored anytime."
  },
  {
    question: "Can I restore archived links?",
    answer:
      "Yes. Open the Archive page and click Unarchive."
  },
  {
    question: "Can I edit saved links?",
    answer:
      "Yes. Open the resource card and use the Edit option."
  },
  {
    question: "Is my data secure?",
    answer:
      "Your resources are protected using account authentication."
  }
];
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
        <p className="uppercase tracking-widest text-violet-400 text-sm">
          Account Settings
        </p>

        <h1 className="text-3xl md:text-5xl font-bold mt-3">
          Settings ⚙️
        </h1>

        <p className="text-gray-400 mt-3">
          Manage application preferences and support options.
        </p>
      </div>

      {/* APPEARANCE */}

      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
        <h2 className="text-xl font-semibold mb-4">
          Appearance
        </h2>

        <div
          className="
          flex
          items-center
          justify-between

          rounded-2xl
          border
          border-white/10

          p-4
          "
        >
          <div>
            <p className="font-medium">
              Theme
            </p>

            <p className="text-sm text-gray-400">
              Dark / Light mode
            </p>
          </div>

          <button
            disabled
            className="
            px-4
            py-2

            rounded-xl

            bg-violet-600/40

            cursor-not-allowed
            "
          >
            Coming Soon
          </button>
        </div>
      </div>

      {/* FAQ */}

      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
        <h2 className="text-xl font-semibold mb-6">
          FAQ
        </h2>

        <div className="space-y-3">
  {faqs.map((faq, index) => (
    <div
      key={index}
      className="
      rounded-2xl
      border
      border-white/10
      overflow-hidden
      "
    >
      <button
        onClick={() =>
          setOpenFaq(
            openFaq === index
              ? null
              : index
          )
        }
        className="
        w-full
        flex
        justify-between
        items-center

        p-4
        text-left
        "
      >
        <span>{faq.question}</span>

        <span>
          {openFaq === index ? "−" : "+"}
        </span>
      </button>

      {openFaq === index && (
        <div className="px-4 pb-4 text-sm text-gray-400">
          {faq.answer}
        </div>
      )}
    </div>
  ))}
</div>
      </div>

      {/* SUPPORT */}

      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
        <h2 className="text-xl font-semibold mb-5">
          Support
        </h2>

       <div className="grid gap-4">
  <button
    className="
    flex
    justify-between
    items-center

    rounded-2xl
    border
    border-white/10

    p-4
    "
  >
    <span>Contact Support</span>

    <span className="text-violet-400">
      →
    </span>
  </button>

  <button
    className="
    flex
    justify-between
    items-center

    rounded-2xl
    border
    border-white/10

    p-4
    "
  >
    <span>Feature Requests</span>

    <span className="text-violet-400">
      →
    </span>
  </button>
</div>
      </div>

      {/* LEGAL */}

      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
        <h2 className="text-xl font-semibold mb-5">
          Legal
        </h2>
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

      hover:border-violet-500/40
      hover:bg-white/[0.02]

      transition
      "
    >
      <span>Privacy Policy</span>

      <span className="text-violet-400 text-sm">
        ↗
      </span>
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

      hover:border-violet-500/40
      hover:bg-white/[0.02]

      transition
      "
    >
      <span>Terms & Conditions</span>

      <span className="text-violet-400 text-sm">
        ↗
      </span>
    </Link>
  </div>
</div>

      {/* ACCOUNT */}

      <div
        className="
        rounded-3xl

        border
        border-red-500/20

        bg-red-500/5

        p-6
        "
      >
        <h2 className="text-xl font-semibold text-red-400 mb-5">
          Account
        </h2>

        <button
          onClick={() =>
            setShowLogoutModal(true)
          }
          className="
          px-6
          py-3

          rounded-xl

          bg-red-600
          hover:bg-red-700

          font-medium
          "
        >
          Logout
        </button>
      </div>

      {/* LOGOUT MODAL */}

      {showLogoutModal && (
        <div
          className="
          fixed
          inset-0

          bg-black/70

          flex
          items-center
          justify-center

          z-50
          "
        >
          <div
            className="
            w-[90%]
            max-w-md

            rounded-3xl

            border
            border-white/10

            bg-[#0b1020]

            p-6
            "
          >
            <h3 className="text-2xl font-bold">
              Logout?
            </h3>

            <p className="text-gray-400 mt-3">
              Are you sure you want to logout?
            </p>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() =>
                  setShowLogoutModal(false)
                }
                className="
                flex-1

                py-3

                rounded-xl

                border
                border-white/10
                "
              >
                Cancel
              </button>

              <button
                onClick={handleLogout}
                className="
                flex-1

                py-3

                rounded-xl

                bg-red-600
                "
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}