import React from 'react';

interface MessageBubbleProps {
  content: string;
  self?: boolean;
  status?: 'sending' | 'sent' | 'delivered' | 'read' | 'failed';
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ content, self, status }) => {
  // Status indicator
  let statusIndicator = null;
  if (self && status) {
    if (status === 'sent') {
      statusIndicator = <span className="ml-2 text-xs text-text-secondary">✔️</span>;
    } else if (status === 'delivered') {
      statusIndicator = <span className="ml-2 text-xs text-text-secondary">✔✔️</span>;
    } else if (status === 'read') {
      statusIndicator = <span className="ml-2 w-2 h-2 inline-block rounded-full bg-accent align-middle" title="Read" />;
    } else if (status === 'failed') {
      statusIndicator = <span className="ml-2 text-xs text-red-500" title="Failed">⚠️</span>;
    } else if (status === 'sending') {
      statusIndicator = <span className="ml-2 text-xs text-text-secondary" title="Sending">⏳</span>;
    }
  }

  return (
    <div
      className={`max-w-[70%] px-4 py-2 rounded-lg mb-2 text-sm break-words shadow-md flex items-end ${
        self
          ? 'ml-auto bg-accent text-white rounded-br-lg rounded-tl-lg'
          : 'mr-auto bg-bg-bubble-other text-text-main rounded-bl-lg rounded-tr-lg'
      }`}
    >
      <span>{content}</span>
      {statusIndicator}
    </div>
  );
}; 