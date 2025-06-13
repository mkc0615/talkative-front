import React from 'react';

interface MessageBubbleProps {
  content: string;
  self?: boolean;
  status?: 'sending' | 'sent' | 'delivered' | 'read' | 'failed';
  grouped?: boolean;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ content, self, status, grouped }) => {
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

  // Asymmetric rounded corners
  const bubbleShape = self
    ? 'rounded-tl-2xl rounded-bl-2xl rounded-br-lg rounded-tr-2xl'
    : 'rounded-tr-2xl rounded-br-2xl rounded-bl-lg rounded-tl-2xl';

  // More vertical spacing between bubbles, less if grouped
  const marginY = grouped ? 'my-1' : 'my-3';

  return (
    <div
      className={`max-w-[70%] px-4 py-2 ${bubbleShape} ${marginY} text-sm break-words flex items-end border border-bg-bubble-self/40 shadow ${
        self
          ? 'ml-auto bg-bg-bubble-self'
          : 'mr-auto bg-bg-bubble-other'
      }`}
      style={{
        color: self ? 'var(--color-text-bubble-self)' : 'var(--color-text-bubble-other)',
        boxShadow: '0 2px 8px 0 rgba(0,0,0,0.10)',
      }}
    >
      <span>{content}</span>
      {statusIndicator}
    </div>
  );
}; 