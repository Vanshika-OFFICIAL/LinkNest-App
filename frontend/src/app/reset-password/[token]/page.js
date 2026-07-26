"use client";

import { useParams } from "next/navigation";

import AuthLayout from "@/components/auth/AuthLayout";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";

export default function ResetPasswordPage() {
  const { token } = useParams();

  return (
    <AuthLayout
      title="Reset Password 🔐"
      subtitle="Create a strong password for your account"
    >
      <ResetPasswordForm token={token} />
    </AuthLayout>
  );
}