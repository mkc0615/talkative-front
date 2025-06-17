'use client';
import React from 'react';
import { SidebarMenu } from './SidebarMenu';
import { ConversationList } from './ConversationList';
import { Input } from '../ui/input/Input';
import { Button } from '../ui/button/Button';

export const Sidebar: React.FC = () => {
  return (
    <aside className="flex h-full bg-bg-sidebar text-text-main">
      {/* Vertical icon menu */}
      <SidebarMenu />
      {/* Main sidebar content */}
      <div className="flex flex-col w-72 h-full bg-bg-sidebar border-r border-bg-bubble-other/40">
        {/* Add new chat */}
        <div className="flex items-center gap-2 px-4 py-4">
          <Input
            placeholder="Add new chat"
            className="flex-1 bg-bg-bubble-other text-text-main placeholder-text-secondary border-none shadow-none"
          />
          <Button size="sm" variant="primary" aria-label="Add chat">
            <span className="i-lucide-plus w-5 h-5" />
          </Button>
        </div>
        {/* Conversation list */}
        <div className="flex-1 overflow-y-auto">
          <ConversationList />
        </div>
      </div>
    </aside>
  );
}; 