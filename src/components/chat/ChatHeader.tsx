'use client';
import React, { useState } from 'react';
import { Avatar } from '../ui/avatar/Avatar';

interface ChatHeaderProps {
  name: string;
  avatarSrc?: string;
  role?: string;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ name, avatarSrc, role }) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="flex items-center gap-4 px-6 py-4 border-b border-bg-bubble-other/40 bg-bg-main relative">
      <Avatar src={avatarSrc} size="md" status="offline">
        {!avatarSrc && name[0]}
      </Avatar>
      <div className="flex flex-col flex-1">
        <span className="font-semibold text-text-main text-base leading-tight">{name}</span>
        {role && <span className="text-xs text-text-secondary leading-tight">{role}</span>}
      </div>
      <div className="relative">
        <button
          className="p-2 rounded-full hover:bg-bg-bubble-other focus:outline-none"
          aria-label="Open settings"
          onClick={() => setShowMenu((v) => !v)}
        >
          <span className="i-lucide-settings w-5 h-5 text-text-secondary" />
        </button>
        {showMenu && (
          <div className="absolute right-0 mt-2 w-40 bg-bg-bubble-other rounded-lg shadow-md z-20 py-2">
            <button className="block w-full text-left px-4 py-2 text-sm text-text-main hover:bg-bg-main">Profile</button>
            <button className="block w-full text-left px-4 py-2 text-sm text-text-main hover:bg-bg-main">Theme</button>
            <button className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-bg-main">Logout</button>
          </div>
        )}
      </div>
    </div>
  );
}; 