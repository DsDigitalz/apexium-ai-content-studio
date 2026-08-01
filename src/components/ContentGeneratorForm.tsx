"use client";

import React, { useState, useEffect } from "react";
import {
  Sparkles,
  ChevronDown,
  Check,
  Briefcase,
  BookOpen,
  Megaphone,
  MessageSquare,
  Loader2,
  Zap,
  Brain
} from "lucide-react";
import ErrorBanner from "./ErrorBanner";

interface ContentGeneratorFormProps {
  onSubmit?: (data: { topic: string; tone: string; model: string }) => void;
  isLoading?: boolean;
  errorMessage?: string;
  onDismissError?: () => void;
  topicValue?: string;
  onTopicChange?: (val: string) => void;
}

const TONES = [
  {
    id: "professional",
    name: "Professional",
    description: "Polished, formal, and business-appropriate",
    icon: Briefcase,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20"
  },
  {
    id: "educational",
    name: "Educational",
    description: "Clear, informative, and explanatory",
    icon: BookOpen,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20"
  },
  {
    id: "promotional",
    name: "Promotional",
    description: "Persuasive, engaging, and benefit-focused",
    icon: Megaphone,
    color: "text-pink-400",
    bg: "bg-pink-500/10",
    border: "border-pink-500/20"
  },
  {
    id: "conversational",
    name: "Conversational",
    description: "Friendly, natural, and approachable",
    icon: MessageSquare,
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20"
  }
];

const MODELS = [
  {
    id: "gemini",
    name: "Google Gemini",
    version: "Gemini 2.0 Flash",
    description: "Highly analytical, excellent for research & reasoning",
    icon: Sparkles,
    accent: "border-blue-500/30 bg-blue-500/10",
    badge: "bg-blue-500/15 text-blue-400 border-blue-500/20",
    selectedRing: "ring-1 ring-blue-500/30"
  },
  {
    id: "openai",
    name: "OpenAI GPT-4",
    version: "GPT-4o",
    description: "Fast, creative, and strong general capability",
    icon: Zap,
    accent: "border-emerald-500/30 bg-emerald-500/10",
    badge: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
    selectedRing: "ring-1 ring-emerald-500/30"
  },
  {
    id: "claude",
    name: "Anthropic Claude",
    version: "Claude 3.5 Sonnet",
    description: "Nuanced, high-quality writing, very natural flow",
    icon: Brain,
    accent: "border-orange-500/30 bg-orange-500/10",
    badge: "bg-orange-500/15 text-orange-400 border-orange-500/20",
    selectedRing: "ring-1 ring-orange-500/30"
  }
];

