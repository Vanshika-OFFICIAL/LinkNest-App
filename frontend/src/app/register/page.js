import Link from "next/link";

import RegisterForm from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <div
      className="
      min-h-screen

      bg-[#0B0B0F]

      flex
      items-center
      justify-center

      px-4
    "
    >
      <div
        className="
        w-full
        max-w-md

        rounded-3xl

        border
        border-white/10

        bg-white/[0.03]

        p-8
      "
      >
        <h1 className="text-4xl font-bold mb-2">
          Create Account
        </h1>

        <p className="text-gray-400 mb-8">
          Join LinkNest today
        </p>

        <RegisterForm />

        <p className="text-center mt-6 text-gray-400">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-violet-400"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}