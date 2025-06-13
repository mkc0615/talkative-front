import React from 'react';

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg';
  status?: 'online' | 'offline' | 'unread';
  children?: React.ReactNode; // fallback initials
}

const sizeMap = {
  sm: 'w-8 h-8 text-base',
  md: 'w-12 h-12 text-lg',
  lg: 'w-16 h-16 text-xl',
};

const statusColor = {
  online: 'bg-status-online',
  offline: 'bg-status-offline',
  unread: 'bg-status-unread',
};

export const Avatar: React.FC<AvatarProps> = ({ src, alt, size = 'md', status, children }) => {
  return (
    <div className={`relative inline-block ${sizeMap[size]}`}>
      {src ? (
        <img
          src={src}
          alt={alt}
          className={`object-cover rounded-full w-full h-full border-2 border-white shadow`}
        />
      ) : (
        <div className={`flex items-center justify-center rounded-full bg-bg-bubble-other text-text-main w-full h-full font-semibold uppercase border-2 border-white shadow`}>
          {children}
        </div>
      )}
      {status && (
        <span
          className={`absolute bottom-0 right-0 block w-3 h-3 rounded-full border-2 border-bg-sidebar ${statusColor[status]}`}
        />
      )}
    </div>
  );
}; 