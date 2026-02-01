'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/types';
import { X, Check, AlertCircle, Info, Star } from 'lucide-react';

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/80',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/80',
        success: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-800',
        warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300 hover:bg-yellow-200 dark:hover:bg-yellow-800',
        info: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800',
        outline: 'text-foreground border border-input hover:bg-accent hover:text-accent-foreground',
        premium: 'bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:opacity-90',
        new: 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:opacity-90',
      },
      size: {
        sm: 'px-2 py-0.5 text-xs',
        default: 'px-2.5 py-0.5 text-xs',
        lg: 'px-3 py-1 text-sm',
        xl: 'px-4 py-1.5 text-base',
      },
      rounded: {
        full: 'rounded-full',
        lg: 'rounded-lg',
        md: 'rounded-md',
        sm: 'rounded-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      rounded: 'full',
    },
  }
);

const iconVariants = {
  default: null,
  success: <Check className="h-3 w-3 mr-1" />,
  warning: <AlertCircle className="h-3 w-3 mr-1" />,
  destructive: <X className="h-3 w-3 mr-1" />,
  info: <Info className="h-3 w-3 mr-1" />,
  premium: <Star className="h-3 w-3 mr-1" />,
  new: null,
  secondary: null,
  outline: null,
};

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof badgeVariants> {
  icon?: React.ReactNode;
  removable?: boolean;
  onRemove?: () => void;
  count?: number;
  maxCount?: number;
  pulse?: boolean;
  gradient?: boolean;
}

export function Badge({
  className,
  variant,
  size,
  rounded,
  icon,
  removable,
  onRemove,
  children,
  count,
  maxCount = 99,
  pulse = false,
  gradient = false,
  ...props
}: BadgeProps) {
  const hasCount = count !== undefined;
  const displayCount = hasCount && count > maxCount ? `${maxCount}+` : count?.toString();

  const iconToShow = icon || (variant && iconVariants[variant as keyof typeof iconVariants]);

  return (
    <div
      className={cn(
        badgeVariants({ variant, size, rounded }),
        pulse && "animate-pulse",
        gradient && "bg-linear-to-r from-blue-500 to-purple-500",
        "group inline-flex items-center",
        className
      )}
      {...props}
    >
      {iconToShow && <span className="mr-1">{iconToShow}</span>}

      {hasCount ? (
        <>
          <span className="mr-1 font-bold">{displayCount}</span>
          <span>{children}</span>
        </>
      ) : (
        <span>{children}</span>
      )}

      {removable && (
        <button
          type="button"
          onClick={onRemove}
          className="ml-1.5 inline-flex h-4 w-4 items-center justify-center rounded-full bg-transparent p-0 text-current opacity-70 hover:opacity-100 hover:bg-white/20 focus:outline-none"
          aria-label="Remove"
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </div>
  );
}

// Badge Group Component
export function BadgeGroup({
  children,
  className,
  maxBadges,
  overflowLabel = "+%d",
}: {
  children: React.ReactNode;
  className?: string;
  maxBadges?: number;
  overflowLabel?: string;
}) {
  const badges = React.Children.toArray(children);
  const visibleBadges = maxBadges ? badges.slice(0, maxBadges) : badges;
  const overflowCount = maxBadges ? badges.length - maxBadges : 0;

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {visibleBadges}
      {overflowCount > 0 && (
        <Badge variant="outline" size="sm">
          {overflowLabel.replace('%d', overflowCount.toString())}
        </Badge>
      )}
    </div>
  );
}

// Badge avec catégorie de concours
export function ConcoursCategoryBadge({
  category,
  size = "default",
  showIcon = true,
}: {
  category: 'Administratif' | 'Technique' | 'Médical' | 'Judiciaire' | 'Territorial' | 'Européen';
  size?: 'sm' | 'default' | 'lg';
  showIcon?: boolean;
}) {
  const categoryConfig = {
    Administratif: {
      variant: 'info' as const,
      icon: showIcon ? '🏛️' : undefined,
    },
    Technique: {
      variant: 'secondary' as const,
      icon: showIcon ? '⚙️' : undefined,
    },
    Médical: {
      variant: 'destructive' as const,
      icon: showIcon ? '🏥' : undefined,
    },
    Judiciaire: {
      variant: 'outline' as const,
      icon: showIcon ? '⚖️' : undefined,
    },
    Territorial: {
      variant: 'success' as const,
      icon: showIcon ? '📍' : undefined,
    },
    Européen: {
      variant: 'premium' as const,
      icon: showIcon ? '🇪🇺' : undefined,
    },
  };

  const config = categoryConfig[category];

  return (
    <Badge variant={config.variant} size={size} icon={config.icon}>
      {category}
    </Badge>
  );
}

// Badge de difficulté
export function DifficultyBadge({
  difficulty,
  size = "default",
}: {
  difficulty: 'A' | 'B' | 'C' | 1 | 2 | 3;
  size?: 'sm' | 'default' | 'lg';
}) {
  const difficultyConfig = {
    'A': { label: 'Catégorie A', variant: 'success' as const, color: 'bg-green-500' },
    'B': { label: 'Catégorie B', variant: 'warning' as const, color: 'bg-yellow-500' },
    'C': { label: 'Catégorie C', variant: 'destructive' as const, color: 'bg-red-500' },
    1: { label: 'Facile', variant: 'success' as const, color: 'bg-green-500' },
    2: { label: 'Moyen', variant: 'warning' as const, color: 'bg-yellow-500' },
    3: { label: 'Difficile', variant: 'destructive' as const, color: 'bg-red-500' },
  };

  const config = difficultyConfig[difficulty];

  return (
    <Badge variant={config.variant} size={size}>
      {config.label}
    </Badge>
  );
}

// Badge de statut
export function StatusBadge({
  status,
  size = "default",
}: {
  status: 'actif' | 'terminé' | 'bientôt' | 'annulé' | 'en_cours';
  size?: 'sm' | 'default' | 'lg';
}) {
  const statusConfig = {
    actif: { label: 'Actif', variant: 'success' as const, icon: '✅' },
    terminé: { label: 'Terminé', variant: 'secondary' as const, icon: '🏁' },
    bientôt: { label: 'Bientôt', variant: 'warning' as const, icon: '⏳' },
    annulé: { label: 'Annulé', variant: 'destructive' as const, icon: '❌' },
    en_cours: { label: 'En cours', variant: 'info' as const, icon: '▶️' },
  };

  const config = statusConfig[status];

  return (
    <Badge variant={config.variant} size={size} icon={config.icon}>
      {config.label}
    </Badge>
  );
}