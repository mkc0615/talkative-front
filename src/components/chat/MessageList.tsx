'use client';
import React from 'react';
import { MessageBubble } from './MessageBubble';
import { Message } from '../../types/chat';
import { useChatStore } from '../../store/chatStore';

interface MessageListProps {
  messages: Message[];
}

export const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  const currentUser = useChatStore(state => state.currentUser);
  
  return (
  <div className="flex flex-col gap-0 px-6 py-4 overflow-y-auto flex-1">
    {messages.map((msg, idx) => {
      const prev = messages[idx - 1];
      const isSelf = msg.senderId === currentUser?.id;
      const prevIsSelf = prev ? prev.senderId === currentUser?.id : false;
      const grouped = prev && prevIsSelf === isSelf;
      return (
        <MessageBubble
          key={msg.id}
          content={msg.content}
          self={isSelf}
          status={msg.status}
          grouped={grouped}
        />
      );
    })}
  </div>
  );
}; 