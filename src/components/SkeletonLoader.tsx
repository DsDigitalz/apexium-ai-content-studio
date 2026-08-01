"use client";

import React from "react";

export default function SkeletonLoader() {
  return (
    <div className="animate-pulse space-y-5 p-1">
      {/* Top Meta Placeholder */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.06] pb-4">
        <div className="flex gap-2">
          <div className="h-6 w-24 rounded-xl bg-white/[0.06]" />
          <div className="h-6 w-16 rounded-xl bg-white/[0.06]" />
        </div>
        <div className="flex gap-3">
          <div className="h-4 w-12 rounded-lg bg-white/[0.06]" />
          <div className="h-4 w-16 rounded-lg bg-white/[0.06]" />
        </div>
      </div>

      {/* Article Title */}
      <div className="h-6 w-3/4 rounded-xl bg-white/[0.07]" />

      {/* Paragraph 1 */}
      <div className="space-y-2 pt-1">
        <div className="h-4 w-full rounded-lg bg-white/[0.05]" />
        <div className="h-4 w-full rounded-lg bg-white/[0.05]" />
        <div className="h-4 w-5/6 rounded-lg bg-white/[0.05]" />
      </div>

      {/* Subheading 1 */}
      <div className="h-5 w-1/3 rounded-xl bg-white/[0.06]" />

      {/* List blocks */}
      <div className="space-y-3">
        {[1, 2, 3].map(i => (
          <div key={i} className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-white/[0.06] shrink-0" />
            <div className="h-4 rounded-lg bg-white/[0.05]" style={{ width: `${70 + (i * 10)}%` }} />
          </div>
        ))}
      </div>

      {/* Subheading 2 */}
      <div className="h-5 w-1/2 rounded-xl bg-white/[0.06]" />

      {/* Paragraph 3 */}
      <div className="space-y-2">
        <div className="h-4 w-full rounded-lg bg-white/[0.05]" />
        <div className="h-4 w-4/5 rounded-lg bg-white/[0.05]" />
      </div>

      {/* Action Footer Placeholder */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/[0.06] pt-5">
        <div className="h-9 w-full sm:w-32 rounded-xl bg-white/[0.06]" />
        <div className="h-9 w-full sm:w-44 rounded-xl bg-white/[0.06]" />
      </div>
    </div>
  );
}
