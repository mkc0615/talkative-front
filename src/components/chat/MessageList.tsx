'use client';
import React from 'react';
import { MessageBubble } from './MessageBubble';

interface Message {
  id: string;
  conversationId: string;
  content: string;
  self: boolean;
  status?: 'sending' | 'sent' | 'delivered' | 'read' | 'failed';
}

interface MessageListProps {
  messages: Message[];
}

export const MessageList: React.FC<MessageListProps> = ({ messages }) => (
  <div className="flex flex-col gap-0 px-6 py-4 overflow-y-auto flex-1">
    {messages.map((msg, idx) => {
      const prev = messages[idx - 1];
      const grouped = prev && prev.self === msg.self;
      return (
        <MessageBubble
          key={msg.id}
          content={msg.content}
          self={msg.self}
          status={msg.status}
          grouped={grouped}
        />
      );
    })}
  </div>
); 