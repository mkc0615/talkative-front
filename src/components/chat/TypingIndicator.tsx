import React from 'react';

export const TypingIndicator: React.FC<{ name?: string }> = ({ name }) => (
  <div className="flex items-center gap-2 px-6 py-2 text-sm text-text-secondary">
    <span>{name ? `${name} is typing` : 'Someone is typing'}</span>
    <span className="inline-block animate-bounce">.</span>
    <span className="inline-block animate-bounce delay-100">.</span>
    <span className="inline-block animate-bounce delay-200">.</span>
  </div>
); 