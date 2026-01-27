import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface TypographyProps {
  children: ReactNode;
  className?: string;
}

export function H1({ children, className }: TypographyProps) {
  return (
    <h1 className={cn(
      "text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 dark:text-white",
      "font-display text-balance",
      className
    )}>
      {children}
    </h1>
  );
}

export function H2({ children, className }: TypographyProps) {
  return (
    <h2 className={cn(
      "text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 dark:text-white",
      "font-display text-balance",
      className
    )}>
      {children}
    </h2>
  );
}

export function H3({ children, className }: TypographyProps) {
  return (
    <h3 className={cn(
      "text-2xl md:text-3xl font-bold text-gray-900 dark:text-white",
      "font-sans text-balance",
      className
    )}>
      {children}
    </h3>
  );
}

export function H4({ children, className }: TypographyProps) {
  return (
    <h4 className={cn(
      "text-xl md:text-2xl font-semibold text-gray-900 dark:text-white",
      "font-sans",
      className
    )}>
      {children}
    </h4>
  );
}

export function P({ children, className }: TypographyProps) {
  return (
    <p className={cn(
      "text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed",
      "font-sans text-pretty",
      className
    )}>
      {children}
    </p>
  );
}

export function Lead({ children, className }: TypographyProps) {
  return (
    <p className={cn(
      "text-xl text-gray-700 dark:text-gray-200 leading-relaxed",
      "font-sans text-pretty",
      className
    )}>
      {children}
    </p>
  );
}

export function Large({ children, className }: TypographyProps) {
  return (
    <div className={cn(
      "text-lg font-semibold text-gray-900 dark:text-white",
      "font-sans",
      className
    )}>
      {children}
    </div>
  );
}

export function Small({ children, className }: TypographyProps) {
  return (
    <small className={cn(
      "text-sm font-medium leading-none text-gray-600 dark:text-gray-400",
      "font-sans",
      className
    )}>
      {children}
    </small>
  );
}

export function Muted({ children, className }: TypographyProps) {
  return (
    <p className={cn(
      "text-sm text-gray-500 dark:text-gray-400",
      "font-sans",
      className
    )}>
      {children}
    </p>
  );
}