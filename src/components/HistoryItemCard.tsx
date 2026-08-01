"use client";

import React from "react";
import { Clock, Sparkles, Zap, Brain, Briefcase, BookOpen, Megaphone, MessageSquare, LucideIcon } from "lucide-react";

interface HistoryItemCardProps {
  id?: string;
  title: string;
  tone: "Professional" | "Educational" | "Promotional" | "Conversational" | string;
  model: "Gemini 1.5 Pro" | "GPT-4o" | "Claude 3.5 Sonnet" | string;
  date: string;
  isActive?: boolean;
  onClick?: () => void;
}

const getModelStyles = (model: string) => {
  const normalized = model.toLowerCase();
  if (normalized.includes("gemini")) {
    return {
      icon: Sparkles,
      colorClass: "text-blue-400 bg-blue-500/10 border-blue-500/20"
    };
  } else if (normalized.includes("gpt") || normalized.includes("openai")) {
    return {
      icon: Zap,
      colorClass: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
    };
  } else {
    return {
      icon: Brain,
      colorClass: "text-orange-400 bg-orange-500/10 border-orange-500/20"
    };
  }
};

const getToneStyles = (tone: string): { icon: LucideIcon; color: string } => {
  switch (tone.toLowerCase()) {
    case "professional":
      return { icon: Briefcase, color: "text-blue-400" };
    case "educational":
      return { icon: BookOpen, color: "text-emerald-400" };
    case "promotional":
      return { icon: Megaphone, color: "text-pink-400" };
    case "conversational":
      return { icon: MessageSquare, color: "text-amber-400" };
    default:
      return { icon: Sparkles, color: "text-neutral-400" };
  }
};

export default function HistoryItemCard({
  title,
  tone,
  model,
  date,
  isActive = false,
  onClick
}: HistoryItemCardProps) {
  const modelStyle = getModelStyles(model);
  const toneStyle = getToneStyles(tone);
  const ModelIcon = modelStyle.icon;
  const ToneIcon = toneStyle.icon;

  return (
    <div
      onClick={onClick}
      className={`group relative flex flex-col gap-2 rounded-xl border p-3 transition-all duration-200 cursor-pointer
        ${isActive
          ? "border-indigo-500/40 bg-indigo-500/10 ring-1 ring-indigo-500/20"
          : "border-white/[0.06] bg-white/[0.02] hover:border-white/[0.12] hover:bg-white/[0.04]"
        }
      `}
    >
      <p className={`line-clamp-2 text-xs font-medium leading-normal transition-colors
        ${isActive ? "text-indigo-300" : "text-neutral-300 group-hover:text-white"}
      `}>
        {title}
      </p>

      <div className="flex flex-wrap items-center justify-between gap-1.5 mt-0.5">
        <div className="flex items-center gap-1">
          <span className={`inline-flex items-center gap-1 rounded-lg border px-1.5 py-0.5 text-xs font-medium ${modelStyle.colorClass}`}>
            <ModelIcon className="h-2.5 w-2.5" />
            <span className="text-xs">{model.replace("Google ", "").replace("OpenAI ", "").replace("Anthropic ", "")}</span>
          </span>
          <span className="inline-flex items-center gap-1 rounded-lg border border-white/[0.08] bg-white/[0.04] px-1.5 py-0.5 text-xs font-medium text-neutral-400">
            <ToneIcon className={`h-2.5 w-2.5 ${toneStyle.color}`} />
            <span className="text-xs">{tone}</span>
          </span>
        </div>
        <span className="inline-flex items-center gap-1 text-xs font-medium text-neutral-500">
          <Clock className="h-2.5 w-2.5" />
          <span>{date}</span>
        </span>
      </div>
    </div>
  );
}
