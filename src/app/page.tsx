"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import ContentGeneratorForm from "@/components/ContentGeneratorForm";
import ContentPreview from "@/components/ContentPreview";
import { GeneratedContentItem } from "@/components/GeneratedContentCard";
import { Sparkles, RefreshCw } from "lucide-react";

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [topic, setTopic] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isApproving, setIsApproving] = useState(false);
  const [hasOutput, setHasOutput] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [generatedContent, setGeneratedContent] = useState<GeneratedContentItem | null>(null);
  const [contentHistory, setContentHistory] = useState<any[]>([]);
  const [selectedHistoryId, setSelectedHistoryId] = useState<string | null>(null);
  const [generationMeta, setGenerationMeta] = useState({
    tone: "Professional",
    model: "Google Gemini",
  });

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await fetch("/api/history");
      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.history)) {
          setContentHistory(data.history);
        }
      }
    } catch (err) {
      console.error("Failed to load content history:", err);
    }
  };

  const handleGenerate = async (data: { topic: string; tone: string; model: string }) => {
    setIsGenerating(true);
    setHasOutput(false);
    setErrorMessage("");
    setSelectedHistoryId(null);
    setGenerationMeta({
      tone: data.tone,
      model: data.model,
    });

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || "Unable to generate content. Please try again.");
      }

      const newItem: GeneratedContentItem = result.data;
      setGeneratedContent(newItem);
      setHasOutput(true);

      const historyItem = {
        id: newItem.id || `hist-${Date.now()}`,
        title: newItem.topic
          ? newItem.topic.length > 45
            ? `${newItem.topic.slice(0, 45)}...`
            : newItem.topic
          : "Generated Content",
        topic: newItem.topic,
        tone: newItem.tone || data.tone,
        model: newItem.model || data.model,
        date: "Just now",
        content: newItem.content,
        wordCount: newItem.wordCount,
        readTime: newItem.readTime,
        status: newItem.status || "Draft"
      };

      setContentHistory(prev => [historyItem, ...prev]);
    } catch (err: unknown) {
      const errorText = err instanceof Error ? err.message : "Failed to connect to AI engine.";
      setErrorMessage(errorText);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveContent = async () => {
    if (!generatedContent) return;

    setIsSaving(true);
    try {
      const response = await fetch("/api/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: generatedContent.id,
          topic: generatedContent.topic,
          tone: generatedContent.tone,
          model: generatedContent.model,
          content: generatedContent.content,
        }),
      });

      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result.error || "Failed to save content.");
      }

      setGeneratedContent(prev => prev ? { ...prev, status: "Saved", saved: true } : null);
      if (generatedContent.id) {
        setContentHistory(prev =>
          prev.map(item => item.id === generatedContent.id ? { ...item, status: "Saved" } : item)
        );
      }
    } catch (err: unknown) {
      const errorText = err instanceof Error ? err.message : "Save request failed.";
      setErrorMessage(errorText);
    } finally {
      setIsSaving(false);
    }
  };

  const handleApproveContent = async () => {
    if (!generatedContent) return;

    setIsApproving(true);
    try {
      const response = await fetch("/api/approve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: generatedContent.id,
          topic: generatedContent.topic,
          tone: generatedContent.tone,
          model: generatedContent.model,
          content: generatedContent.content,
        }),
      });

      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result.error || "Approval request failed.");
      }

      setGeneratedContent(prev => prev ? { ...prev, status: "Approved" } : null);
      if (generatedContent.id) {
        setContentHistory(prev =>
          prev.map(item => item.id === generatedContent.id ? { ...item, status: "Approved" } : item)
        );
      }
    } catch (err: unknown) {
      const errorText = err instanceof Error ? err.message : "Approval request failed.";
      setErrorMessage(errorText);
    } finally {
      setIsApproving(false);
    }
  };

  const handleSelectHistoryItem = (item: GeneratedContentItem) => {
    setSelectedHistoryId(item.id || null);
    setGeneratedContent(item);
    setTopic(item.topic || "");
    setGenerationMeta({
      tone: item.tone || "Professional",
      model: item.model || "Google Gemini"
    });
    setHasOutput(true);
    setErrorMessage("");
  };

  const handleNewSession = () => {
    setTopic("");
    setGeneratedContent(null);
    setHasOutput(false);
    setSelectedHistoryId(null);
    setErrorMessage("");
  };

  const handleClearHistory = async () => {
    try {
      await fetch("/api/history", { method: "DELETE" });
      setContentHistory([]);
      setSelectedHistoryId(null);
    } catch (err) {
      console.error("Failed to clear history:", err);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#0a0a0c] text-neutral-100">
      <Navbar
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        isSidebarOpen={isSidebarOpen}
      />

      <div className="flex flex-1 relative">
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          history={contentHistory}
          activeHistoryId={selectedHistoryId}
          onSelectHistoryItem={handleSelectHistoryItem}
          onNewSession={handleNewSession}
          onClearHistory={handleClearHistory}
        />

        {/* Main Content Area */}
        <main className="flex-1 px-4 py-8 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full overflow-y-auto">

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-white">
                AI Content Studio
              </h1>
              <p className="mt-1.5 text-sm text-neutral-400">
                A context-aware AI assistant for content creation, social media, and marketing. Ask questions, request posts, get ideas, or brief a full campaign.
              </p>
            </div>

            {/* UX States Control Panel */}
            <div className="flex flex-wrap items-center gap-1.5 rounded-2xl border border-white/[0.07] bg-white/[0.03] p-2">
              <span className="px-2 text-xs font-medium text-neutral-400 uppercase tracking-wider">
                Preview:
              </span>

              <button
                type="button"
                onClick={() => {
                  setIsGenerating(false);
                  setHasOutput(true);
                  setErrorMessage("");
                  if (!generatedContent) {
                    setGeneratedContent({
                      id: "demo-1",
                      title: "Edge Computing for Industrial IoT",
                      topic: "Edge Computing for Industrial IoT (IIoT)",
                      tone: generationMeta.tone,
                      model: generationMeta.model,
                      status: "Draft",
                      content: `Edge Computing for Industrial IoT\n\nIn modern smart manufacturing, milliseconds matter. As industrial plants deploy thousands of high-fidelity sensors measuring pressure, vibration, and temperature, transmitting all this data to a centralized cloud introduces significant bottlenecks.\n\nKey Solution Principles\n\nBy positioning edge gateways directly on the factory floor, organizations can preprocess telemetry locally:\n- Anomaly Detection: Identifying machine wear within 5ms using local inference.\n- Data Aggregation: Transmitting only critical state changes to reduce cloud bandwidth.\n- Fail-safe Autonomy: Maintaining operations even during internet outages.\n\nBusiness Outcomes\n\nImplementing edge architecture at Apexium Technologies resulted in a 45% reduction in network costs and improved hardware failure response times by 82%.`
                    });
                  }
                }}
                className="flex items-center gap-1.5 rounded-xl px-2.5 py-1.5 text-xs font-medium text-neutral-400 hover:bg-white/[0.05] hover:text-neutral-200 transition-colors"
              >
                <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
                <span>Success</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsGenerating(true);
                  setHasOutput(false);
                  setErrorMessage("");
                }}
                className="flex items-center gap-1.5 rounded-xl px-2.5 py-1.5 text-xs font-medium text-neutral-400 hover:bg-white/[0.05] hover:text-neutral-200 transition-colors"
              >
                <RefreshCw className="h-3.5 w-3.5 text-amber-400 animate-spin" />
                <span>Loading</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsGenerating(false);
                  setHasOutput(false);
                  setErrorMessage("Unable to connect to AI service. Please check your network connection and try again.");
                }}
                className="flex items-center gap-1.5 rounded-xl px-2.5 py-1.5 text-xs font-medium text-neutral-400 hover:bg-white/[0.05] hover:text-neutral-200 transition-colors"
              >
                <span className="h-3.5 w-3.5 text-rose-400 text-sm font-bold flex items-center justify-center">!</span>
                <span>Error</span>
              </button>

              <button
                type="button"
                onClick={handleNewSession}
                className="flex items-center gap-1.5 rounded-xl border-l border-white/[0.07] pl-3 pr-2.5 py-1.5 text-xs font-medium text-neutral-400 hover:text-neutral-300 transition-colors"
              >
                <RefreshCw className="h-3 w-3" />
                <span>Reset</span>
              </button>
            </div>
          </div>

          {/* Main Workspace Grid */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 items-start">
            <div className="lg:col-span-5">
              <ContentGeneratorForm
                onSubmit={handleGenerate}
                isLoading={isGenerating}
                errorMessage={errorMessage}
                onDismissError={() => setErrorMessage("")}
                topicValue={topic}
                onTopicChange={setTopic}
              />
            </div>

            <div className="lg:col-span-7 h-full">
              <ContentPreview
                isLoading={isGenerating}
                hasOutput={hasOutput}
                contentItem={generatedContent}
                tone={generationMeta.tone}
                model={generationMeta.model}
                isSaving={isSaving}
                isApproving={isApproving}
                onSave={handleSaveContent}
                onApprove={handleApproveContent}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
