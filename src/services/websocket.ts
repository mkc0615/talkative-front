import { io, Socket } from 'socket.io-client';
import { Message } from '../types/chat';

const WS_URL = process.env.NEXT_PUBLIC_WS_URL || 'wss://localhost:8080';

export type WebSocketEvents = {
  'message:received': (message: Message) => void;
  'message:delivered': (messageId: string) => void;
  'message:read': (messageId: string) => void;
  'typing:start': (data: { conversationId: string; userId: string }) => void;
  'typing:stop': (data: { conversationId: string; userId: string }) => void;
  'user:online': (userId: string) => void;
  'user:offline': (userId: string) => void;
  'conversation:updated': (conversationId: string) => void;
};

class WebSocketService {
  private socket: Socket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;

  connect(): void {
    const token = localStorage.getItem('auth_token');
    
    if (!token) {
      console.warn('No auth token found, cannot connect to WebSocket');
      return;
    }

    this.socket = io(WS_URL, {
      auth: {
        token,
      },
      transports: ['websocket'],
      upgrade: true,
    });

    this.socket.on('connect', () => {
      console.log('WebSocket connected');
      this.reconnectAttempts = 0;
    });

    this.socket.on('disconnect', () => {
      console.log('WebSocket disconnected');
      this.handleReconnect();
    });

    this.socket.on('connect_error', (error) => {
      console.error('WebSocket connection error:', error);
      this.handleReconnect();
    });
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  private handleReconnect(): void {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      const delay = Math.pow(2, this.reconnectAttempts) * 1000;
      
      setTimeout(() => {
        console.log(`Attempting to reconnect (${this.reconnectAttempts}/${this.maxReconnectAttempts})`);
        this.connect();
      }, delay);
    }
  }

  on<K extends keyof WebSocketEvents>(event: K, callback: WebSocketEvents[K]): void {
    if (this.socket) {
      this.socket.on(event as string, callback as any);
    }
  }

  off<K extends keyof WebSocketEvents>(event: K, callback?: WebSocketEvents[K]): void {
    if (this.socket) {
      this.socket.off(event as string, callback as any);
    }
  }

  emit(event: string, data?: any): void {
    if (this.socket?.connected) {
      this.socket.emit(event, data);
    }
  }

  joinConversation(conversationId: string): void {
    this.emit('conversation:join', { conversationId });
  }

  leaveConversation(conversationId: string): void {
    this.emit('conversation:leave', { conversationId });
  }

  sendMessage(conversationId: string, content: string): void {
    this.emit('message:send', { conversationId, content });
  }

  startTyping(conversationId: string): void {
    this.emit('typing:start', { conversationId });
  }

  stopTyping(conversationId: string): void {
    this.emit('typing:stop', { conversationId });
  }

  markAsRead(conversationId: string, messageId: string): void {
    this.emit('message:read', { conversationId, messageId });
  }

  isConnected(): boolean {
    return this.socket?.connected || false;
  }
}

export const websocketService = new WebSocketService();