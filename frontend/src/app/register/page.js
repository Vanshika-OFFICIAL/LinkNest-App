"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

import RegisterForm from "@/components/auth/RegisterForm";
import Logo from "@/assets/logos/logo.png";
import Banner from "@/components/auth/Banner";

export default function RegisterPage() {
  return (
    <div
      className="
      min-h-screen
      bg-[#050816]

      relative
      overflow-hidden
      "
    >
      {/* Background Glow */}

      <div
        className="
        absolute
        inset-0

        bg-[radial-gradient(circle_at_top_right,rgba(168,85,247,0.18),transparent_40%)]
        "
      />

      <div
        className="
        absolute

        bottom-[-200px]
        left-[-200px]

        h-[600px]
        w-[600px]

        rounded-full

        bg-fuchsia-500/10

        blur-[180px]
        "
      />

      <div
        className="
        max-w-[1800px]
        w-full

        grid
        lg:grid-cols-[480px_1fr]

        gap-0

        min-h-screen
        "
      >
        {/* LEFT */}

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
          }}
          className="
          w-full
          max-w-[430px]

          mx-auto

          rounded-3xl

          border
          border-white/10

          bg-white/[0.03]

          backdrop-blur-xl

          p-10

          shadow-[0_0_40px_rgba(168,85,247,0.15)]

          hover:shadow-[0_0_50px_rgba(168,85,247,0.25)]

          transition-all
          "
        >
          <div className="text-center mb-8">
            <div
              className="
              h-16
              w-16

              mx-auto
              mb-4

              rounded-3xl

              bg-gradient-to-br
              from-violet-200
              via-purple-200

              flex
              items-center
              justify-center

              shadow-[0_0_25px_rgba(168,85,247,0.45)]
              "
            >
              <Image
                src={Logo}
                alt="LinkNest Logo"
                width={32}
                height={32}
                priority
              />
            </div>

            <h1 className="text-4xl font-bold">
              Create Account ✨
            </h1>

            <p className="text-gray-400 mt-2">
              Join LinkNest today
            </p>
          </div>

          <RegisterForm />

          <p className="text-center mt-6 text-gray-400">
            Already have an account?{" "}
            <Link
              href="/login"
              className="
              text-violet-400
              hover:text-violet-300

              font-medium
              "
            >
              Login →
            </Link>
          </p>
        </motion.div>

        {/* RIGHT */}

        <Banner />
      </div>
    </div>
  );
}