# Phase 1 Implementation Plan: Foundation & Setup

## 🎯 Phase 1 Overview
**Goal**: Establish a solid foundation for the chat app with proper project structure, configuration, and design system.

**Timeline**: 2-3 development sessions
**Priority**: High - This is the foundation everything else builds on

---

## 📁 Phase 1A: Project Structure & Configuration

### 1. Update Project Metadata
**Tasks:**
- [ ] Update `layout.tsx` with proper title and description
- [ ] Create custom favicon for chat app
- [ ] Update `package.json` with proper project details
- [ ] Add proper meta tags for SEO and social sharing

**Implementation:**
```typescript
// Update metadata in layout.tsx
export const metadata: Metadata = {
  title: "Talkative - Real-time Chat App",
  description: "Connect with friends and colleagues in real-time with our modern chat application",
  keywords: ["chat", "messaging", "real-time", "communication"],
  authors: [{ name: "Talkative Team" }],
  viewport: "width=device-width, initial-scale=1",
};
```

### 2. Set Up Proper Folder Structure
**New Structure:**
```
src/
├── app/                    # Next.js App Router pages
├── components/             # Reusable UI components
│   ├── ui/                # Base UI components (Button, Input, etc.)
│   ├── chat/              # Chat-specific components
│   ├── auth/              # Authentication components
│   └── layout/            # Layout components
├── hooks/                 # Custom React hooks
├── lib/                   # Utility libraries and configurations
├── types/                 # TypeScript type definitions
├── utils/                 # Helper functions
├── styles/                # Additional styles and design tokens
└── constants/             # App constants and configuration
```

### 3. Configure Environment Variables
**Create `.env.local`:**
```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXT_PUBLIC_WS_URL=ws://localhost:3001

# Authentication
NEXT_PUBLIC_AUTH_DOMAIN=your-auth-domain
NEXT_PUBLIC_AUTH_CLIENT_ID=your-client-id

# File Upload
NEXT_PUBLIC_UPLOAD_URL=http://localhost:3001/upload
NEXT_PUBLIC_MAX_FILE_SIZE=10485760

# Feature Flags
NEXT_PUBLIC_ENABLE_VOICE_MESSAGES=true
NEXT_PUBLIC_ENABLE_VIDEO_CALLS=false
```

### 4. Set Up TypeScript Types
**Create `src/types/chat.ts`:**
```typescript
export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  status: 'online' | 'offline' | 'away' | 'busy';
  lastSeen?: Date;
}

export interface Message {
  id: string;
  content: string;
  senderId: string;
  conversationId: string;
  timestamp: Date;
  status: 'sending' | 'sent' | 'delivered' | 'read' | 'failed';
  type: 'text' | 'image' | 'file' | 'voice' | 'video';
  replyTo?: string;
  reactions?: MessageReaction[];
}

export interface Conversation {
  id: string;
  name: string;
  type: 'direct' | 'group';
  participants: User[];
  lastMessage?: Message;
  unreadCount: number;
  isArchived: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface MessageReaction {
  emoji: string;
  userId: string;
  timestamp: Date;
}
```

### 5. Add ESLint and Prettier Configuration
**Update `eslint.config.mjs`:**
```javascript
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  ...compat.extends("next/core-web-vitals"),
  {
    rules: {
      "@typescript-eslint/no-unused-vars": "error",
      "@typescript-eslint/no-explicit-any": "warn",
      "prefer-const": "error",
      "no-var": "error",
    },
  },
];
```

**Create `.prettierrc`:**
```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false
}
```

### 6. Set Up Husky for Pre-commit Hooks
**Install and configure:**
```bash
npm install --save-dev husky lint-staged
npx husky init
```

**Configure `package.json`:**
```json
{
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ],
    "*.{json,css,md}": [
      "prettier --write"
    ]
  }
}
```

---

## 🎨 Phase 1B: Design System & UI Foundation

### 1. Create Design Tokens
**Create `src/styles/design-tokens.css`:**
```css
:root {
  /* Colors */
  --primary-50: #eff6ff;
  --primary-500: #3b82f6;
  --primary-600: #2563eb;
  --primary-700: #1d4ed8;
  
  --gray-50: #f9fafb;
  --gray-100: #f3f4f6;
  --gray-200: #e5e7eb;
  --gray-300: #d1d5db;
  --gray-400: #9ca3af;
  --gray-500: #6b7280;
  --gray-600: #4b5563;
  --gray-700: #374151;
  --gray-800: #1f2937;
  --gray-900: #111827;
  
  /* Spacing */
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-5: 1.25rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-10: 2.5rem;
  --space-12: 3rem;
  --space-16: 4rem;
  
  /* Typography */
  --font-size-xs: 0.75rem;
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.25rem;
  --font-size-2xl: 1.5rem;
  
  /* Border Radius */
  --radius-sm: 0.25rem;
  --radius-md: 0.375rem;
  --radius-lg: 0.5rem;
  --radius-xl: 0.75rem;
  --radius-2xl: 1rem;
  
  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
  
  /* Transitions */
  --transition-fast: 150ms ease-in-out;
  --transition-normal: 250ms ease-in-out;
  --transition-slow: 350ms ease-in-out;
}
```

