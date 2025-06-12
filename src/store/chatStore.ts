import { create } from 'zustand';

interface Message {
  id: string;
  conversationId: string;
  content: string;
  self: boolean;
}

interface Conversation {
  id: string;
  name: string;
  avatarSrc?: string;
  lastMessage: string;
  time: string;
  status: 'online' | 'offline' | 'unread';
  role?: string;
}

interface ChatStore {
  conversations: Conversation[];
  messages: Message[];
  selectedConversationId: string;
  selectConversation: (id: string) => void;
}

const mockConversations: Conversation[] = [
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

const mockMessages: Message[] = [
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

export const useChatStore = create<ChatStore>((set) => ({
  conversations: mockConversations,
  messages: mockMessages,
  selectedConversationId: mockConversations[0].id,
  selectConversation: (id) => set({ selectedConversationId: id }),
})); 