import React from 'react';

const icons = [
  { name: 'Chats', icon: <span className="i-lucide-message-square w-6 h-6" /> },
  { name: 'Contacts', icon: <span className="i-lucide-user w-6 h-6" /> },
  { name: 'Archive', icon: <span className="i-lucide-archive w-6 h-6" /> },
  { name: 'Trash', icon: <span className="i-lucide-trash w-6 h-6" /> },
  { name: 'Refresh', icon: <span className="i-lucide-rotate-ccw w-6 h-6" /> },
];

export const SidebarMenu: React.FC = () => (
  <nav className="flex flex-col items-center gap-6 py-6 bg-bg-sidebar h-full w-16">
    {icons.map(({ name, icon }) => (
      <button
        key={name}
        className="text-text-secondary hover:text-accent focus:outline-none"
        title={name}
        aria-label={name}
      >
        {icon}
      </button>
    ))}
  </nav>
); 