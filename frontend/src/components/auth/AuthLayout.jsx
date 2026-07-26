"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import Logo from "@/assets/logos/logo.png";
import Banner from "@/components/auth/Banner";

export default function AuthLayout({
  title,
  subtitle,
  children,
}) {
  return (
    <div
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-[#050816]
      "
    >
      {/* Background Gradient */}
      <div
        className="
          absolute
          inset-0
          bg-[radial-gradient(circle_at_top_right,rgba(168,85,247,0.18),transparent_40%)]
        "
      />

      {/* Glow */}
      <div
        className="
          absolute
          -bottom-44
          -left-44
          h-[520px]
          w-[520px]
          rounded-full
          bg-fuchsia-500/10
          blur-[170px]
        "
      />

      <div
        className="
          relative
          mx-auto
          grid
          min-h-screen
          max-w-[1800px]
          items-center
          lg:grid-cols-[520px_1fr]
        "
      >
        {/* LEFT */}
        <div
          className="
            flex
            items-center
            justify-center

            px-5
            py-6

            sm:px-8
            sm:py-8

            lg:px-12
            lg:py-10
          "
        >
          <motion.div
            initial={{
              opacity: 0,
              y: 25,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
            }}
            className="
              w-full
              max-w-[420px]

              rounded-3xl

              border
              border-white/10

              bg-white/[0.03]

              backdrop-blur-xl

              p-6
              sm:p-7
              lg:p-8

              shadow-[0_0_40px_rgba(168,85,247,0.15)]
              hover:shadow-[0_0_50px_rgba(168,85,247,0.25)]

              transition-all
            "
          >
            {/* Logo + Heading */}
            <div className="mb-6 text-center">
              <div
                className="
                  mx-auto
                  mb-3

                  flex
                  h-16
                  w-16
                  items-center
                  justify-center

                  rounded-3xl

                  bg-gradient-to-br
                  from-violet-200
                  via-purple-200

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

              <h1
                className="
                  text-3xl
                  font-bold
                  leading-tight
                  tracking-tight

                  sm:text-4xl
                "
              >
                {title}
              </h1>

              <p
                className="
                  mt-1
                  text-sm
                  text-gray-400

                  sm:text-base
                "
              >
                {subtitle}
              </p>
            </div>

            {children}
          </motion.div>
        </div>

        {/* RIGHT */}
        <div className="hidden lg:block">
          <Banner />
        </div>
      </div>
    </div>
  );
}