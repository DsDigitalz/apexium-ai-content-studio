"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Settings,
  Eye,
  EyeOff,
  Check,
  AlertCircle,
  Sparkles,
  Zap,
  Brain,
  ArrowLeft,
  Save,
  RefreshCw,
  ExternalLink,
  ShieldCheck,
  Info
} from "lucide-react";

interface ApiProvider {
  id: string;
  name: string;
  version: string;
  description: string;
  envKey: string;
  docsUrl: string;
  icon: React.ElementType;
  accentColor: string;
  borderColor: string;
  bgColor: string;
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
}

const PROVIDERS: ApiProvider[] = [
  {
    id: "gemini",
    name: "Google Gemini",
    version: "Gemini 2.0 Flash",
    description: "Google's most capable multimodal model. Excellent for analytical content, research-heavy topics, and structured writing.",
    envKey: "GOOGLE_API_KEY",
    docsUrl: "https://aistudio.google.com/app/apikey",
    icon: Sparkles,
    accentColor: "text-blue-400",
    borderColor: "border-blue-500/25",
    bgColor: "bg-blue-500/[0.07]",
    badgeBg: "bg-blue-500/15",
    badgeText: "text-blue-400",
    badgeBorder: "border-blue-500/20"
  },
  {
    id: "openai",
    name: "OpenAI GPT-4",
    version: "GPT-4o",
    description: "OpenAI's flagship model. Fast, creative, and versatile. Excellent for general-purpose content and conversational writing.",
    envKey: "OPENAI_API_KEY",
    docsUrl: "https://platform.openai.com/api-keys",
    icon: Zap,
    accentColor: "text-emerald-400",
    borderColor: "border-emerald-500/25",
    bgColor: "bg-emerald-500/[0.07]",
    badgeBg: "bg-emerald-500/15",
    badgeText: "text-emerald-400",
    badgeBorder: "border-emerald-500/20"
  },
  {
    id: "claude",
    name: "Anthropic Claude",
    version: "Claude Sonnet 4.5",
    description: "Anthropic's Claude excels at nuanced, high-quality writing with a very natural, human-sounding flow.",
    envKey: "ANTHROPIC_API_KEY",
    docsUrl: "https://console.anthropic.com/settings/keys",
    icon: Brain,
    accentColor: "text-orange-400",
    borderColor: "border-orange-500/25",
    bgColor: "bg-orange-500/[0.07]",
    badgeBg: "bg-orange-500/15",
    badgeText: "text-orange-400",
    badgeBorder: "border-orange-500/20"
  }
];

interface ProviderState {
  key: string;
  visible: boolean;
  saved: boolean;
  testing: boolean;
  testResult: "idle" | "success" | "error";
}

