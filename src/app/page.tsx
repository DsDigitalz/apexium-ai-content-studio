"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import ContentGeneratorForm from "@/components/ContentGeneratorForm";
import ContentPreview from "@/components/ContentPreview";
import { Play, Sparkles, RefreshCw, AlertTriangle } from "lucide-react";

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasOutput, setHasOutput] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [generationMeta, setGenerationMeta] = useState({
    tone: "Professional",
    model: "Google Gemini 1.5 Pro",
  });

  const handleGenerate = (data: { topic: string; tone: string; model: string }) => {
    setIsLoading(true);
    setHasOutput(false);
    setErrorMessage("");
    setGenerationMeta({
      tone: data.tone,
      model: data.model,
    });
    
    // Simulate generation pipeline runtime delay (1.8 seconds)
    setTimeout(() => {
      setIsLoading(false);
      setHasOutput(true);
    }, 1800);
  };

  // State-toggle helpers for design review demonstrations
  const setDemoSuccess = () => {
    setIsLoading(false);
    setHasOutput(true);
    setErrorMessage("");
  };

  const setDemoLoading = () => {
    setIsLoading(true);
    setHasOutput(false);
    setErrorMessage("");
  };

  const setDemoError = () => {
    setIsLoading(false);
    setHasOutput(false);
    setErrorMessage("API connection timeout. The Google Gemini model failed to respond within 15000ms. Please check your API key configurations.");
  };

  const resetWorkspace = () => {
    setIsLoading(false);
    setHasOutput(false);
    setErrorMessage("");
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-slate-900 dark:text-slate-100">
      <Navbar 
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
        isSidebarOpen={isSidebarOpen} 
      />
      
      <div className="flex flex-1 relative">
        <Sidebar 
          isOpen={isSidebarOpen} 
          onClose={() => setIsSidebarOpen(false)} 
        />
        
        {/* Main Content Area Container */}
        <main className="flex-1 px-4 py-8 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full overflow-y-auto">
          
          {/* Header section with page title & State controls */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-2xl">
                AI Content Studio
              </h1>
              <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400">
                Draft and generate social media copies, press releases, blog drafts, and emails with enterprise-grade models.
              </p>
            </div>

            {/* Premium UX Design Review State Panel */}
            <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-slate-200 bg-white p-2.5 shadow-2xs dark:border-slate-800 dark:bg-slate-950">
              <span className="px-2 text-3xs font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                UX States:
              </span>
              
              <button
                type="button"
                onClick={setDemoSuccess}
                className="flex items-center gap-1 rounded-lg px-2 py-1 text-3xs font-bold text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-900"
              >
                <Sparkles className="h-3 w-3 text-indigo-500" />
                <span>Success</span>
              </button>

              <button
                type="button"
                onClick={setDemoLoading}
                className="flex items-center gap-1 rounded-lg px-2 py-1 text-3xs font-bold text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-900"
              >
                <Play className="h-3 w-3 text-amber-500" />
                <span>Loading</span>
              </button>

              <button
                type="button"
                onClick={setDemoError}
                className="flex items-center gap-1 rounded-lg px-2 py-1 text-3xs font-bold text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-900"
              >
                <AlertTriangle className="h-3 w-3 text-rose-500" />
                <span>Error</span>
              </button>

              <button
                type="button"
                onClick={resetWorkspace}
                className="flex items-center gap-1 rounded-lg px-2 py-1 text-3xs font-bold text-slate-600 hover:bg-slate-55 dark:text-slate-400 dark:hover:bg-slate-900 border-l border-slate-100 dark:border-slate-850 pl-2"
              >
                <RefreshCw className="h-3 w-3 text-slate-400" />
                <span>Reset</span>
              </button>
            </div>
          </div>
          
          {/* Main workspace layout: Form on left/top, preview on right/bottom */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
            <div className="lg:col-span-6 xl:col-span-5">
              <ContentGeneratorForm 
                onSubmit={handleGenerate} 
                isLoading={isLoading} 
                errorMessage={errorMessage}
                onDismissError={() => setErrorMessage("")}
              />
            </div>
            
            <div className="lg:col-span-6 xl:col-span-7 h-full">
              <ContentPreview 
                isLoading={isLoading} 
                hasOutput={hasOutput}
                tone={generationMeta.tone}
                model={generationMeta.model}
                onApprove={() => console.log("Approval event triggered.")}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
