"use client";

import { CheckCircle2, Plus } from "lucide-react";
import DialogShell from "./DialogShell";

export default function SuccessDialog({ open, title, message, actionLabel, onAction, onClose }) {
  return (
    <DialogShell open={open} onClose={onClose} titleId="success-dialog-title">
      <div className="text-center"><CheckCircle2 size={52} className="mx-auto text-emerald-400" /><h2 id="success-dialog-title" className="mt-5 text-2xl font-bold">{title}</h2><p className="mt-2 text-sm leading-6 text-slate-400">{message}</p></div>
      <button type="button" onClick={onAction} className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-violet-500 to-purple-600 px-4 py-3 text-sm font-semibold text-white"><Plus size={18} />{actionLabel}</button>
    </DialogShell>
  );
}