export default function ApiSettingsPage() {
  const router = useRouter();
  const [providers, setProviders] = useState<Record<string, ProviderState>>(
    Object.fromEntries(
      PROVIDERS.map(p => [p.id, { key: "", visible: false, saved: false, testing: false, testResult: "idle" as const }])
    )
  );
  const [generalSaved, setGeneralSaved] = useState(false);
  const [defaultModel, setDefaultModel] = useState("gemini");
  const [maxTokens, setMaxTokens] = useState("800");

  // Load any saved values from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("apexium_api_settings");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.defaultModel) setDefaultModel(parsed.defaultModel);
        if (parsed.maxTokens) setMaxTokens(parsed.maxTokens);
        if (parsed.keys) {
          setProviders(prev => {
            const updated = { ...prev };
            for (const id of Object.keys(parsed.keys)) {
              if (updated[id]) {
                updated[id] = { ...updated[id], key: parsed.keys[id], saved: !!parsed.keys[id] };
              }
            }
            return updated;
          });
        }
      }
    } catch { /* ignore parse errors */ }
  }, []);

  const updateProvider = (id: string, patch: Partial<ProviderState>) => {
    setProviders(prev => ({ ...prev, [id]: { ...prev[id], ...patch } }));
  };

  const handleSaveKey = (id: string) => {
    const key = providers[id].key.trim();
    if (!key) return;

    // Save to localStorage (NOTE: in a real app this would go to a secure server-side env)
    try {
      const saved = JSON.parse(localStorage.getItem("apexium_api_settings") || "{}");
      saved.keys = { ...(saved.keys || {}), [id]: key };
      localStorage.setItem("apexium_api_settings", JSON.stringify(saved));
    } catch { /* ignore */ }

    updateProvider(id, { saved: true, testResult: "idle" });
  };

  const handleClearKey = (id: string) => {
    try {
      const saved = JSON.parse(localStorage.getItem("apexium_api_settings") || "{}");
      if (saved.keys) delete saved.keys[id];
      localStorage.setItem("apexium_api_settings", JSON.stringify(saved));
    } catch { /* ignore */ }
    updateProvider(id, { key: "", saved: false, testResult: "idle" });
  };

  const handleTestConnection = async (provider: ApiProvider) => {
    const key = providers[provider.id].key.trim();
    if (!key) return;
    updateProvider(provider.id, { testing: true, testResult: "idle" });

    try {
      const res = await fetch("/api/test-provider", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ provider: provider.id, key })
      });
      const data = await res.json();
      updateProvider(provider.id, { testing: false, testResult: data.success ? "success" : "error" });
    } catch {
      updateProvider(provider.id, { testing: false, testResult: "error" });
    }
  };

  const handleSaveGeneral = () => {
    try {
      const saved = JSON.parse(localStorage.getItem("apexium_api_settings") || "{}");
      saved.defaultModel = defaultModel;
      saved.maxTokens = maxTokens;
      localStorage.setItem("apexium_api_settings", JSON.stringify(saved));
      setGeneralSaved(true);
      setTimeout(() => setGeneralSaved(false), 2500);
    } catch { /* ignore */ }
  };

  const maskKey = (key: string) => {
    if (key.length <= 8) return "••••••••";
    return key.slice(0, 4) + "•".repeat(Math.min(20, key.length - 8)) + key.slice(-4);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-neutral-100">
      {/* Header */}
      <div className="border-b border-white/[0.06] bg-[#0a0a0c]/80 backdrop-blur-xl sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
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
                <Settings className="h-3.5 w-3.5 text-white" />
              </div>
              <div>
                <h1 className="text-sm font-semibold text-white">API Settings</h1>
                <p className="text-xs text-neutral-400">Manage AI provider connections</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

        {/* Security Notice */}
        <div className="flex items-start gap-3 rounded-2xl border border-amber-500/20 bg-amber-500/[0.07] p-4">
          <ShieldCheck className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-semibold text-amber-300 mb-0.5">Security note</p>
            <p className="text-xs text-amber-400/80 leading-relaxed">
              For production use, API keys should be stored in your <code className="bg-amber-500/10 px-1 rounded text-amber-300">.env.local</code> file as environment variables, not in the browser. Keys saved here are stored in your browser's local storage for development and testing convenience only.
            </p>
          </div>
        </div>

        {/* AI Provider Cards */}
        <section className="space-y-4">
          <div>
            <h2 className="text-sm font-semibold text-white mb-0.5">AI Providers</h2>
            <p className="text-xs text-neutral-400">Configure API keys for each AI provider. The studio will fall back to the next available provider if one fails.</p>
          </div>

          {PROVIDERS.map(provider => {
            const state = providers[provider.id];
            return (
              <div
                key={provider.id}
                className={`rounded-2xl border ${state.saved ? provider.borderColor + " " + provider.bgColor : "border-white/[0.07] bg-white/[0.02]"} transition-all duration-300`}
              >
                <div className="p-5">
                  {/* Provider Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-xl border ${state.saved ? provider.borderColor + " " + provider.bgColor : "border-white/[0.08] bg-white/[0.04]"} transition-all`}>
                        <provider.icon className={`h-5 w-5 ${state.saved ? provider.accentColor : "text-neutral-400"}`} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-semibold text-white">{provider.name}</h3>
                          <span className={`rounded-lg border px-1.5 py-0.5 text-xs font-medium ${provider.badgeBg} ${provider.badgeText} ${provider.badgeBorder}`}>
                            {provider.version}
                          </span>
                        </div>
                        <p className="text-xs text-neutral-400 mt-0.5">{provider.description}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {state.testResult === "success" && (
                        <span className="flex items-center gap-1 rounded-lg bg-emerald-500/15 border border-emerald-500/20 px-2 py-1 text-xs font-medium text-emerald-400">
                          <Check className="h-3 w-3" /> Connected
                        </span>
                      )}
                      {state.testResult === "error" && (
                        <span className="flex items-center gap-1 rounded-lg bg-rose-500/15 border border-rose-500/20 px-2 py-1 text-xs font-medium text-rose-400">
                          <AlertCircle className="h-3 w-3" /> Failed
                        </span>
                      )}
                      {state.saved && state.testResult === "idle" && (
                        <span className="flex items-center gap-1 rounded-lg bg-white/[0.06] border border-white/[0.08] px-2 py-1 text-xs font-medium text-neutral-400">
                          <Check className="h-3 w-3" /> Saved
                        </span>
                      )}
                    </div>
                  </div>

                  {/* API Key Input */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-medium text-neutral-300">
                        {provider.envKey}
                      </label>
                      <a
                        href={provider.docsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center gap-1 text-xs ${provider.accentColor} hover:opacity-80 transition-opacity`}
                      >
                        Get API Key <ExternalLink className="h-2.5 w-2.5" />
                      </a>
                    </div>

                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <input
                          type={state.visible ? "text" : "password"}
                          value={state.key}
                          onChange={e => updateProvider(provider.id, { key: e.target.value, saved: false, testResult: "idle" })}
                          placeholder={state.saved ? maskKey(state.key) : `Paste your ${provider.envKey} here...`}
                          className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 pr-10 text-sm text-neutral-200 placeholder-neutral-600 outline-none transition-all focus:border-indigo-500/60 focus:ring-2 focus:ring-indigo-500/15 font-mono"
                        />
                        <button
                          type="button"
                          onClick={() => updateProvider(provider.id, { visible: !state.visible })}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-300 transition-colors"
                        >
                          {state.visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>

                      <button
                        onClick={() => handleSaveKey(provider.id)}
                        disabled={!state.key.trim()}
                        className="flex items-center gap-1.5 rounded-xl bg-indigo-600 px-3 py-2.5 text-xs font-semibold text-white transition-all hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
                      >
                        <Save className="h-3.5 w-3.5" />
                        Save
                      </button>
                    </div>

                    {/* Actions Row */}
                    <div className="flex items-center gap-2 mt-1">
                      <button
                        onClick={() => handleTestConnection(provider)}
                        disabled={!state.key.trim() || state.testing}
                        className="flex items-center gap-1.5 rounded-xl border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-neutral-400 hover:bg-white/[0.06] hover:text-neutral-200 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        <RefreshCw className={`h-3.5 w-3.5 ${state.testing ? "animate-spin text-indigo-400" : ""}`} />
                        {state.testing ? "Testing..." : "Test Connection"}
                      </button>
                      {state.saved && (
                        <button
                          onClick={() => handleClearKey(provider.id)}
                          className="flex items-center gap-1.5 rounded-xl border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-rose-400/70 hover:bg-rose-500/10 hover:text-rose-400 transition-all"
                        >
                          Clear Key
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </section>

        {/* General Settings */}
        <section className="space-y-4">
          <div>
            <h2 className="text-sm font-semibold text-white mb-0.5">Generation Settings</h2>
            <p className="text-xs text-neutral-400">Configure default behaviour for content generation.</p>
          </div>

          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5 space-y-5">
            {/* Default Model */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-neutral-300">Default AI Model</label>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                {PROVIDERS.map(p => (
                  <button
                    key={p.id}
                    onClick={() => setDefaultModel(p.id)}
                    className={`flex items-center gap-2.5 rounded-xl border p-3 text-left text-xs font-medium transition-all
                      ${defaultModel === p.id
                        ? `${p.bgColor} ${p.borderColor} ${p.accentColor}`
                        : "border-white/[0.07] bg-white/[0.02] text-neutral-400 hover:bg-white/[0.05]"
                      }`}
                  >
                    <p.icon className="h-4 w-4 shrink-0" />
                    <span>{p.name}</span>
                    {defaultModel === p.id && <Check className="h-3 w-3 ml-auto" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Max Tokens */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-medium text-neutral-300">Max Output Tokens</label>
                <span className="text-xs font-medium text-indigo-400">{Number(maxTokens).toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="200"
                max="2000"
                step="100"
                value={maxTokens}
                onChange={e => setMaxTokens(e.target.value)}
                className="w-full h-1.5 rounded-full bg-white/[0.08] accent-indigo-500 cursor-pointer"
              />
              <div className="flex justify-between text-xs text-neutral-500">
                <span>200 (Short)</span>
                <span>1,000 (Standard)</span>
                <span>2,000 (Long-form)</span>
              </div>
            </div>

            {/* Info note */}
            <div className="flex items-start gap-2.5 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
              <Info className="h-3.5 w-3.5 text-neutral-400 shrink-0 mt-0.5" />
              <p className="text-xs text-neutral-400 leading-relaxed">
                The fallback generator (used when no API keys are configured) produces content locally without token limits. Max tokens only applies to live AI provider calls.
              </p>
            </div>

            <button
              onClick={handleSaveGeneral}
              className="flex items-center gap-2 rounded-2xl bg-indigo-600 px-4 py-2.5 text-xs font-semibold text-white transition-all hover:bg-indigo-500 hover:scale-[1.01] active:scale-99"
            >
              {generalSaved ? <><Check className="h-3.5 w-3.5" /> Saved!</> : <><Save className="h-3.5 w-3.5" /> Save Settings</>}
            </button>
          </div>
        </section>

        {/* Env File Reference */}
        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-white">.env.local Reference</h2>
          <div className="rounded-2xl border border-white/[0.07] bg-[#131315] p-5">
            <p className="text-xs text-neutral-400 mb-3">
              For production deployments, add these variables to your <code className="bg-white/[0.06] px-1 rounded text-neutral-300">.env.local</code> file in the project root:
            </p>
            <pre className="rounded-xl border border-white/[0.06] bg-black/40 p-4 text-xs text-neutral-300 font-mono leading-relaxed overflow-x-auto">
{`# Google Gemini
GOOGLE_API_KEY=your_google_api_key_here

# OpenAI GPT-4
OPENAI_API_KEY=your_openai_api_key_here

# Anthropic Claude
ANTHROPIC_API_KEY=your_anthropic_api_key_here`}
            </pre>
            <p className="mt-3 text-xs text-neutral-500">
              Restart the development server after adding environment variables for them to take effect.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
