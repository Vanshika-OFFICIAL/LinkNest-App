import Link from "next/link";

import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
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
          Welcome Back
        </h1>

        <p className="text-gray-400 mb-8">
          Login to LinkNest
        </p>

        <LoginForm />

        <p className="text-center mt-6 text-gray-400">
          Don't have an account?{" "}
          <Link
            href="/register"
            className="text-violet-400"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}