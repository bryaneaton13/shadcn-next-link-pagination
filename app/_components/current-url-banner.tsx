"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function CurrentUrlBanner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [origin, setOrigin] = useState("");

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  const queryEntries = Array.from(searchParams.entries());
  const baseUrl = `${origin}${pathname}`;
  // const fullUrl = queryEntries.length > 0 ? `${baseUrl}?${searchParams.toString()}` : baseUrl;

  return (
    <aside className="fixed right-4 top-4 z-50 w-[min(42rem,calc(100vw-2rem))] rounded-xl border border-sky-200 bg-white/95 p-4 shadow-lg backdrop-blur">
      <div className="mb-2 flex items-center justify-between gap-3">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">Current URL</p>
        <p className="shrink-0 rounded-full bg-sky-100 px-2 py-1 text-[10px] font-medium text-sky-800">
          {queryEntries.length} params
        </p>
      </div>

      <div className="rounded-lg border border-slate-200 bg-slate-950 p-3 font-mono text-xs leading-6 text-slate-100 shadow-inner">
        <span className="break-all text-slate-300">{baseUrl}</span>
        {queryEntries.length > 0 ? (
          <>
            <span className="text-fuchsia-300">?</span>
            {queryEntries.map(([key, value], index) => (
              <span key={`${key}-${value}`} className="break-all">
                <span className="rounded bg-amber-400/20 px-1 py-0.5 text-amber-200">{key}</span>
                <span className="text-slate-400">=</span>
                <span className="rounded bg-emerald-400/20 px-1 py-0.5 text-emerald-200">{value}</span>
                {index < queryEntries.length - 1 ? <span className="text-fuchsia-300">&amp;</span> : null}
              </span>
            ))}
          </>
        ) : (
          <span className="ml-2 rounded bg-slate-800 px-2 py-1 text-[11px] text-slate-300">No query params</span>
        )}
      </div>
    </aside>
  );
}
