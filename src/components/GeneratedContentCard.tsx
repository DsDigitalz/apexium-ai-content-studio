"use client";

import React, { useState } from "react";
import { Copy, Check, CheckCircle2, Clock, FileText, Send, Sparkles, Bookmark, Loader2, Download } from "lucide-react";

export interface GeneratedContentItem {
  id?: string;
  title?: string;
  topic?: string;
  tone?: string;
  model?: string;
  content?: string;
  wordCount?: number;
  readTime?: string;
  status?: string;
  saved?: boolean;
  createdAt?: string;
}

interface GeneratedContentCardProps {
  contentItem?: GeneratedContentItem | null;
  topic?: string;
  tone?: string;
  model?: string;
  isSaving?: boolean;
  isApproving?: boolean;
  onSave?: () => void;
  onApprove?: () => void;
}

const toneAccentColors: Record<string, string> = {
  professional: "text-blue-400 bg-blue-500/10 border-blue-500/20",
  educational: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  promotional: "text-pink-400 bg-pink-500/10 border-pink-500/20",
  conversational: "text-amber-400 bg-amber-500/10 border-amber-500/20",
};

export default function GeneratedContentCard({
  contentItem,
  tone = "Professional",
  model = "Google Gemini 1.5 Pro",
  isSaving = false,
  isApproving = false,
  onSave,
  onApprove
}: GeneratedContentCardProps) {
  const [copied, setCopied] = useState(false);

  const displayTone = contentItem?.tone || tone;
  const displayModel = contentItem?.model || model;
  const displayContent = contentItem?.content || "";
  const displayTitle = contentItem?.title || contentItem?.topic || "Generated Content";
  const displayWordCount = contentItem?.wordCount || (displayContent ? displayContent.trim().split(/\s+/).length : 0);
  const displayReadTime = contentItem?.readTime || `~${Math.max(1, Math.ceil(displayWordCount / 200))} min read`;
  const isApproved = contentItem?.status === "Approved";
  const isSaved = contentItem?.saved || contentItem?.status === "Saved" || contentItem?.status === "Approved";
  const toneKey = displayTone.toLowerCase();
  const toneColor = toneAccentColors[toneKey] || "text-neutral-200 bg-white/[0.05] border-white/[0.08]";

  const handleCopy = () => {
    if (!displayContent) return;
    navigator.clipboard.writeText(displayContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!displayContent) return;
    const blob = new Blob([displayContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${displayTitle.replace(/[^a-z0-9]/gi, "_").toLowerCase()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Convert markdown to clean JSX for rendering
  const renderFormattedContent = (rawText: string) => {
    if (!rawText) return null;

    // Remove all asterisks from the content before rendering
    const sanitized = rawText.replace(/\*/g, "");

    const blocks = sanitized.split("\n\n");
    return blocks.map((block, idx) => {
      const trimmed = block.trim();
      if (trimmed.startsWith("## ")) {
        return (
          <h2 key={idx} className="text-lg font-semibold text-white leading-tight mb-3 mt-4 first:mt-0">
            {trimmed.replace(/^##\s+/, "")}
          </h2>
        );
      } else if (trimmed.startsWith("### ")) {
        return (
          <h3 key={idx} className="text-sm font-semibold text-neutral-200 mt-5 mb-2">
            {trimmed.replace(/^###\s+/, "")}
          </h3>
        );
      } else if (trimmed.startsWith("- ") || trimmed.startsWith("  - ")) {
        const items = trimmed.split("\n").filter(Boolean).map(i => i.replace(/^[\s-]+/, "").trim());
        return (
          <ul key={idx} className="list-none space-y-2 mb-4">
            {items.map((it, iIdx) => (
              <li key={iIdx} className="flex items-start gap-2 text-sm text-neutral-200 leading-relaxed">
                <span className="h-1.5 w-1.5 rounded-full bg-neutral-600 mt-2 shrink-0" />
                <span dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(it) }} />
              </li>
            ))}
          </ul>
        );
      } else if (/^\d+\.\s+/.test(trimmed)) {
        const items = trimmed.split("\n").map(i => i.replace(/^\d+\.\s+/, ""));
        return (
          <ol key={idx} className="space-y-2 mb-4 pl-1">
            {items.map((it, iIdx) => (
              <li key={iIdx} className="flex items-start gap-2.5 text-sm text-neutral-200 leading-relaxed">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-white/[0.05] text-xs font-medium text-neutral-200 mt-0.5">{iIdx + 1}</span>
                <span dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(it) }} />
              </li>
            ))}
          </ol>
        );
      } else if (trimmed.startsWith(">")) {
        return (
          <blockquote key={idx} className="border-l-2 border-indigo-500/50 pl-4 mb-4 text-sm text-neutral-200 italic leading-relaxed">
            {trimmed.replace(/^>\s*/, "")}
          </blockquote>
        );
      } else if (trimmed) {
        return (
          <p key={idx} className="text-sm text-neutral-200 leading-relaxed mb-3" dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(trimmed) }} />
        );
      }
      return null;
    });
  };

  const formatInlineMarkdown = (text: string) => {
    return text
      .replace(/\*\*/g, "")
      .replace(/\*/g, "")
      .replace(/`([^`]+)`/g, '<code class="rounded-md bg-white/[0.06] px-1.5 py-0.5 font-mono text-xs text-neutral-300">$1</code>');
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/[0.07] bg-[#131315] shadow-2xl shadow-black/40 transition-all duration-300">

      {/* Subtle ambient glow */}
      <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-indigo-500/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 h-48 w-48 rounded-full bg-violet-500/5 blur-3xl pointer-events-none" />

      {/* Card Header */}
      <div className="relative flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.06] px-6 py-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-xl border border-indigo-500/20 bg-indigo-500/10 px-2.5 py-1 text-xs font-medium text-indigo-400">
            <Sparkles className="h-3 w-3" />
            <span>{displayModel}</span>
          </span>
          <span className={`inline-flex items-center gap-1.5 rounded-xl border px-2.5 py-1 text-xs font-medium ${toneColor}`}>
            Tone: {displayTone}
          </span>
          {contentItem?.status && (
            <span className={`inline-flex items-center rounded-xl px-2.5 py-1 text-xs font-medium border
              ${isApproved
                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                : isSaved
                ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
                : "bg-white/[0.05] text-neutral-400 border-white/[0.08]"
              }`}>
              {contentItem.status}
            </span>
          )}
        </div>

        <div className="flex items-center gap-3 text-xs text-neutral-400 font-medium">
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>{displayReadTime}</span>
          </span>
          <span className="h-3 w-px bg-white/[0.08]" />
          <span className="flex items-center gap-1">
            <FileText className="h-3 w-3" />
            <span>{displayWordCount} words</span>
          </span>
        </div>
      </div>

      {/* Content Body */}
      <div className="relative px-6 py-5">
        <article className="prose prose-invert prose-sm max-w-none">
          {renderFormattedContent(displayContent)}
        </article>
      </div>

      {/* Action Footer */}
      <div className="relative flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-white/[0.06] px-6 py-4">

        {/* Left Actions */}
        <div className="flex w-full sm:w-auto items-center gap-2">
          <button
            type="button"
            onClick={handleCopy}
            className="flex flex-1 sm:flex-initial items-center justify-center gap-1.5 rounded-xl border border-white/[0.08] bg-white/[0.03] px-3.5 py-2 text-xs font-medium text-neutral-400 transition-all hover:bg-white/[0.07] hover:text-neutral-200 active:scale-97"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-400" />
                <span className="text-emerald-400 font-medium">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                <span>Copy All</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleDownload}
            className="flex items-center justify-center gap-1.5 rounded-xl border border-white/[0.08] bg-white/[0.03] px-3.5 py-2 text-xs font-medium text-neutral-400 transition-all hover:bg-white/[0.07] hover:text-neutral-200 active:scale-97"
          >
            <Download className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Download</span>
          </button>
        </div>

        {/* Right Actions */}
        <div className="flex w-full sm:w-auto items-center gap-2">
          {onSave && (
            <button
              type="button"
              onClick={onSave}
              disabled={isSaving || isSaved}
              className="flex flex-1 sm:flex-initial items-center justify-center gap-1.5 rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-2 text-xs font-medium text-neutral-400 transition-all hover:bg-white/[0.07] hover:text-neutral-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? (
                <><Loader2 className="h-3.5 w-3.5 animate-spin" /><span>Saving...</span></>
              ) : isSaved ? (
                <><Check className="h-3.5 w-3.5 text-blue-400" /><span className="text-blue-400">Saved</span></>
              ) : (
                <><Bookmark className="h-3.5 w-3.5" /><span>Save Draft</span></>
              )}
            </button>
          )}

          <button
            type="button"
            onClick={onApprove}
            disabled={isApproving || isApproved}
            className="flex flex-1 sm:flex-initial items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-2 text-xs font-medium text-white shadow-lg shadow-emerald-600/20 transition-all hover:bg-emerald-500 hover:shadow-emerald-600/30 hover:scale-[1.01] active:scale-98 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isApproving ? (
              <><Loader2 className="h-3.5 w-3.5 animate-spin" /><span>Approving...</span></>
            ) : isApproved ? (
              <><CheckCircle2 className="h-3.5 w-3.5" /><span>Approved</span></>
            ) : (
              <><Send className="h-3.5 w-3.5" /><span>Approve & Automate</span></>
            )}
          </button>
        </div>
      </div>

      {/* Success Automation Banner */}
      {isApproved && (
        <div className="mx-6 mb-5 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-3 text-center">
          <p className="text-xs font-medium text-emerald-400 flex items-center justify-center gap-1.5">
            <CheckCircle2 className="h-3.5 w-3.5" />
            Content approved. Automation workflow triggered successfully.
          </p>
        </div>
      )}
    </div>
  );
}
