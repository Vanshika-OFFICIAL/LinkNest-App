"use client";

export default function HelpCard({ title, children }) {
  return <article className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5"><h2 className="text-lg font-semibold">{title}</h2><div className="mt-2 text-sm leading-6 text-slate-400">{children}</div></article>;
}
