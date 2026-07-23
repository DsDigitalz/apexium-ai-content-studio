"use client";

import React from "react";

export default function SkeletonLoader() {
  return (
    <div className="animate-pulse rounded-2xl border border-slate-100 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900/60">
      
      {/* Top Meta Details Placeholder */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-150 pb-4 dark:border-slate-800/80 mb-5">
        <div className="flex gap-2">
          {/* Model pill */}
          <div className="h-6 w-24 rounded-md bg-slate-200 dark:bg-slate-800" />
          {/* Tone pill */}
          <div className="h-6 w-16 rounded-md bg-slate-200 dark:bg-slate-800" />
        </div>
        
        {/* Right Stats */}
        <div className="flex gap-3">
          <div className="h-4 w-12 rounded-md bg-slate-205 dark:bg-slate-800" />
          <div className="h-4 w-16 rounded-md bg-slate-205 dark:bg-slate-800" />
        </div>
      </div>

      {/* Main Prose Text Skeletons */}
      <div className="space-y-5 mb-6">
        {/* Article Title */}
        <div className="h-6 w-3/4 rounded-md bg-slate-200 dark:bg-slate-800" />

        {/* Paragraph 1 */}
        <div className="space-y-2 pt-2">
          <div className="h-4 w-full rounded-md bg-slate-200 dark:bg-slate-800" />
          <div className="h-4 w-full rounded-md bg-slate-200 dark:bg-slate-800" />
          <div className="h-4 w-5/6 rounded-md bg-slate-200 dark:bg-slate-800" />
        </div>

        {/* Subheading 1 */}
        <div className="h-5 w-1/3 rounded-md bg-slate-200 dark:bg-slate-800 pt-2" />

        {/* Paragraph 2 list blocks */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-slate-200 dark:bg-slate-800 shrink-0" />
            <div className="h-4 w-11/12 rounded-md bg-slate-200 dark:bg-slate-800" />
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-slate-200 dark:bg-slate-800 shrink-0" />
            <div className="h-4 w-5/6 rounded-md bg-slate-200 dark:bg-slate-800" />
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-slate-200 dark:bg-slate-800 shrink-0" />
            <div className="h-4 w-full rounded-md bg-slate-200 dark:bg-slate-800" />
          </div>
        </div>

        {/* Subheading 2 */}
        <div className="h-5 w-1/2 rounded-md bg-slate-200 dark:bg-slate-800 pt-2" />

        {/* Paragraph 3 */}
        <div className="space-y-2">
          <div className="h-4 w-full rounded-md bg-slate-200 dark:bg-slate-800" />
          <div className="h-4 w-4/5 rounded-md bg-slate-200 dark:bg-slate-800" />
        </div>
      </div>

      {/* Action Footer Placeholder */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100 pt-4 dark:border-slate-800/80">
        {/* Copy button skeleton */}
        <div className="h-10 w-full sm:w-32 rounded-xl bg-slate-200 dark:bg-slate-800" />
        {/* Approve button skeleton */}
        <div className="h-10 w-full sm:w-44 rounded-xl bg-slate-200 dark:bg-slate-800" />
      </div>

    </div>
  );
}
