import { z } from 'zod';
import apiClient from './api';
import { Message, Conversation } from '../types/chat';

const MessageResponseSchema = z.object({
  id: z.string(),
  content: z.string(),
  senderId: z.string(),
  conversationId: z.string(),
  timestamp: z.string(),
  status: z.enum(['sending', 'sent', 'delivered', 'read', 'failed']).default('sent'),
  type: z.enum(['text', 'image', 'file', 'voice', 'video']).default('text'),
  replyTo: z.string().optional(),
});

const ConversationResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.enum(['direct', 'group']).default('direct'),
  participants: z.array(z.object({
    id: z.string(),
    username: z.string(),
    email: z.string(),
    avatar: z.string().optional(),
    status: z.enum(['online', 'offline', 'away', 'busy']).default('offline'),
  })).default([]),
  unreadCount: z.number().default(0),
  isArchived: z.boolean().default(false),
  createdAt: z.string(),
  updatedAt: z.string(),
  lastMessage: MessageResponseSchema.optional(),
  lastMessageTime: z.string().optional(),
});

export const chatService = {
  async getConversations(): Promise<Conversation[]> {
    const response = await apiClient.get('/api/conversations');
    const parsed = z.array(ConversationResponseSchema).parse(response.data);
    return parsed.map(conv => ({
      ...conv,
      createdAt: new Date(conv.createdAt),
      updatedAt: new Date(conv.updatedAt),
      lastMessage: conv.lastMessage ? {
        ...conv.lastMessage,
        timestamp: new Date(conv.lastMessage.timestamp),
      } : undefined,
    }));
  },

  async getMessages(conversationId: string, page = 0, limit = 50): Promise<Message[]> {
    const response = await apiClient.get(`/api/messages/${conversationId}`, {
      params: { page, limit }
    });
    const parsed = z.array(MessageResponseSchema).parse(response.data);
    return parsed.map(msg => ({
      ...msg,
      timestamp: new Date(msg.timestamp),
    }));
  },

  async sendMessage(conversationId: string, content: string): Promise<Message> {
    const response = await apiClient.post('/api/messages', {
      conversationId,
      content,
    });
    const parsed = MessageResponseSchema.parse(response.data);
    return {
      ...parsed,
      timestamp: new Date(parsed.timestamp),
    };
  },

  async markAsRead(conversationId: string): Promise<void> {
    await apiClient.patch(`/api/conversations/${conversationId}/read`);
  },

  async createConversation(participantId: string): Promise<Conversation> {
    const response = await apiClient.post('/api/conversations', {
      participantId,
    });
    const parsed = ConversationResponseSchema.parse(response.data);
    return {
      ...parsed,
      createdAt: new Date(parsed.createdAt),
      updatedAt: new Date(parsed.updatedAt),
      lastMessage: parsed.lastMessage ? {
        ...parsed.lastMessage,
        timestamp: new Date(parsed.lastMessage.timestamp),
      } : undefined,
    };
  },
};