"use client";

export default function ActionCard({ icon: Icon, title, description, action }) {
  return <article className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/15 text-violet-300">{Icon && <Icon size={20} />}</div><h3 className="mt-4 font-semibold">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-400">{description}</p>{action && <div className="mt-4">{action}</div>}</article>;
}
