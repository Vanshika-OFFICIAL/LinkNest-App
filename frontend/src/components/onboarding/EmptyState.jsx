"use client";

export default function EmptyState({ icon: Icon, title, description, children }) {
  return <section className="rounded-3xl border border-violet-500/25 bg-gradient-to-b from-violet-500/[0.05] to-white/[0.02] px-5 py-12 text-center shadow-[0_0_36px_rgba(124,58,237,0.08)] md:px-10 md:py-16"><div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-violet-500/30 bg-violet-500/[0.08] text-violet-300">{Icon && <Icon size={38} />}</div><h2 className="mt-6 text-2xl font-bold md:text-3xl">{title}</h2><p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-400 md:text-base">{description}</p>{children}</section>;
}
