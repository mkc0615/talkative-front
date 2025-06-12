'use client';
import React from 'react';
import { MessageBubble } from './MessageBubble';

interface Message {
  id: string;
  conversationId: string;
  content: string;
  self: boolean;
}

interface MessageListProps {
  messages: Message[];
}

export const MessageList: React.FC<MessageListProps> = ({ messages }) => (
  <div className="flex flex-col gap-1 px-6 py-4 overflow-y-auto flex-1">
    {messages.map((msg) => (
      <MessageBubble key={msg.id} content={msg.content} self={msg.self} />
    ))}
  </div>
); 