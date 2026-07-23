"use client";

import React from "react";
import { AlertCircle, X } from "lucide-react";

interface ErrorBannerProps {
  message: string;
  onDismiss?: () => void;
}

export default function ErrorBanner({ message, onDismiss }: ErrorBannerProps) {
  if (!message) return null;

  return (
    <div className="flex items-start justify-between gap-3 rounded-xl border border-rose-250 bg-rose-50 p-4 dark:border-rose-900/60 dark:bg-rose-950/20 text-rose-800 dark:text-rose-300 animate-shake">
      <div className="flex gap-2.5">
        <AlertCircle className="h-5 w-5 mt-0.5 shrink-0 text-rose-600 dark:text-rose-450" />
        <div className="flex flex-col gap-0.5">
          <span className="text-xs font-bold text-rose-950 dark:text-rose-200">
            AI Engine Request Failed
          </span>
          <p className="text-3xs text-rose-700 dark:text-rose-400 font-medium leading-relaxed">
            {message}
          </p>
        </div>
      </div>

      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          className="rounded-lg p-1 text-rose-500 hover:bg-rose-100 hover:text-rose-800 dark:text-rose-400 dark:hover:bg-rose-900/40 dark:hover:text-rose-200"
          aria-label="Dismiss Alert"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
