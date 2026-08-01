"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Database,
  Copy,
  Check,
  ChevronRight,
  Sparkles,
  Briefcase,
  BookOpen,
  Megaphone,
  MessageSquare,
  Linkedin,
  Instagram,
  Twitter,
  Mail,
  Lightbulb,
  CalendarDays,
  ArrowLeft
} from "lucide-react";

const TONES = [
  { id: "professional", name: "Professional", icon: Briefcase, color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20", ring: "ring-blue-500/30" },
  { id: "educational", name: "Educational", icon: BookOpen, color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20", ring: "ring-emerald-500/30" },
  { id: "promotional", name: "Promotional", icon: Megaphone, color: "text-pink-400", bg: "bg-pink-500/10", border: "border-pink-500/20", ring: "ring-pink-500/30" },
  { id: "conversational", name: "Conversational", icon: MessageSquare, color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/20", ring: "ring-amber-500/30" },
];

interface PromptTemplate {
  id: string;
  category: string;
  categoryIcon: React.ElementType;
  platform?: string;
  title: string;
  description: string;
  prompts: Record<string, string>;
}

const TEMPLATES: PromptTemplate[] = [
  {
    id: "linkedin-post",
    category: "Social Media Post",
    categoryIcon: Linkedin,
    platform: "LinkedIn",
    title: "LinkedIn Post",
    description: "A well-structured LinkedIn post designed for professional audiences.",
    prompts: {
      professional: "Write a professional LinkedIn post about [TOPIC]. Include a strong opening line, 2–3 key insights, and a closing thought that invites engagement.",
      educational: "Write an educational LinkedIn post that explains [TOPIC] clearly. Break it down step by step so readers at any level can understand it.",
      promotional: "Write a persuasive LinkedIn post promoting [TOPIC]. Highlight the key benefits, include a compelling call to action, and make the value clear.",
      conversational: "Write a friendly, conversational LinkedIn post about [TOPIC]. Make it feel like a real person sharing a genuine insight — no corporate jargon."
    }
  },
  {
    id: "instagram-caption",
    category: "Social Media Post",
    categoryIcon: Instagram,
    platform: "Instagram",
    title: "Instagram Caption",
    description: "A short, engaging caption optimised for Instagram's visual-first audience.",
    prompts: {
      professional: "Write a concise, professional Instagram caption about [TOPIC]. Keep it polished and on-brand with a subtle call to action.",
      educational: "Write an informative Instagram caption about [TOPIC]. Keep it brief but educational — one clear takeaway the audience can act on.",
      promotional: "Write a punchy promotional Instagram caption about [TOPIC]. Lead with impact, highlight the benefit, and end with a clear call to action.",
      conversational: "Write a casual, relatable Instagram caption about [TOPIC]. Keep it short, human, and genuine — the kind of thing a real person would post."
    }
  },
  {
    id: "twitter-post",
    category: "Social Media Post",
    categoryIcon: Twitter,
    platform: "X / Twitter",
    title: "X / Twitter Post",
    description: "A concise, high-impact tweet designed to start conversations.",
    prompts: {
      professional: "Write a professional tweet about [TOPIC] in under 280 characters. Make it precise, credible, and worth sharing.",
      educational: "Write a clear, educational tweet about [TOPIC] in under 280 characters. Lead with a surprising fact or insight.",
      promotional: "Write a promotional tweet about [TOPIC] in under 280 characters. Make it punchy, benefit-driven, and easy to retweet.",
      conversational: "Write a conversational tweet about [TOPIC] in under 280 characters. Make it sound natural and spark a reply."
    }
  },
  {
    id: "content-ideas",
    category: "Content Ideas",
    categoryIcon: Lightbulb,
    title: "Content Ideas List",
    description: "Generate a batch of content ideas for social media or marketing campaigns.",
    prompts: {
      professional: "Give me 7 professional content ideas for a technology company focused on [TOPIC]. Include a mix of formats: posts, articles, and video concepts.",
      educational: "Give me 7 educational content ideas about [TOPIC]. Each idea should teach the audience something specific and practical.",
      promotional: "Give me 7 promotional content ideas for [TOPIC]. Each idea should drive awareness, interest, or action towards a product or service.",
      conversational: "Give me 7 engaging content ideas about [TOPIC] that will spark real conversation and interaction on social media."
    }
  },
  {
    id: "email-newsletter",
    category: "Email & Newsletter",
    categoryIcon: Mail,
    title: "Email / Newsletter",
    description: "Marketing email or newsletter copy for announcements and campaigns.",
    prompts: {
      professional: "Write a professional marketing email about [TOPIC]. Include a subject line, a structured body with clear sections, and a strong call to action.",
      educational: "Write an educational newsletter section about [TOPIC]. Explain the concept clearly, provide actionable takeaways, and keep it engaging.",
      promotional: "Write a promotional email about [TOPIC]. Lead with a compelling offer or benefit, build urgency, and close with a clear call to action.",
      conversational: "Write a friendly email about [TOPIC] as if written by a real person who is genuinely excited to share something useful with the reader."
    }
  },
  {
    id: "content-campaign",
    category: "Campaign Planning",
    categoryIcon: CalendarDays,
    title: "7-Day Content Campaign",
    description: "A structured week-long social media content calendar for any topic.",
    prompts: {
      professional: "Create a 7-day professional social media content plan for [TOPIC]. For each day, include the platform, post type, and a brief content description.",
      educational: "Create a 7-day educational content campaign about [TOPIC]. Each day should focus on a different aspect of the topic, building knowledge progressively.",
      promotional: "Create a 7-day promotional social media campaign for [TOPIC]. Build momentum across the week with awareness, engagement, and conversion-focused posts.",
      conversational: "Create a 7-day social media content calendar about [TOPIC] with a friendly, human tone. Make each day feel authentic and community-driven."
    }
  }
];

const CATEGORIES = ["All", "Social Media Post", "Content Ideas", "Email & Newsletter", "Campaign Planning"];

export default function PromptTemplatesPage() {
  const router = useRouter();
  const [activeTone, setActiveTone] = useState("professional");
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedTemplate, setSelectedTemplate] = useState<PromptTemplate>(TEMPLATES[0]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredTemplates = activeCategory === "All"
    ? TEMPLATES
    : TEMPLATES.filter(t => t.category === activeCategory);

  const handleCopy = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      // fallback: select text
    }
  };

  const handleUseTemplate = (template: PromptTemplate) => {
    const prompt = template.prompts[activeTone];
    sessionStorage.setItem("studio_prefill_prompt", prompt);
    router.push("/");
  };

  const activeToneData = TONES.find(t => t.id === activeTone)!;

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-neutral-100">
      {/* Page Header */}
      <div className="border-b border-white/[0.06] bg-[#0a0a0c]/80 backdrop-blur-xl sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push("/")}
              className="flex items-center justify-center h-8 w-8 rounded-xl border border-white/[0.08] bg-white/[0.03] text-neutral-400 hover:bg-white/[0.07] hover:text-neutral-200 transition-all"
              aria-label="Back to Studio"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600">
                <Database className="h-3.5 w-3.5 text-white" />
              </div>
              <div>
                <h1 className="text-sm font-semibold text-white">Prompt Templates</h1>
                <p className="text-xs text-neutral-400">{TEMPLATES.length} ready-to-use templates</p>
              </div>
            </div>
          </div>
          <span className="rounded-full bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-0.5 text-xs font-medium text-indigo-400">
            {filteredTemplates.length} templates
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Tone Selector */}
        <div className="mb-6">
          <p className="text-xs font-medium text-neutral-400 mb-3">Preview tone</p>
          <div className="flex flex-wrap gap-2">
            {TONES.map(tone => {
              const isActive = activeTone === tone.id;
              return (
                <button
                  key={tone.id}
                  onClick={() => setActiveTone(tone.id)}
                  className={`flex items-center gap-2 rounded-xl border px-3 py-1.5 text-xs font-medium transition-all
                    ${isActive
                      ? `${tone.bg} ${tone.border} ${tone.color} ring-1 ${tone.ring}`
                      : "border-white/[0.07] bg-white/[0.02] text-neutral-400 hover:bg-white/[0.05] hover:text-neutral-300"
                    }`}
                >
                  <tone.icon className="h-3.5 w-3.5" />
                  {tone.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-6 flex flex-wrap gap-1.5">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-xl px-3 py-1.5 text-xs font-medium transition-all
                ${activeCategory === cat
                  ? "bg-indigo-500/15 border border-indigo-500/25 text-indigo-400"
                  : "border border-white/[0.06] bg-white/[0.02] text-neutral-400 hover:bg-white/[0.05] hover:text-neutral-300"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Main Layout: Template List + Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* Template Cards */}
          <div className="lg:col-span-5 space-y-2">
            {filteredTemplates.map(template => {
              const isSelected = selectedTemplate.id === template.id;
              return (
                <div
                  key={template.id}
                  onClick={() => setSelectedTemplate(template)}
                  className={`group flex items-start gap-3.5 rounded-2xl border p-4 cursor-pointer transition-all duration-200
                    ${isSelected
                      ? "bg-indigo-500/[0.08] border-indigo-500/25 ring-1 ring-indigo-500/20"
                      : "border-white/[0.07] bg-white/[0.02] hover:border-white/[0.12] hover:bg-white/[0.04]"
                    }`}
                >
                  <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border transition-all
                    ${isSelected ? "bg-indigo-500/15 border-indigo-500/25" : "bg-white/[0.04] border-white/[0.08]"}`}>
                    <template.categoryIcon className={`h-4 w-4 ${isSelected ? "text-indigo-400" : "text-neutral-400"}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className={`text-sm font-medium ${isSelected ? "text-white" : "text-neutral-200"}`}>
                        {template.title}
                      </span>
                      {template.platform && (
                        <span className="shrink-0 rounded-lg bg-white/[0.05] border border-white/[0.08] px-1.5 py-0.5 text-xs text-neutral-400">
                          {template.platform}
                        </span>
                      )}
                    </div>
                    <p className="mt-0.5 text-xs text-neutral-400 leading-relaxed line-clamp-2">{template.description}</p>
                    <span className="mt-1.5 inline-block text-xs text-neutral-400">{template.category}</span>
                  </div>
                  <ChevronRight className={`h-4 w-4 shrink-0 mt-2.5 transition-all ${isSelected ? "text-indigo-400 translate-x-0.5" : "text-neutral-400 group-hover:text-neutral-400"}`} />
                </div>
              );
            })}
          </div>

          {/* Preview Panel */}
          <div className="lg:col-span-7">
            <div className="sticky top-24 rounded-2xl border border-white/[0.07] bg-[#131315] overflow-hidden shadow-2xl shadow-black/30">
              {/* Panel Header */}
              <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-4">
                <div className="flex items-center gap-2.5">
                  <div className={`flex h-6 w-6 items-center justify-center rounded-lg ${activeToneData.bg} border ${activeToneData.border}`}>
                    <activeToneData.icon className={`h-3.5 w-3.5 ${activeToneData.color}`} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{selectedTemplate.title}</p>
                    <p className="text-xs text-neutral-400">{activeToneData.name} tone</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopy(selectedTemplate.prompts[activeTone], `preview-${selectedTemplate.id}`)}
                    className="flex items-center gap-1.5 rounded-xl border border-white/[0.08] bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-neutral-300 transition-all hover:bg-white/[0.08] hover:text-white"
                  >
                    {copiedId === `preview-${selectedTemplate.id}` ? (
                      <><Check className="h-3.5 w-3.5 text-emerald-400" /><span className="text-emerald-400">Copied!</span></>
                    ) : (
                      <><Copy className="h-3.5 w-3.5" /><span>Copy</span></>
                    )}
                  </button>
                </div>
              </div>

              {/* Prompt Display */}
              <div className="p-5">
                <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 min-h-[120px]">
                  <p className="text-sm text-neutral-300 leading-relaxed font-mono whitespace-pre-wrap">
                    {selectedTemplate.prompts[activeTone]}
                  </p>
                </div>

                {/* Hint */}
                <p className="mt-3 text-xs text-neutral-400">
                  Replace <span className="text-indigo-400/80 font-mono">[TOPIC]</span> with your specific subject before using.
                </p>

                {/* All Tone Variants */}
                <div className="mt-5 space-y-3">
                  <p className="text-xs font-medium text-neutral-400 uppercase tracking-wider">All tone variants</p>
                  {TONES.map(tone => (
                    <div
                      key={tone.id}
                      className={`rounded-xl border p-3.5 transition-all ${activeTone === tone.id
                        ? `${tone.bg} ${tone.border}`
                        : "border-white/[0.05] bg-white/[0.01]"
                        }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <tone.icon className={`h-3.5 w-3.5 ${tone.color}`} />
                          <span className={`text-xs font-semibold ${tone.color}`}>{tone.name}</span>
                        </div>
                        <button
                          onClick={() => handleCopy(selectedTemplate.prompts[tone.id], `${selectedTemplate.id}-${tone.id}`)}
                          className="rounded-lg p-1.5 text-neutral-400 hover:bg-white/[0.06] hover:text-neutral-300 transition-all"
                        >
                          {copiedId === `${selectedTemplate.id}-${tone.id}` ? (
                            <Check className="h-3 w-3 text-emerald-400" />
                          ) : (
                            <Copy className="h-3 w-3" />
                          )}
                        </button>
                      </div>
                      <p className="text-xs text-neutral-400 leading-relaxed line-clamp-2">
                        {selectedTemplate.prompts[tone.id]}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Use Template CTA */}
                <button
                  onClick={() => handleUseTemplate(selectedTemplate)}
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-indigo-600 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition-all hover:bg-indigo-500 hover:shadow-indigo-500/30 hover:scale-[1.01] active:scale-99"
                >
                  <Sparkles className="h-4 w-4" />
                  Use This Template in Studio
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
