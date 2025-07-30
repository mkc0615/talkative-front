'use client';
import React from 'react';
import { ConversationListItem } from './ConversationListItem';
import { useChatStore } from '../../store/chatStore';
import { useShallow } from 'zustand/shallow';

export const ConversationList: React.FC = () => {
  const { conversations, selectedConversationId, selectConversation } = useChatStore(useShallow((s) => ({
    conversations: s.conversations,
    selectedConversationId: s.selectedConversationId,
    selectConversation: s.selectConversation,
  })));

  return (
    <div className="flex flex-col gap-1 py-2">
      {conversations.map((conv) => (
        <ConversationListItem
          key={conv.id}
          name={conv.name}
          avatarSrc={conv.participants[0]?.avatar}
          lastMessage={conv.lastMessage?.content || ''}
          time={conv.lastMessage?.timestamp ? new Date(conv.lastMessage.timestamp).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : ''}
          status={conv.participants[0]?.status === 'online' ? 'online' : 'offline'}
          active={conv.id === selectedConversationId}
          onClick={() => selectConversation(conv.id)}
        />
      ))}
    </div>
  );
}; 