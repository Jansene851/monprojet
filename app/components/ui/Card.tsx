import { JSX, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
  children: ReactNode;
  className?: string;
  hoverEffect?: boolean;
  gradient?: boolean;
  glass?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export function Card({
  children,
  className,
  hoverEffect = true,
  gradient = false,
  glass = false,
  padding = 'md',
}: CardProps) {
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  return (
    <div
      className={cn(
        'rounded-2xl border transition-all duration-300',
        gradient && 'card-gradient border-gradient',
        glass && 'glass backdrop-blur-md',
        hoverEffect && 'card-hover hover-lift',
        paddingClasses[padding],
        className
      )}
    >
      {children}
    </div>
  );
}

interface CardHeaderProps {
  children: ReactNode;
  className?: string;
}

export function CardHeader({ children, className }: CardHeaderProps) {
  return (
    <div className={cn('mb-6', className)}>
      {children}
    </div>
  );
}

interface CardTitleProps {
  children: ReactNode;
  className?: string;
  /**
   * Niveau de titre (h1 à h6)
   */
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  /**
   * Utiliser une police de type display (plus grande et décorative)
   */
  display?: boolean;
  /**
   * Afficher un gradient sur le texte
   */
  gradient?: boolean;
}

export function CardTitle({
  children,
  className,
  level = 2,
  display = false,
  gradient = false,
}: CardTitleProps) {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  
  return (
    <Tag
      className={cn(
        'font-bold text-gray-900 dark:text-white',
        // Tailles basées sur le niveau
        level === 1 && 'text-3xl md:text-4xl',
        level === 2 && 'text-2xl md:text-3xl',
        level === 3 && 'text-xl md:text-2xl',
        level === 4 && 'text-lg md:text-xl',
        level === 5 && 'text-base md:text-lg',
        level === 6 && 'text-sm md:text-base',
        // Variante display
        display && 'font-display tracking-tight',
        // Effet gradient
        gradient && 'gradient-text text-effect-gradient',
        className
      )}
    >
      {children}
    </Tag>
  );
}

interface CardDescriptionProps {
  children: ReactNode;
  className?: string;
  /**
   * Variante de texte (sm, md, lg)
   */
  size?: 'sm' | 'md' | 'lg';
}

export function CardDescription({
  children,
  className,
  size = 'md',
}: CardDescriptionProps) {
  return (
    <p
      className={cn(
        'text-gray-600 dark:text-gray-300',
        size === 'sm' && 'text-sm',
        size === 'md' && 'text-base',
        size === 'lg' && 'text-lg',
        className
      )}
    >
      {children}
    </p>
  );
}

interface CardContentProps {
  children: ReactNode;
  className?: string;
}

export function CardContent({ children, className }: CardContentProps) {
  return (
    <div className={cn('space-y-4', className)}>
      {children}
    </div>
  );
}

interface CardFooterProps {
  children: ReactNode;
  className?: string;
  /**
   * Alignement des éléments dans le footer
   */
  align?: 'left' | 'center' | 'right' | 'between';
}

export function CardFooter({
  children,
  className,
  align = 'left',
}: CardFooterProps) {
  const alignClasses = {
    left: 'flex justify-start',
    center: 'flex justify-center',
    right: 'flex justify-end',
    between: 'flex justify-between',
  };

  return (
    <div className={cn(
      'mt-6 pt-6 border-t border-gray-100 dark:border-gray-800',
      alignClasses[align],
      className
    )}>
      {children}
    </div>
  );
}

interface CardActionProps {
  children: ReactNode;
  className?: string;
}

export function CardAction({ children, className }: CardActionProps) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      {children}
    </div>
  );
}