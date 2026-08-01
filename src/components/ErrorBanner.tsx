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
    <div className="flex items-start justify-between gap-3 rounded-2xl border border-rose-500/20 bg-rose-500/10 p-4 text-rose-300">
      <div className="flex gap-2.5">
        <AlertCircle className="h-4 w-4 mt-0.5 shrink-0 text-rose-400" />
        <div className="flex flex-col gap-0.5">
          <span className="text-xs font-semibold text-rose-200">
            AI Engine Request Failed
          </span>
          <p className="text-xs text-rose-400 font-normal leading-relaxed">
            {message}
          </p>
        </div>
      </div>

      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          className="rounded-lg p-1 text-rose-400 hover:bg-rose-500/20 hover:text-rose-200 transition-colors"
          aria-label="Dismiss Alert"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
}
