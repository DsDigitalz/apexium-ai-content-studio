"use client";

import React from "react";
import { usePathname } from "next/navigation";
import {
  PlusCircle,
  History,
  Layout,
  Settings,
  ChevronRight,
  Sparkles,
  Database,
  Trash2
} from "lucide-react";
import HistoryItemCard from "./HistoryItemCard";
import { GeneratedContentItem } from "./GeneratedContentCard";

interface SidebarHistoryItem {
  id: string;
  title: string;
  topic?: string;
  tone: string;
  model: string;
  date: string;
  content?: string;
  wordCount?: number;
  readTime?: string;
  status?: string;
}

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  history?: SidebarHistoryItem[];
  activeHistoryId?: string | null;
  onSelectHistoryItem?: (item: GeneratedContentItem) => void;
  onNewSession?: () => void;
  onClearHistory?: () => void;
}

export default function Sidebar({
  isOpen,
  onClose,
  history = [],
  activeHistoryId = null,
  onSelectHistoryItem,
  onNewSession,
  onClearHistory
}: SidebarProps) {
  const pathname = usePathname();

  const workspaceLinks = [
    { icon: Layout, label: "AI Playground", href: "/" },
    { icon: Database, label: "Prompt Templates", href: "/prompt-templates" },
    { icon: Settings, label: "API Settings", href: "/api-settings" },
  ];

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-45 bg-black/60 backdrop-blur-sm transition-opacity duration-300 md:hidden"
        />
      )}

      {/* Main Sidebar Shell */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-white/[0.06] bg-[#0f0f11]/95 backdrop-blur-2xl transition-transform duration-300 ease-in-out md:sticky md:top-14 md:z-30 md:h-[calc(100vh-3.5rem)] md:translate-x-0
          ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Sidebar Header (mobile) */}
        <div className="flex h-14 items-center justify-between px-5 border-b border-white/[0.06] md:hidden">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-indigo-400" />
            <span className="text-sm font-semibold text-white">Studio Menu</span>
          </div>
          <button
            onClick={onClose}
            className="rounded-xl p-1.5 hover:bg-white/[0.06] transition-colors"
          >
            <ChevronRight className="h-4 w-4 text-neutral-400 rotate-180" />
          </button>
        </div>

        {/* Sidebar Content Scrollable */}
        <div className="flex-1 overflow-y-auto px-4 py-5 space-y-6 custom-scrollbar">

          {/* Main Action */}
          <div>
            <button
              type="button"
              onClick={onNewSession}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-4 py-2.5 text-xs font-semibold text-white shadow-md shadow-indigo-500/15 transition-all hover:bg-indigo-500 hover:shadow-indigo-500/25 active:scale-98"
            >
              <PlusCircle className="h-4 w-4" />
              <span>New Studio Session</span>
            </button>
          </div>

          {/* Navigation Links */}
          <div className="space-y-1">
            <h3 className="px-3 mb-2 text-xs font-medium uppercase tracking-wider text-neutral-400">
              Workspace
            </h3>
            {workspaceLinks.map(({ icon: Icon, label, href }) => {
              const isActive = pathname === href;
              return (
                <a
                  key={href}
                  href={href}
                  className={`flex items-center justify-between rounded-xl px-3 py-2.5 text-xs font-medium transition-all
                    ${isActive
                      ? "bg-indigo-500/10 border border-indigo-500/20 text-indigo-400"
                      : "text-neutral-400 hover:bg-white/[0.04] hover:text-neutral-200 border border-transparent"
                    }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="h-4 w-4 opacity-80" />
                    <span>{label}</span>
                  </div>
                  {isActive && <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />}
                </a>
              );
            })}
          </div>

          {/* Content History Module */}
          <div className="space-y-3">
            <div className="flex items-center justify-between px-3">
              <h3 className="text-xs font-medium uppercase tracking-wider text-neutral-500 flex items-center gap-1.5">
                <History className="h-3.5 w-3.5" />
                <span>History</span>
              </h3>
              {history.length > 0 && (
                <button
                  type="button"
                  onClick={onClearHistory}
                  className="text-xs text-neutral-500 hover:text-rose-400 cursor-pointer flex items-center gap-1 transition-colors"
                >
                  <Trash2 className="h-3 w-3" />
                  <span>Clear</span>
                </button>
              )}
            </div>

            <div className="space-y-1.5">
              {history.length === 0 ? (
                <div className="rounded-xl border border-dashed border-white/[0.08] p-4 text-center">
                  <p className="text-xs text-neutral-400">No session history yet.</p>
                </div>
              ) : (
                history.map((item) => (
                  <HistoryItemCard
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    tone={item.tone}
                    model={item.model}
                    date={item.date}
                    isActive={activeHistoryId === item.id}
                    onClick={() => onSelectHistoryItem && onSelectHistoryItem({
                      id: item.id,
                      title: item.title,
                      topic: item.topic || item.title,
                      tone: item.tone,
                      model: item.model,
                      content: item.content,
                      wordCount: item.wordCount,
                      readTime: item.readTime,
                      status: item.status
                    })}
                  />
                ))
              )}
            </div>
          </div>
        </div>

        {/* Footer Area / Token Usage */}
        <div className="border-t border-white/[0.06] p-4">
          <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-3">
            <div className="flex justify-between text-xs font-medium text-neutral-500 mb-2">
              <span>Token Usage</span>
              <span className="text-indigo-400">64%</span>
            </div>
            <div className="h-1 w-full rounded-full bg-white/[0.08] overflow-hidden">
              <div className="h-full w-[64%] rounded-full bg-gradient-to-r from-indigo-500 to-violet-500"></div>
            </div>
            <p className="mt-2 text-xs text-neutral-500">
              64,120 / 100,000 monthly tokens used
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
