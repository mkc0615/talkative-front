import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, leftIcon, rightIcon, ...props }, ref) => {
    return (
      <div className={`relative flex items-center ${className ?? ''}`}>
        {leftIcon && (
          <span className="absolute left-3 text-text-secondary pointer-events-none">
            {leftIcon}
          </span>
        )}
        <input
          ref={ref}
          className={`w-full bg-bg-input text-text-main placeholder-text-secondary border-none rounded-lg py-2 pl-${leftIcon ? '10' : '4'} pr-${rightIcon ? '10' : '4'} focus:outline-none focus:ring-2 focus:ring-accent transition-colors`}
          {...props}
        />
        {rightIcon && (
          <span className="absolute right-3 text-text-secondary pointer-events-none">
            {rightIcon}
          </span>
        )}
      </div>
    );
  }
);
Input.displayName = 'Input'; 