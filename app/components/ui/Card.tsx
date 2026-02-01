'use client';

import { ChevronRight } from 'lucide-react';
import { ReactNode } from 'react';

export type CardVariant = 'default' | 'elevated' | 'outlined' | 'ghost' | 'gradient';
export type CardPadding = 'none' | 'sm' | 'md' | 'lg' | 'xl';
export type CardRadius = 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
export type CardShadow = 'none' | 'sm' | 'md' | 'lg' | 'xl';

export interface CardProps {
  children: ReactNode;
  variant?: CardVariant;
  padding?: CardPadding;
  radius?: CardRadius;
  hover?: boolean;
  clickable?: boolean;
  fullWidth?: boolean;
  className?: string;
  onClick?: () => void;
  header?: ReactNode;
  footer?: ReactNode;
  divider?: boolean;
  accent?: 'top' | 'right' | 'bottom' | 'left' | 'none';
  accentColor?: string;
  shadow?: CardShadow;
  title?: string;
  
}

const Card = ({
  children,
  variant = 'default',
  padding = 'md',
  radius = 'lg',
  hover = false,
  clickable = false,
  fullWidth = false,
  className = '',
  onClick,
  header,
  footer,
  divider = false,
  accent = 'none',
  accentColor = 'from-orange-500 to-red-600',
  shadow = 'md',
}: CardProps) => {
  // Variantes
  const variantClasses: Record<CardVariant, string> = {
    default: 'bg-white',
    elevated: 'bg-white border border-gray-200',
    outlined: 'bg-transparent border-2 border-gray-200',
    ghost: 'bg-transparent',
    gradient: 'bg-linear-to-r from-gray-900 to-gray-800'
  };

  // Padding
  const paddingClasses: Record<CardPadding, string> = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-12'
  };

  // Radius
  const radiusClasses: Record<CardRadius, string> = {
    none: 'rounded-none',
    sm: 'rounded',
    md: 'rounded-lg',
    lg: 'rounded-xl',
    xl: 'rounded-2xl',
    full: 'rounded-full'
  };

  // Shadow
  const shadowClasses: Record<CardShadow, string> = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl'
  };

  // Accent border
  const accentClasses: Record<Exclude<CardProps['accent'], 'none' | undefined>, string> = {
    top: `border-t-4 bg-gradient-to-r ${accentColor}`,
    right: `border-r-4 bg-gradient-to-b ${accentColor}`,
    bottom: `border-b-4 bg-gradient-to-r ${accentColor}`,
    left: `border-l-4 bg-gradient-to-b ${accentColor}`
  };

  // Classes conditionnelles
  const hoverClass = hover ? 'transition-all duration-300 hover:shadow-xl hover:-translate-y-1' : '';
  const clickableClass = clickable ? 'cursor-pointer active:scale-[0.98]' : '';
  const widthClass = fullWidth ? 'w-full' : '';
  const accentClass = accent !== 'none' ? accentClasses[accent] : '';

  // Classes combinées
  const combinedClasses = `
    ${variantClasses[variant]}
    ${paddingClasses[padding]}
    ${radiusClasses[radius]}
    ${shadowClasses[shadow]}
    ${hoverClass}
    ${clickableClass}
    ${widthClass}
    ${accentClass}
    ${className}
  `.replace(/\s+/g, ' ').trim();

  const renderContent = () => (
    <>
      {header && (
        <div className="mb-6">
          {header}
          {divider && <hr className="my-4 border-gray-200" />}
        </div>
      )}

      <div>{children}</div>

      {footer && (
        <div className="mt-6">
          {divider && <hr className="my-4 border-gray-200" />}
          {footer}
        </div>
      )}
    </>
  );

  if (onClick || clickable) {
    return (
      <button
        onClick={onClick}
        className={`${combinedClasses} focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2`}
        type="button"
      >
        {renderContent()}
      </button>
    );
  }

  return (
    <div className={combinedClasses}>
      {renderContent()}
    </div>
  );
};

// Composants de card spécialisés
Card.Header = ({
  children,
  icon,
  title,
  subtitle,
  action
}: {
  children?: ReactNode;
  icon?: ReactNode;
  title?: string;
  subtitle?: string;
  action?: ReactNode;
}) => (
  <div className="flex items-center justify-between mb-6">
    <div className="flex items-center">
      {icon && <div className="mr-3">{icon}</div>}
      <div>
        {title && <h3 className="text-lg font-semibold text-gray-900">{title}</h3>}
        {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
      </div>
    </div>
    {action && <div>{action}</div>}
  </div>
);

Card.Feature = ({
  icon,
  title,
  description,
  gradient = 'from-orange-100 to-red-100',
  iconColor = 'text-orange-600',
  href,
  onClick,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  gradient?: string;
  iconColor?: string;
  href?: string;
  onClick?: () => void;
}) => (
  <Card
    variant="elevated"
    hover
    clickable={!!href || !!onClick}
    onClick={onClick}
    className="group"
  >
    <div className={`w-12 h-12 bg-linear-to-r ${gradient} rounded-xl flex items-center justify-center mb-4 ${iconColor}`}>
      {icon}
    </div>
    <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600 text-sm mb-4">{description}</p>
    {(href || onClick) && (
      <span className="inline-flex items-center text-sm font-medium text-orange-600 group-hover:text-orange-700">
        En savoir plus
        <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
      </span>
    )}
  </Card>
);

Card.Stats = ({
  icon,
  value,
  label,
  trend,
  color = 'orange',
}: {
  icon: ReactNode;
  value: string;
  label: string;
  trend?: { value: string; positive: boolean };
  color?: 'orange' | 'blue' | 'green' | 'purple' | 'red';
}) => {
  const colorClasses = {
    orange: 'bg-orange-100 text-orange-600',
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    purple: 'bg-purple-100 text-purple-600',
    red: 'bg-red-100 text-red-600',
  };

  const trendClasses = {
    positive: 'bg-green-100 text-green-800',
    negative: 'bg-red-100 text-red-800',
  };

  return (
    <Card variant="ghost" padding="sm">
      <div className="flex items-center">
        <div className="mr-4">
          <div className={`w-12 h-12 ${colorClasses[color]} rounded-xl flex items-center justify-center`}>
            {icon}
          </div>
        </div>
        <div>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          <div className="flex items-center gap-2">
            <p className="text-sm text-gray-600">{label}</p>
            {trend && (
              <span className={`text-xs px-2 py-0.5 rounded-full ${trendClasses[trend.positive ? 'positive' : 'negative']}`}>
                {trend.positive ? '↗' : '↘'} {trend.value}
              </span>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

Card.Highlight = ({
  title,
  children,
  action,
  accent = 'top',
  accentColor,
  className,
}: {
  title: string;
  children: ReactNode;
  action?: ReactNode;
  accent?: CardProps['accent'];
  accentColor?: string;
  className?: string;
}) => (
  <Card
    variant="elevated"
    accent={accent}
    accentColor={accentColor}
    padding="lg"
    className={`relative overflow-hidden ${className || ''}`}
  >
    <Card.Header
      title={title}
      action={action}
    />
    {children}
  </Card>
);

export { Card };