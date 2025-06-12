'use client';
import React, { useState } from 'react';
import { Input } from '../ui/input/Input';
import { Button } from '../ui/button/Button';

export const MessageInput: React.FC = () => {
  const [value, setValue] = useState('');

  return (
    <form className="flex items-center gap-2 px-6 py-4 bg-bg-main border-t border-bg-bubble-other/40">
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
      <Button type="submit" size="md" variant="primary" aria-label="Send" disabled={!value.trim()}>
        <span className="i-lucide-send w-5 h-5" />
      </Button>
    </form>
  );
}; 