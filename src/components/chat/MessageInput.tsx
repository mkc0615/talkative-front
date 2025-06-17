'use client';
import React, { useState } from 'react';
import { Input } from '../ui/input/Input';
import { Button } from '../ui/button/Button';

const EMOJIS = ['😀', '😂', '😍', '👍', '🎉', '😎', '😭', '🔥', '🥳', '😅'];

export const MessageInput: React.FC = () => {
  const [value, setValue] = useState('');
  const [showEmojis, setShowEmojis] = useState(false);

  const handleEmojiClick = (emoji: string) => {
    setValue((v) => v + emoji);
    setShowEmojis(false);
  };

  return (
    <form className="flex items-center gap-2 px-6 py-4 bg-bg-main text-text-main border-t border-bg-bubble-other/40 relative">
      <Input
        className="flex-1 bg-bg-input text-text-main placeholder-text-secondary border-none shadow-none"
        placeholder="Send a message..."
        value={value}
        onChange={e => setValue(e.target.value)}
        onKeyDown={e => {
          if (e.key === 'Enter') {
            e.preventDefault();
            // handle send
            setValue('');
          }
        }}
      />
      <div className="relative">
        <Button type="button" size="md" variant="ghost" aria-label="Emoji picker" onClick={() => setShowEmojis((v) => !v)}>
          <span className="i-lucide-smile w-5 h-5" />
        </Button>
        {showEmojis && (
          <div className="absolute bottom-12 right-0 bg-bg-bubble-other rounded-lg shadow-md p-2 flex flex-wrap gap-1 z-10">
            {EMOJIS.map((emoji) => (
              <button
                key={emoji}
                type="button"
                className="text-2xl hover:bg-bg-main rounded p-1"
                onClick={() => handleEmojiClick(emoji)}
              >
                {emoji}
              </button>
            ))}
          </div>
        )}
      </div>
      <Button type="submit" size="md" variant="primary" aria-label="Send" disabled={!value.trim()}>
        <span className="i-lucide-send w-5 h-5" />
      </Button>
    </form>
  );
}; 