'use client';
import React from 'react';
import { ChatHeader } from './ChatHeader';
import { MessageList } from './MessageList';
import { MessageInput } from './MessageInput';
import { useChatStore } from '../../store/chatStore';
import { useShallow } from 'zustand/shallow';

export const ChatWindow: React.FC = () => {
  const { selectedConversationId, conversations, messages } = useChatStore(useShallow(
    (s) => ({
      selectedConversationId: s.selectedConversationId,
      conversations: s.conversations,
      messages: s.messages,
    })
  ));

  const conversation = conversations.find((c) => c.id === selectedConversationId);
  const filteredMessages = messages.filter((m) => m.conversationId === selectedConversationId);

  if (!conversation) return <div className="flex-1 flex items-center justify-center text-text-secondary">No conversation selected</div>;

  return (
    <section className="flex flex-col flex-1 h-full bg-bg-main">
      <ChatHeader
        name={conversation.name}
        avatarSrc={conversation.avatarSrc}
        role={conversation.role}
      />
      <MessageList messages={filteredMessages} />
      <MessageInput />
    </section>
  );
}; 
