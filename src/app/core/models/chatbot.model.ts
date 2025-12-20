export interface ChatbotModel {
  response: string;
  status: string;
  error?: string;
  timestamp: Date;
  conversationId: string;
  userId: string;
  messageId: string;
  metadata?: Record<string, any>;
  context?: Record<string, any>;
  intent?: string;
  confidence?: number;
  entities?: Record<string, any>[];
  suggestions?: string[];
  actions?: {
    type: string;
    payload: Record<string, any>;
  }[];
  quickReplies?: string[];
  followUp?: boolean;
  isEndOfConversation?: boolean;
  responseType?: 'text' | 'image' | 'video' | 'audio' | 'file' | 'location' | 'button' | 'quickReply';
  responseUrl?: string;
  responseData?: any;
  responseTime?: number;
  responseStatus?: string;
  responseError?: string;
  responseMetadata?: Record<string, any>
  responseContext?: Record<string, any>
  responseIntent?: string
}