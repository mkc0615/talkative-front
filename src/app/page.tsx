'use client';
import React, { useState } from 'react';
import { Sidebar } from '../components/chat/Sidebar';
import { ChatWindow } from '../components/chat/ChatWindow';

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-outer">
      <div className="relative flex bg-bg-main rounded-2xl shadow-xl max-w-4xl w-full h-[700px] overflow-hidden">
        {/* Sidebar: hidden on mobile unless open */}
        <div className={`h-full transition-transform duration-200 z-20 fixed md:static top-0 left-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
          style={{ width: 304 }} // w-72
        >
          <Sidebar />
        </div>
        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div className="fixed inset-0 bg-black/40 z-10 md:hidden" onClick={() => setSidebarOpen(false)} />
        )}
        {/* Main chat window */}
        <div className="flex-1 flex flex-col h-full">
          {/* Hamburger for mobile */}
          <button
            className="md:hidden absolute top-4 left-4 z-30 bg-bg-bubble-other p-2 rounded-lg shadow-md"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open sidebar"
          >
            <span className="i-lucide-menu w-6 h-6 text-text-main" />
          </button>
          <ChatWindow />
        </div>
      </div>
    </div>
  );
}
