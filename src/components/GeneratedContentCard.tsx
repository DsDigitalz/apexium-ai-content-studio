"use client";

import React, { useState } from "react";
import { Copy, Check, CheckCircle2, Clock, FileText, Send, Sparkles } from "lucide-react";

interface GeneratedContentCardProps {
  topic?: string;
  tone?: string;
  model?: string;
  onApprove?: () => void;
}

const MOCK_OUTPUT_TEXT = `## Overcoming Latency: Edge Computing for Industrial IoT (IIoT)

In modern smart manufacturing, microseconds dictate success. As industrial plants deploy thousands of high-fidelity sensors measuring pressure, vibration, and temperature, transmitting this massive stream of telemetry to a centralized cloud introduces severe bottlenecks. This is where **Edge Computing** shifts the paradigm.

### The Problem: Cloud Backhaul Overload
Historically, IoT architectures pushed all telemetry to central databases. Under this model, operators encounter:
1. **Network Congestion:** High bandwidth consumption choking local gateways.
2. **Jitter & Latency:** Multi-second roundtrips preventing real-time control loops.
3. **Connectivity Dependency:** If connection drops, safety critical shutdown metrics fail.

### The Solution: Deploying Intelligence at the Edge
By positioning edge gateways (powered by lightweight runtimes) directly on the factory floor, companies preprocess telemetry locally:
- **Anomaly Detection:** Machine learning inference identifies machine wear within 5ms.
- **Data Aggregation:** Filter out normal telemetry, transmitting only critical state changes.
- **Fail-safe Autonomy:** Local controllers maintain operations even during internet blackouts.

### Key Business Outcomes
Implementing this edge architecture at **Apexium Technologies** resulted in a **45% reduction** in network operational costs and improved hardware failure response times by **82%**. The transition ensures both cost-efficiency and unmatched physical plant safety.`;

