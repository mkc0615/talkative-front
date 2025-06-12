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
          avatarSrc={conv.avatarSrc}
          lastMessage={conv.lastMessage}
          time={conv.time}
          status={conv.status}
          active={conv.id === selectedConversationId}
          onClick={() => selectConversation(conv.id)}
        />
      ))}
    </div>
  );
}; 