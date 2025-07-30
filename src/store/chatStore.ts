import { create } from 'zustand';
import { Message, Conversation } from '../types/chat';
import { chatService } from '../services/chat';
import { websocketService } from '../services/websocket';
import { User } from '../services/auth';

interface ChatStore {
  // State
  conversations: Conversation[];
  messages: Message[];
  selectedConversationId: string;
  currentUser: User | null;
  isLoading: boolean;
  error: string | null;
  typingUsers: { [conversationId: string]: string[] };
  onlineUsers: Set<string>;
  
  // Actions
  selectConversation: (id: string) => void;
  loadConversations: () => Promise<void>;
  loadMessages: (conversationId: string) => Promise<void>;
  sendMessage: (conversationId: string, content: string) => Promise<void>;
  setCurrentUser: (user: User | null) => void;
  setTyping: (conversationId: string, userId: string, isTyping: boolean) => void;
  setUserOnline: (userId: string, isOnline: boolean) => void;
  addMessage: (message: Message) => void;
  updateMessageStatus: (messageId: string, status: Message['status']) => void;
  markAsRead: (conversationId: string) => void;
  setError: (error: string | null) => void;
  setLoading: (loading: boolean) => void;
  connectWebSocket: () => void;
  disconnectWebSocket: () => void;
}

interface LegacyConversation {
  id: string;
  name: string;
  avatarSrc?: string;
  lastMessage: string;
  time: string;
  status: 'online' | 'offline' | 'unread';
  role?: string;
}

interface LegacyMessage {
  id: string;
  conversationId: string;
  content: string;
  self: boolean;
}

const mockConversations: LegacyConversation[] = [
  {
    id: '1',
    name: 'Sarah Smith',
    avatarSrc: 'https://randomuser.me/api/portraits/women/44.jpg',
    lastMessage: 'Lorem Ipsum',
    time: '15:42',
    status: 'offline',
    role: 'UX/UI Designer',
  },
  {
    id: '2',
    name: 'Mary Taylor',
    avatarSrc: 'https://randomuser.me/api/portraits/women/65.jpg',
    lastMessage: 'Do you like it?',
    time: '15:41',
    status: 'offline',
  },
  {
    id: '3',
    name: 'Bruce Wilson',
    avatarSrc: 'https://randomuser.me/api/portraits/men/32.jpg',
    lastMessage: "OK Let's do it",
    time: '14:57',
    status: 'offline',
  },
  {
    id: '4',
    name: 'Davis',
    avatarSrc: 'https://randomuser.me/api/portraits/men/76.jpg',
    lastMessage: 'Hey Davis',
    time: '14:27',
    status: 'online',
  },
  {
    id: '5',
    name: 'Jaimie',
    avatarSrc: '',
    lastMessage: 'Say hello!',
    time: '',
    status: 'offline',
  },
];

