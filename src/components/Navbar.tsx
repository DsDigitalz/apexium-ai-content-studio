"use client";

import React, { useState } from "react";
import { Menu, X, ChevronDown, User, Settings, HelpCircle, LogOut } from "lucide-react";

interface NavbarProps {
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
}

export default function Navbar({ onToggleSidebar, isSidebarOpen }: NavbarProps) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/[0.06] bg-[#0a0a0c]/90 backdrop-blur-xl backdrop-saturate-150 transition-colors duration-300">
      <div className="mx-aut flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Left Side: Toggle & Brand */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onToggleSidebar}
            className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.04] text-neutral-400 transition-all hover:bg-white/[0.08] hover:text-neutral-200 active:scale-95 md:hidden"
            aria-label="Toggle Sidebar"
          > 
            {isSidebarOpen ? <X className="h-4.5 w-4.5" /> : <Menu className="h-4.5 w-4.5" />}
          </button>
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <img
              src="/apexium logo.png"
              alt="Apexium AI Content Studio"
              className="h-15 w-auto object-contain"
              draggable={false}
            />
            <div className="hidden items-center gap-2 sm:flex">
              <span className="h-4 w-px bg-white/[0.10]" />
              <span className="text-xs font-medium tracking-wide text-neutral-400">
                Content Studio
              </span>
            </div>
          </div>

        </div>

        {/* Right Side: Tools & Profile */}
        <div className="flex items-center gap-3">

          {/* Notifications Button */}
          {/* <div className="relative">
            <button
              onClick={() => {
                setIsNotificationsOpen(!isNotificationsOpen);
                setIsProfileOpen(false);
              }}
              className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.04] text-neutral-400 transition-all hover:bg-white/[0.08] hover:text-neutral-200"
            >
             
              <span className="absolute top-2 right-2 flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400 opacity-75"></span>
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-violet-500"></span>
              </span>
            </button>

            {isNotificationsOpen && (
              <div className="absolute right-0 top-full mt-2 w-80 origin-top-right rounded-2xl border border-white/[0.08] bg-[#141416] p-4 shadow-2xl shadow-black/50 ring-1 ring-black/5">
                <div className="flex items-center justify-between border-b border-white/[0.06] pb-2.5">
                  <h4 className="text-sm font-medium text-white">Notifications</h4>
                  <span className="rounded-full bg-indigo-500/20 border border-indigo-500/20 px-2 py-0.5 text-xs font-medium text-indigo-400">2 New</span>
                </div>
                <div className="mt-3 space-y-1">
                  {[
                    { title: "Gemini 2.0 Flash Model Upgraded", time: "10 minutes ago" },
                    { title: "Weekly usage summary report ready", time: "2 hours ago" }
                  ].map((n, i) => (
                    <div key={i} className="flex flex-col gap-0.5 rounded-xl px-3 py-2.5 hover:bg-white/[0.04] cursor-pointer transition-colors">
                      <span className="text-xs font-medium text-neutral-200">{n.title}</span>
                      <span className="text-xs text-neutral-500">{n.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div> */}

          {/* Profile Dropdown */}
          {/* <div className="relative">
            <button
              onClick={() => {
                setIsProfileOpen(!isProfileOpen);
                setIsNotificationsOpen(false);
              }}
              className="flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.04] px-2.5 py-1.5 text-neutral-400 transition-all hover:bg-white/[0.08] hover:text-neutral-200"
            >
              <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-gradient-to-tr from-indigo-500 to-violet-500 text-3xs font-bold text-white shadow-sm">
                JD
              </div>
              <span className="hidden text-xs font-medium text-neutral-300 sm:inline-block">John Doe</span>
              <ChevronDown className="h-3.5 w-3.5 opacity-60" />
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 top-full mt-2 w-56 origin-top-right rounded-2xl border border-white/[0.08] bg-[#141416] p-1.5 shadow-2xl shadow-black/50">
                <div className="border-b border-white/[0.06] px-3 py-3">
                  <p className="text-xs text-neutral-500">Signed in as</p>
                  <p className="truncate text-sm font-medium text-white">john.doe@apexium.com</p>
                </div>
                <div className="py-1.5 space-y-0.5">
                  {[
                    { icon: User, label: "My Profile" },
                    { icon: Settings, label: "Settings" },
                    { icon: HelpCircle, label: "Help & Docs" },
                  ].map(({ icon: Icon, label }) => (
                    <button key={label} className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left text-xs font-medium text-neutral-400 transition-all hover:bg-white/[0.05] hover:text-neutral-200">
                      <Icon className="h-3.5 w-3.5 opacity-60" /> {label}
                    </button>
                  ))}
                </div>
                <div className="border-t border-white/[0.06] pt-1.5">
                  <button className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left text-xs font-medium text-rose-400 transition-all hover:bg-rose-500/10">
                    <LogOut className="h-3.5 w-3.5 opacity-75" /> Sign Out
                  </button>
                </div>
              </div>
            )}
          </div> */}
        </div>
      </div>
    </header>
  );
}
