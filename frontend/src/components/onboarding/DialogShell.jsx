"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";

export default function DialogShell({ open, onClose, titleId, children, closeLabel = "Close dialog" }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;

    const previouslyFocused = document.activeElement;
    const focusableSelector = 'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
    const focusFirst = () => dialogRef.current?.querySelector(focusableSelector)?.focus();
    const timer = window.setTimeout(focusFirst, 0);

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab") return;
      const focusable = [...(dialogRef.current?.querySelectorAll(focusableSelector) || [])];
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("keydown", handleKeyDown);
      previouslyFocused?.focus?.();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm" role="presentation">
      <button type="button" aria-label="Close dialog" className="absolute inset-0 cursor-default" onClick={onClose} />
      <section ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby={titleId} className="relative z-10 w-full max-w-lg rounded-3xl border border-violet-500/25 bg-[#121525] p-6 shadow-[0_28px_80px_rgba(0,0,0,0.6)] md:p-8">
        <button type="button" aria-label={closeLabel} onClick={onClose} className="absolute right-4 top-4 rounded-lg p-2 text-slate-400 transition hover:bg-white/[0.06] hover:text-white"><X size={19} /></button>
        {children}
      </section>
    </div>
  );
}