const mockMessages: LegacyMessage[] = [
  { id: 'm1', conversationId: '1', content: 'Hello', self: true },
  { id: 'm2', conversationId: '1', content: "+ What's up?", self: true },
  { id: 'm3', conversationId: '1', content: 'Lorem Ipsum', self: false },
  { id: 'm4', conversationId: '1', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce a ex erat', self: false },
  { id: 'm5', conversationId: '1', content: 'Lorem ipsum', self: false },
  { id: 'm6', conversationId: '1', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', self: true },
  { id: 'm7', conversationId: '1', content: 'Lorem a ex erat. Fusce id neque sed enim vulputate dictum a a l', self: true },
  { id: 'm8', conversationId: '2', content: 'Hi Mary!', self: true },
  { id: 'm9', conversationId: '2', content: 'Do you like it?', self: false },
  { id: 'm10', conversationId: '3', content: 'OK Let\'s do it', self: false },
  { id: 'm11', conversationId: '4', content: 'Hey Davis', self: false },
  { id: 'm12', conversationId: '5', content: 'Say hello!', self: false },
];

export const useChatStore = create<ChatStore>((set, get) => ({
  // Initial state
  conversations: mockConversations.map(conv => ({
    id: conv.id,
    name: conv.name,
    type: 'direct' as const,
    participants: [],
    unreadCount: 0,
    isArchived: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  })),
  messages: mockMessages.map(msg => ({
    id: msg.id,
    content: msg.content,
    senderId: msg.self ? 'current-user' : 'other-user',
    conversationId: msg.conversationId,
    timestamp: new Date(),
    status: 'delivered' as const,
    type: 'text' as const,
  })),
  selectedConversationId: mockConversations[0].id,
  currentUser: null,
  isLoading: false,
  error: null,
  typingUsers: {},
  onlineUsers: new Set(),

  // Actions
  selectConversation: (id) => {
    set({ selectedConversationId: id });
    get().loadMessages(id);
    websocketService.joinConversation(id);
  },

  loadConversations: async () => {
    try {
      set({ isLoading: true, error: null });
      const conversations = await chatService.getConversations();
      set({ conversations, isLoading: false });
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to load conversations', isLoading: false });
    }
  },

  loadMessages: async (conversationId: string) => {
    try {
      set({ isLoading: true, error: null });
      const messages = await chatService.getMessages(conversationId);
      set(state => ({
        messages: [
          ...state.messages.filter(m => m.conversationId !== conversationId),
          ...messages.map(msg => ({
            ...msg,
            timestamp: new Date(msg.timestamp),
          }))
        ],
        isLoading: false
      }));
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to load messages', isLoading: false });
    }
  },

  sendMessage: async (conversationId: string, content: string) => {
    try {
      const tempId = `temp-${Date.now()}`;
      const tempMessage: Message = {
        id: tempId,
        content,
        senderId: get().currentUser?.id || 'current-user',
        conversationId,
        timestamp: new Date(),
        status: 'sending',
        type: 'text',
      };
      
      // Optimistic update
      set(state => ({
        messages: [...state.messages, tempMessage]
      }));
      
      // Send via WebSocket for real-time
      websocketService.sendMessage(conversationId, content);
      
      // Also send via REST for persistence
      const sentMessage = await chatService.sendMessage(conversationId, content);
      
      // Replace temp message with real one
      set(state => ({
        messages: state.messages.map(msg => 
          msg.id === tempId 
            ? { ...sentMessage, timestamp: new Date(sentMessage.timestamp) }
            : msg
        )
      }));
    } catch (error) {
      // Mark temp message as failed
      set(state => ({
        messages: state.messages.map(msg => 
          msg.id.startsWith('temp-') 
            ? { ...msg, status: 'failed' as const }
            : msg
        ),
        error: error instanceof Error ? error.message : 'Failed to send message'
      }));
    }
  },

  setCurrentUser: (user) => set({ currentUser: user }),

  setTyping: (conversationId, userId, isTyping) => {
    set(state => {
      const currentTyping = state.typingUsers[conversationId] || [];
      const newTyping = isTyping
        ? [...currentTyping.filter(id => id !== userId), userId]
        : currentTyping.filter(id => id !== userId);
      
      return {
        typingUsers: {
          ...state.typingUsers,
          [conversationId]: newTyping
        }
      };
    });
  },

  setUserOnline: (userId, isOnline) => {
    set(state => {
      const newOnlineUsers = new Set(state.onlineUsers);
      if (isOnline) {
        newOnlineUsers.add(userId);
      } else {
        newOnlineUsers.delete(userId);
      }
      return { onlineUsers: newOnlineUsers };
    });
  },

  addMessage: (message) => {
    set(state => ({
      messages: [...state.messages, {
        ...message,
        timestamp: new Date(message.timestamp)
      }]
    }));
  },

  updateMessageStatus: (messageId, status) => {
    set(state => ({
      messages: state.messages.map(msg => 
        msg.id === messageId ? { ...msg, status } : msg
      )
    }));
  },

  markAsRead: async (conversationId) => {
    try {
      await chatService.markAsRead(conversationId);
      set(state => ({
        conversations: state.conversations.map(conv =>
          conv.id === conversationId ? { ...conv, unreadCount: 0 } : conv
        )
      }));
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to mark as read' });
    }
  },

  setError: (error) => set({ error }),
  setLoading: (loading) => set({ isLoading: loading }),

  connectWebSocket: () => {
    websocketService.connect();
    
    // Set up WebSocket event listeners
    websocketService.on('message:received', (message) => {
      get().addMessage(message);
    });
    
    websocketService.on('message:delivered', (messageId) => {
      get().updateMessageStatus(messageId, 'delivered');
    });
    
    websocketService.on('message:read', (messageId) => {
      get().updateMessageStatus(messageId, 'read');
    });
    
    websocketService.on('typing:start', ({ conversationId, userId }) => {
      get().setTyping(conversationId, userId, true);
    });
    
    websocketService.on('typing:stop', ({ conversationId, userId }) => {
      get().setTyping(conversationId, userId, false);
    });
    
    websocketService.on('user:online', (userId) => {
      get().setUserOnline(userId, true);
    });
    
    websocketService.on('user:offline', (userId) => {
      get().setUserOnline(userId, false);
    });
  },

  disconnectWebSocket: () => {
    websocketService.disconnect();
  },
})); 