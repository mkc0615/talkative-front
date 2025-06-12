'use client';
import React from 'react';
import { Avatar } from '../ui/avatar/Avatar';

interface ChatHeaderProps {
  name: string;
  avatarSrc?: string;
  role?: string;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ name, avatarSrc, role }) => (
  <div className="flex items-center gap-4 px-6 py-4 border-b border-bg-bubble-other/40 bg-bg-main">
    <Avatar src={avatarSrc} size="md" status="offline">
      {!avatarSrc && name[0]}
    </Avatar>
    <div className="flex flex-col">
      <span className="font-semibold text-text-main text-base leading-tight">{name}</span>
      {role && <span className="text-xs text-text-secondary leading-tight">{role}</span>}
    </div>
  </div>
); 