export default function GeneratedContentCard({ 
  tone = "Professional", 
  model = "Google Gemini 1.5 Pro",
  onApprove 
}: GeneratedContentCardProps) {
  const [copied, setCopied] = useState(false);
  const [approved, setApproved] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(MOCK_OUTPUT_TEXT);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleApprove = () => {
    setApproved(true);
    if (onApprove) {
      onApprove();
    }
    setTimeout(() => setApproved(false), 3000);
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900/60 transition-all duration-300">
      
      {/* Visual background accents for high-end feel */}
      <div className="absolute top-0 right-0 h-40 w-40 rounded-full bg-indigo-500/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 h-40 w-40 rounded-full bg-emerald-500/5 blur-3xl pointer-events-none" />

      {/* Card Header metadata */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4 dark:border-slate-800/80 mb-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded-md bg-indigo-50 px-2 py-1 text-3xs font-semibold text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-400">
            <Sparkles className="h-2.5 w-2.5 animate-pulse" />
            <span>{model}</span>
          </span>
          <span className="inline-flex items-center gap-1 rounded-md bg-slate-50 px-2 py-1 text-3xs font-semibold text-slate-600 dark:bg-slate-850 dark:text-slate-400">
            Tone: <span className="text-slate-900 dark:text-slate-300 font-bold">{tone}</span>
          </span>
        </div>

        <div className="flex items-center gap-3 text-3xs text-slate-400 dark:text-slate-500 font-medium">
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>~2 min read</span>
          </span>
          <span className="h-3 w-px bg-slate-200 dark:bg-slate-800" />
          <span className="flex items-center gap-1">
            <FileText className="h-3 w-3" />
            <span>218 words</span>
          </span>
        </div>
      </div>

      {/* Card Typography Content */}
      <article className="prose prose-slate dark:prose-invert prose-xs max-w-none mb-6">
        <h2 className="text-base font-bold text-slate-950 dark:text-white leading-tight mb-3">
          Overcoming Latency: Edge Computing for Industrial IoT (IIoT)
        </h2>
        <p className="text-xs text-slate-600 dark:text-slate-350 leading-relaxed mb-4">
          In modern smart manufacturing, microseconds dictate success. As industrial plants deploy thousands of high-fidelity sensors measuring pressure, vibration, and temperature, transmitting this massive stream of telemetry to a centralized cloud introduces severe bottlenecks. This is where <strong className="text-slate-950 dark:text-white font-semibold">Edge Computing</strong> shifts the paradigm.
        </p>
        
        <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-4 mb-2">
          The Problem: Cloud Backhaul Overload
        </h3>
        <p className="text-xs text-slate-600 dark:text-slate-350 leading-relaxed mb-3">
          Historically, IoT architectures pushed all telemetry to central databases. Under this model, operators encounter:
        </p>
        <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-600 dark:text-slate-350 mb-4">
          <li><strong className="text-slate-900 dark:text-slate-200 font-semibold">Network Congestion:</strong> High bandwidth consumption choking local gateways.</li>
          <li><strong className="text-slate-900 dark:text-slate-200 font-semibold">Jitter & Latency:</strong> Multi-second roundtrips preventing real-time control loops.</li>
          <li><strong className="text-slate-900 dark:text-slate-200 font-semibold">Connectivity Dependency:</strong> If connection drops, safety critical shutdown metrics fail.</li>
        </ul>
        
        <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-4 mb-2">
          The Solution: Deploying Intelligence at the Edge
        </h3>
        <p className="text-xs text-slate-600 dark:text-slate-350 leading-relaxed mb-3">
          By positioning edge gateways (powered by lightweight runtimes) directly on the factory floor, companies preprocess telemetry locally:
        </p>
        <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-600 dark:text-slate-350 mb-4">
          <li><strong className="text-slate-900 dark:text-slate-200 font-semibold">Anomaly Detection:</strong> Machine learning inference identifies machine wear within 5ms.</li>
          <li><strong className="text-slate-900 dark:text-slate-200 font-semibold">Data Aggregation:</strong> Filter out normal telemetry, transmitting only critical state changes.</li>
          <li><strong className="text-slate-900 dark:text-slate-200 font-semibold">Fail-safe Autonomy:</strong> Local controllers maintain operations even during internet blackouts.</li>
        </ul>
      </article>

      {/* Action Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100 pt-4 dark:border-slate-800/80">
        
        {/* Copy utility */}
        <button
          type="button"
          onClick={handleCopy}
          className="flex w-full sm:w-auto items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-600 transition-all hover:bg-slate-50 hover:text-slate-900 active:scale-97 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4 text-emerald-500 animate-bounce" />
              <span className="text-emerald-600 dark:text-emerald-450 font-bold">Copied to Clipboard!</span>
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" />
              <span>Copy Response</span>
            </>
          )}
        </button>

        {/* Approve & Automate action */}
        <button
          type="button"
          onClick={handleApprove}
          className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-2.5 text-xs font-semibold text-white shadow-lg shadow-emerald-600/10 transition-all hover:bg-emerald-500 hover:scale-[1.01] hover:shadow-emerald-600/20 active:scale-98"
        >
          {approved ? (
            <>
              <CheckCircle2 className="h-4 w-4 animate-ping" />
              <span>Pipeline Triggered!</span>
            </>
          ) : (
            <>
              <Send className="h-4 w-4" />
              <span>Approve & Automate</span>
            </>
          )}
        </button>

      </div>

      {/* Success Automation Slide Banner */}
      {approved && (
        <div className="absolute inset-x-0 bottom-0 bg-emerald-50 border-t border-emerald-100 p-3 text-center transition-all duration-300 dark:bg-emerald-950/80 dark:border-emerald-900/60 animate-slide-up">
          <p className="text-2xs font-semibold text-emerald-800 dark:text-emerald-300 flex items-center justify-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            Content approved. Automated campaign queued for publishing.
          </p>
        </div>
      )}

    </div>
  );
}
