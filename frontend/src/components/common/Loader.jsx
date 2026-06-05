"use client";

export default function Loader() {
  return (
    <div className="flex items-center justify-center min-h-[300px]">
      <div className="relative">
        <div
          className="
          h-14
          w-14
          rounded-full
          border-4
          border-violet-500/20
          border-t-violet-500
          animate-spin
        "
        />

        <div
          className="
          absolute
          inset-0
          flex
          items-center
          justify-center
          text-violet-400
          font-bold
        "
        >
          L
        </div>
      </div>
    </div>
  );
}