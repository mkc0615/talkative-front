import React from 'react';

interface MessageBubbleProps {
  content: string;
  self?: boolean;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ content, self }) => (
  <div
    className={`max-w-[70%] px-4 py-2 rounded-lg mb-2 text-sm break-words shadow-md ${
      self
        ? 'ml-auto bg-accent text-white rounded-br-lg rounded-tl-lg'
        : 'mr-auto bg-bg-bubble-other text-text-main rounded-bl-lg rounded-tr-lg'
    }`}
  >
    {content}
  </div>
); 