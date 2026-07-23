"use client";

import React, { useState } from "react";
import { Menu, X, Bell, ChevronDown, User, Settings, HelpCircle, LogOut, Sparkles } from "lucide-react";

interface NavbarProps {
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
}

export default function Navbar({ onToggleSidebar, isSidebarOpen }: NavbarProps) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/80 backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-950/80 transition-colors duration-300">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Left Side: Toggle & Brand */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={onToggleSidebar}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-500 transition-all hover:bg-slate-100 hover:text-slate-700 active:scale-95 md:hidden dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200"
            aria-label="Toggle Sidebar"
          >
            {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 via-violet-600 to-pink-500 shadow-md shadow-indigo-500/20">
              <Sparkles className="h-5 w-5 text-white animate-pulse" />
            </div>
            <span className="bg-gradient-to-r from-slate-950 via-slate-800 to-slate-900 bg-clip-text text-lg font-bold tracking-tight text-transparent dark:from-white dark:via-slate-200 dark:to-slate-100">
              Apexium <span className="bg-gradient-to-r from-indigo-500 to-violet-600 bg-clip-text text-transparent">AI</span>
            </span>
            <span className="hidden rounded-full border border-indigo-200 bg-indigo-50/50 px-2 py-0.5 text-xs font-semibold text-indigo-600 dark:border-indigo-800/30 dark:bg-indigo-900/20 dark:text-indigo-400 sm:inline-block">
              Studio
            </span>
          </div>
        </div>

        {/* Right Side: Tools & Profile */}
        <div className="flex items-center gap-4">
          {/* Notifications Button */}
          <div className="relative">
            <button
              onClick={() => {
                setIsNotificationsOpen(!isNotificationsOpen);
                setIsProfileOpen(false);
              }}
              className="relative flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-500 transition-all hover:bg-slate-100 hover:text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-2 right-2 flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-violet-500"></span>
              </span>
            </button>

            {isNotificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 origin-top-right rounded-xl border border-slate-200 bg-white p-4 shadow-xl ring-1 ring-black/5 dark:border-slate-800 dark:bg-slate-950">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2 dark:border-slate-900">
                  <h4 className="text-sm font-semibold text-slate-900 dark:text-white">Notifications</h4>
                  <span className="rounded bg-indigo-50 px-1.5 py-0.5 text-2xs font-medium text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400">
                    2 New
                  </span>
                </div>
                <div className="mt-2 space-y-3">
                  <div className="flex flex-col gap-1 rounded-lg p-2 hover:bg-slate-50 dark:hover:bg-slate-900/50 cursor-pointer">
                    <span className="text-xs font-semibold text-slate-900 dark:text-white">Gemini 1.5 Flash Model Upgraded</span>
                    <span className="text-2xs text-slate-400">10 minutes ago</span>
                  </div>
                  <div className="flex flex-col gap-1 rounded-lg p-2 hover:bg-slate-50 dark:hover:bg-slate-900/50 cursor-pointer">
                    <span className="text-xs font-semibold text-slate-900 dark:text-white">Weekly usage summary report ready</span>
                    <span className="text-2xs text-slate-400">2 hours ago</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setIsProfileOpen(!isProfileOpen);
                setIsNotificationsOpen(false);
              }}
              className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 p-1.5 pr-3 text-slate-500 transition-all hover:bg-slate-100 hover:text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200"
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-tr from-indigo-500 to-violet-500 font-bold text-white shadow-sm shadow-indigo-500/10 text-xs">
                JD
              </div>
              <span className="hidden text-xs font-semibold text-slate-700 dark:text-slate-300 sm:inline-block">
                John Doe
              </span>
              <ChevronDown className="h-4 w-4 opacity-60" />
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl ring-1 ring-black/5 dark:border-slate-800 dark:bg-slate-950">
                <div className="border-b border-slate-100 px-3 py-2.5 dark:border-slate-900">
                  <p className="text-xs text-slate-400">Signed in as</p>
                  <p className="truncate text-sm font-semibold text-slate-800 dark:text-white">john.doe@apexium.com</p>
                </div>
                <div className="py-1.5 space-y-0.5">
                  <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs font-medium text-slate-700 transition-all hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-900/50">
                    <User className="h-4 w-4 opacity-75" /> My Profile
                  </button>
                  <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs font-medium text-slate-700 transition-all hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-900/50">
                    <Settings className="h-4 w-4 opacity-75" /> Settings
                  </button>
                  <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs font-medium text-slate-700 transition-all hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-900/50">
                    <HelpCircle className="h-4 w-4 opacity-75" /> Help & Docs
                  </button>
                </div>
                <div className="border-t border-slate-100 pt-1.5 dark:border-slate-900">
                  <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs font-medium text-red-600 transition-all hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/20">
                    <LogOut className="h-4 w-4 opacity-75" /> Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </header>
  );
}
