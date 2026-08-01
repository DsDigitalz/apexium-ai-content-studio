"use client";

import React from "react";
import { Eye, Sparkles } from "lucide-react";
import SkeletonLoader from "./SkeletonLoader";
import GeneratedContentCard, { GeneratedContentItem } from "./GeneratedContentCard";

interface ContentPreviewProps {
  isLoading?: boolean;
  hasOutput?: boolean;
  contentItem?: GeneratedContentItem | null;
  topic?: string;
  tone?: string;
  model?: string;
  isSaving?: boolean;
  isApproving?: boolean;
  onSave?: () => void;
  onApprove?: () => void;
}

export default function ContentPreview({
  isLoading = false,
  hasOutput = false,
  contentItem,
  tone = "Professional",
  model = "Google Gemini 1.5 Pro",
  isSaving = false,
  isApproving = false,
  onSave,
  onApprove
}: ContentPreviewProps) {
  return (
    <div className="flex h-full min-h-[500px] flex-col rounded-2xl border border-white/[0.07] bg-[#131315] shadow-2xl shadow-black/30 overflow-hidden">

      {/* Panel Header */}
      <div className="flex items-center justify-between border-b border-white/[0.06] bg-white/[0.02] px-6 py-4">
        <div className="flex items-center gap-2">
          <Eye className="h-4 w-4 text-neutral-400" />
          <span className="text-sm font-medium text-neutral-300">
            Studio Preview
          </span>
        </div>

        {hasOutput && !isLoading && (
          <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Draft Ready</span>
          </div>
        )}
      </div>

      {/* Panel Body */}
      <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
        {isLoading ? (
          <SkeletonLoader />
        ) : hasOutput && (contentItem || tone) ? (
          <GeneratedContentCard
            contentItem={contentItem}
            tone={tone}
            model={model}
            isSaving={isSaving}
            isApproving={isApproving}
            onSave={onSave}
            onApprove={onApprove}
          />
        ) : (
          /* Empty State */
          <div className="flex h-full flex-col items-center justify-center text-center p-8">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.03]">
              <Sparkles className="h-6 w-6 text-indigo-400/70 animate-pulse" />
            </div>
            <h3 className="mt-5 text-sm font-medium text-neutral-300">
              Studio Workspace Empty
            </h3>
            <p className="mx-auto mt-2 max-w-xs text-xs text-neutral-400 leading-relaxed">
              Enter your topic on the left, select a tone and AI model, then click Generate Content to see results here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
