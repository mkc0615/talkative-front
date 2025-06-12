import React from 'react';
import { Avatar } from '../ui/avatar/Avatar';
import { StatusDot } from '../ui/StatusDot';

interface ConversationListItemProps {
  name: string;
  avatarSrc?: string;
  lastMessage: string;
  time: string;
  active?: boolean;
  unread?: boolean;
  status?: 'online' | 'offline' | 'unread';
  onClick?: () => void;
}

export const ConversationListItem: React.FC<ConversationListItemProps> = ({
  name,
  avatarSrc,
  lastMessage,
  time,
  active,
  unread,
  status = 'offline',
  onClick,
}) => (
  <div
    className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-colors select-none ${
      active ? 'bg-accent/30' : 'hover:bg-bg-bubble-other/60'
    }`}
    onClick={onClick}
  >
    <Avatar src={avatarSrc} size="md" status={status}>
      {!avatarSrc && name[0]}
    </Avatar>
    <div className="flex-1 min-w-0">
      <div className="flex justify-between items-center">
        <span className="font-semibold text-text-main truncate">{name}</span>
        <span className="text-xs text-text-secondary ml-2 whitespace-nowrap">{time}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs text-text-secondary truncate max-w-[120px]">{lastMessage}</span>
        {unread && <span className="ml-2 w-2 h-2 rounded-full bg-status-unread inline-block" />}
      </div>
    </div>
  </div>
); 