export default function ContentGeneratorForm({
  onSubmit,
  isLoading: propIsLoading,
  errorMessage,
  onDismissError,
  topicValue,
  onTopicChange
}: ContentGeneratorFormProps) {
  const [topic, setTopic] = useState(topicValue || "");
  const [selectedTone, setSelectedTone] = useState(TONES[0]);
  const [selectedModel, setSelectedModel] = useState(MODELS[0]);
  const [isToneDropdownOpen, setIsToneDropdownOpen] = useState(false);
  const [localIsLoading, setLocalIsLoading] = useState(false);
  const [validationError, setValidationError] = useState("");

  const isLoading = propIsLoading !== undefined ? propIsLoading : localIsLoading;

  useEffect(() => {
    if (topicValue !== undefined) setTopic(topicValue);
  }, [topicValue]);

  const handleTextareaChange = (val: string) => {
    const sliced = val.slice(0, 500);
    setTopic(sliced);
    if (onTopicChange) onTopicChange(sliced);
    if (validationError && sliced.trim()) setValidationError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) {
      setValidationError("Please enter a topic, question, or content request to continue.");
      return;
    }
    setValidationError("");
    if (onSubmit) {
      onSubmit({
        topic: topic.trim(),
        tone: selectedTone.name,
        model: selectedModel.name
      });
    } else {
      setLocalIsLoading(true);
      setTimeout(() => setLocalIsLoading(false), 1800);
    }
  };

  const selectTone = (tone: typeof TONES[0]) => {
    setSelectedTone(tone);
    setIsToneDropdownOpen(false);
  };

  const quickTopicSuggestions = [
    "Write a LinkedIn post about AI automation.",
    "What are the benefits of social media marketing for a tech company?",
    "Give me 5 content ideas for Apexium.",
    "Create a 7-day social media campaign for Apexium.",
    "Write a promotional post about Apexium's AI services.",
    "What services does Apexium offer?"
  ];

  const activeErrorMessage = errorMessage || validationError;

  return (
    <div className="rounded-2xl border border-white/[0.07] bg-[#131315] shadow-2xl shadow-black/30">
      {/* Form Card Header */}
      <div className="flex items-center justify-between border-b border-white/[0.06] px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-600 to-violet-600">
            <Sparkles className="h-3.5 w-3.5 text-white" />
          </div>
          <span className="text-sm font-medium text-neutral-200">Content Generator</span>
        </div>
        <span className="rounded-full bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 text-xs text-indigo-400">
          AI Powered
        </span>
      </div>

      <div className="p-6">
        {activeErrorMessage && (
          <div className="mb-5">
            <ErrorBanner
              message={activeErrorMessage}
              onDismiss={() => {
                setValidationError("");
                if (onDismissError) onDismissError();
              }}
            />
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Section 1: Topic Textarea */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="topic" className="text-xs font-medium text-neutral-300">
                Topic, Question, or Content Request
              </label>
              <span className="text-xs text-neutral-400">
                {topic.length} / 500
              </span>
            </div>
            <div className="relative">
              <textarea
                id="topic"
                value={topic}
                onChange={(e) => handleTextareaChange(e.target.value)}
                placeholder="Enter a topic, question, or content request..."
                disabled={isLoading}
                rows={4}
                className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm text-neutral-200 placeholder-neutral-600 outline-none transition-all focus:border-indigo-500/60 focus:bg-white/[0.05] focus:ring-2 focus:ring-indigo-500/15 disabled:cursor-not-allowed disabled:opacity-50 resize-none font-sans leading-relaxed"
              />
            </div>

            {/* Quick Suggestions */}
            <div className="flex flex-wrap gap-1.5 mt-1">
              {quickTopicSuggestions.map((suggestion, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleTextareaChange(suggestion)}
                  className="rounded-xl border border-white/[0.07] bg-white/[0.03] px-2.5 py-1 text-xs text-neutral-400 transition-all hover:bg-white/[0.07] hover:text-neutral-300"
                >
                  {suggestion.slice(0, 36)}...
                </button>
              ))}
            </div>
          </div>

          {/* Section 2: Custom Tone Dropdown */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-neutral-300">
              Content Tone
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsToneDropdownOpen(!isToneDropdownOpen)}
                disabled={isLoading}
                className="flex w-full items-center justify-between rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-left text-sm text-neutral-200 transition-all hover:border-white/[0.14] hover:bg-white/[0.05] focus:outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/15 disabled:opacity-50"
              >
                <span className="flex items-center gap-2.5">
                  <span className={`flex h-6 w-6 items-center justify-center rounded-lg ${selectedTone.bg} ${selectedTone.border} border`}>
                    <selectedTone.icon className={`h-3.5 w-3.5 ${selectedTone.color}`} />
                  </span>
                  <span className="text-sm font-medium text-neutral-200">{selectedTone.name}</span>
                </span>
                <ChevronDown className={`h-4 w-4 text-neutral-400 transition-transform duration-200 ${isToneDropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {isToneDropdownOpen && (
                <div className="absolute z-20 mt-1.5 w-full rounded-2xl border border-white/[0.08] bg-[#1a1a1c] p-1.5 shadow-2xl shadow-black/60">
                  {TONES.map((tone) => (
                    <button
                      key={tone.id}
                      type="button"
                      onClick={() => selectTone(tone)}
                      className="flex w-full items-start gap-3 rounded-xl px-3 py-3 text-left transition-all hover:bg-white/[0.05]"
                    >
                      <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-xl mt-0.5 ${tone.bg} ${tone.border} border`}>
                        <tone.icon className={`h-3.5 w-3.5 ${tone.color}`} />
                      </span>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-neutral-200">{tone.name}</span>
                          {selectedTone.id === tone.id && (
                            <Check className="h-3.5 w-3.5 text-indigo-400" />
                          )}
                        </div>
                        <p className="text-xs text-neutral-400 mt-0.5">{tone.description}</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Section 3: AI Model Cards */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-neutral-300">
              Select AI Model
            </label>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
              {MODELS.map((model) => {
                const isSelected = selectedModel.id === model.id;
                return (
                  <div
                    key={model.id}
                    onClick={() => !isLoading && setSelectedModel(model)}
                    className={`group relative flex flex-col gap-2 rounded-2xl border p-4 transition-all duration-200 cursor-pointer
                      ${isSelected
                        ? `${model.accent} ${model.selectedRing}`
                        : "border-white/[0.07] bg-white/[0.02] hover:border-white/[0.12] hover:bg-white/[0.04]"
                      }
                      ${isLoading ? "opacity-60 cursor-not-allowed" : ""}
                    `}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex h-7 w-7 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.05]">
                        <model.icon className="h-3.5 w-3.5 text-neutral-300" />
                      </div>
                      <span className={`rounded-lg border px-1.5 py-0.5 text-xs font-medium ${model.badge}`}>
                        {model.version}
                      </span>
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-neutral-200">{model.name}</h4>
                      <p className="text-xs text-neutral-400 mt-0.5 leading-relaxed">{model.description}</p>
                    </div>
                    <div className="absolute bottom-3 right-3">
                      <div className={`flex h-4 w-4 items-center justify-center rounded-full border transition-all
                        ${isSelected
                          ? "border-indigo-500 bg-indigo-500"
                          : "border-white/[0.15] bg-transparent"
                        }
                      `}>
                        {isSelected && <Check className="h-2.5 w-2.5 text-white" />}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section 4: Action Button */}
          <div className="pt-1">
            <button
              type="submit"
              disabled={isLoading || !topic.trim()}
              className="group relative flex w-full items-center justify-center gap-2 rounded-2xl bg-indigo-600 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition-all hover:bg-indigo-500 hover:shadow-indigo-500/30 hover:scale-[1.01] active:scale-99 disabled:scale-100 disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Generating content...</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  <span>Generate Content</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