### 2. Set Up Component Library Structure
**Create base component structure:**
```
src/components/ui/
├── button/
│   ├── Button.tsx
│   ├── Button.test.tsx
│   └── index.ts
├── input/
│   ├── Input.tsx
│   ├── Input.test.tsx
│   └── index.ts
├── card/
│   ├── Card.tsx
│   ├── Card.test.tsx
│   └── index.ts
├── avatar/
│   ├── Avatar.tsx
│   ├── Avatar.test.tsx
│   └── index.ts
└── index.ts
```

### 3. Create Base UI Components

**Button Component (`src/components/ui/button/Button.tsx`):**
```typescript
import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading, children, ...props }, ref) => {
    const baseClasses = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';
    
    const variants = {
      primary: 'bg-primary-600 text-white hover:bg-primary-700 focus-visible:ring-primary-500',
      secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 focus-visible:ring-gray-500',
      outline: 'border border-gray-300 bg-transparent hover:bg-gray-50 focus-visible:ring-gray-500',
      ghost: 'hover:bg-gray-100 focus-visible:ring-gray-500',
      danger: 'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500',
    };
    
    const sizes = {
      sm: 'h-8 px-3 text-sm',
      md: 'h-10 px-4 py-2',
      lg: 'h-12 px-6 text-lg',
    };
    
    return (
      <button
        className={cn(baseClasses, variants[variant], sizes[size], className)}
        ref={ref}
        disabled={loading}
        {...props}
      >
        {loading && (
          <svg className="mr-2 h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
```

### 4. Implement Responsive Design Breakpoints
**Update `tailwind.config.mjs`:**
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        'xs': '475px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      colors: {
        primary: {
          50: 'var(--primary-50)',
          500: 'var(--primary-500)',
          600: 'var(--primary-600)',
          700: 'var(--primary-700)',
        },
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
      },
    },
  },
  plugins: [],
};
```

### 5. Set Up Icon Library
**Install Lucide React:**
```bash
npm install lucide-react
```

**Create icon utility (`src/lib/icons.ts`):**
```typescript
export {
  MessageSquare,
  Send,
  User,
  Users,
  Search,
  Settings,
  LogOut,
  Plus,
  MoreVertical,
  Smile,
  Paperclip,
  Mic,
  Phone,
  Video,
  Image,
  File,
  Check,
  CheckCheck,
  Clock,
  AlertCircle,
  type LucideIcon,
} from 'lucide-react';
```

### 6. Create Loading States and Skeleton Components
**Create `src/components/ui/skeleton/Skeleton.tsx`:**
```typescript
import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
  width?: string | number;
  height?: string | number;
}

export function Skeleton({ className, width, height }: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-md bg-gray-200 dark:bg-gray-700',
        className
      )}
      style={{
        width: width,
        height: height,
      }}
    />
  );
}

export function MessageSkeleton() {
  return (
    <div className="flex items-start space-x-3 p-4">
      <Skeleton className="h-10 w-10 rounded-full" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
  );
}

export function ConversationSkeleton() {
  return (
    <div className="flex items-center space-x-3 p-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-3 w-2/3" />
      </div>
    </div>
  );
}
```

---

## 🛠 Implementation Order

### Session 1: Project Structure & Configuration
1. Update project metadata and favicon
2. Create folder structure
3. Set up environment variables
4. Configure TypeScript types
5. Add ESLint and Prettier

### Session 2: Design System & Base Components
1. Create design tokens
2. Set up component library structure
3. Implement base UI components (Button, Input, Card, Avatar)
4. Configure responsive breakpoints
5. Set up icon library

### Session 3: Polish & Testing
1. Create loading states and skeletons
2. Add utility functions
3. Test base components
4. Set up Husky pre-commit hooks
5. Final configuration review

---

## ✅ Success Criteria for Phase 1

- [ ] Clean, organized project structure
- [ ] Consistent design tokens and styling
- [ ] Reusable base UI components
- [ ] Proper TypeScript configuration
- [ ] Development workflow with linting and formatting
- [ ] Responsive design foundation
- [ ] Loading states and error handling patterns

## 🚀 Next Steps After Phase 1

Once Phase 1 is complete, we'll be ready to move to **Phase 2: Core Chat Components** where we'll build:
- Authentication system
- Main chat layout
- Message components
- Real-time communication setup

---

## 📝 Notes

- All components will follow a consistent naming convention
- TypeScript strict mode will be enabled
- Components will be fully typed with proper interfaces
- Accessibility will be built-in from the start
- Mobile-first responsive design approach 