'use client';
import React from 'react';
import { Sidebar } from '../components/chat/Sidebar';
import { ChatWindow } from '../components/chat/ChatWindow';

export default function Home() {
  return (
    <div className="flex h-screen w-screen bg-bg-main overflow-hidden">
      <Sidebar />
      <ChatWindow />
    </div>
  );
}
