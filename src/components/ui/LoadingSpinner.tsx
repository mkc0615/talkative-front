interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function LoadingSpinner({ size = 'md', className = '' }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  return (
    <div className={`animate-spin rounded-full border-2 border-gray-300 border-t-blue-500 ${sizeClasses[size]} ${className}`} />
  );
}

export function LoadingOverlay({ message = 'Loading...' }: { message?: string }) {
  return (
    <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-10">
      <div className="flex flex-col items-center gap-3">
        <LoadingSpinner size="lg" />
        <span className="text-gray-600 text-sm">{message}</span>
      </div>
    </div>
  );
}