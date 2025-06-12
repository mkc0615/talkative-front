import React from 'react';

interface StatusDotProps {
  status: 'online' | 'offline' | 'unread';
  size?: number; // px
  className?: string;
}

const statusColor = {
  online: 'bg-status-online',
  offline: 'bg-status-offline',
  unread: 'bg-status-unread',
};

export const StatusDot: React.FC<StatusDotProps> = ({ status, size = 12, className }) => (
  <span
    className={`inline-block rounded-full border-2 border-bg-sidebar ${statusColor[status]} ${className ?? ''}`}
    style={{ width: size, height: size }}
    aria-label={status}
  />
); 