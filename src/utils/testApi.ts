import { chatService } from '../services/chat';
import { authService } from '../services/auth';
import { websocketService } from '../services/websocket';

export async function testApiIntegration() {
  console.log('🔧 Testing API Integration...');
  
  try {
    // Test authentication check
    console.log('📍 Testing authentication status...');
    const isAuth = authService.isAuthenticated();
    console.log(`Authentication status: ${isAuth}`);
    
    // Test WebSocket connection check
    console.log('📍 Testing WebSocket connection status...');
    const isConnected = websocketService.isConnected();
    console.log(`WebSocket connected: ${isConnected}`);
    
    // Test API endpoint calls (these will likely fail without backend)
    console.log('📍 Testing API calls (expecting failures without backend)...');
    
    try {
      const conversations = await chatService.getConversations();
      console.log('✅ Conversations loaded:', conversations.length);
    } catch (error) {
      console.log('❌ Conversations failed (expected):', error instanceof Error ? error.message : 'Unknown error');
    }
    
    try {
      const messages = await chatService.getMessages('test-conversation');
      console.log('✅ Messages loaded:', messages.length);
    } catch (error) {
      console.log('❌ Messages failed (expected):', error instanceof Error ? error.message : 'Unknown error');
    }
    
    console.log('🎉 API integration test completed!');
    
  } catch (error) {
    console.error('💥 Test failed:', error);
  }
}

// Development helper - only run in browser
if (typeof window !== 'undefined') {
  (window as any).testApiIntegration = testApiIntegration;
}