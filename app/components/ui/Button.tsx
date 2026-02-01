'use client';

import { ChevronRight, LucideIcon } from 'lucide-react';

import Link from 'next/link';
import { ButtonHTMLAttributes, ReactNode } from 'react';

export type ButtonVariant =
    | 'primary'
    | 'secondary'
    | 'outline'
    | 'ghost'
    | 'danger'
    | 'success';

export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface ButtonProps {
    children?: ReactNode;
    variant?: ButtonVariant;
    size?: ButtonSize;
    icon?: LucideIcon;
    iconPosition?: 'left' | 'right';
    iconOnly?: boolean;
    fullWidth?: boolean;
    rounded?: boolean;
    loading?: boolean;
    disabled?: boolean;
    href?: string;
    ariaLabel?: string;
    onClick?: (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
    className?: string;
    type?: 'button' | 'submit' | 'reset';
    gradient?: boolean;
    shadow?: boolean;
    title?: string;
    badge?: string | number;
    target?: string;
    rel?: string;
    iconColor?: string;
}

const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    icon: Icon,
    iconPosition = 'right',
    iconOnly = false,
    fullWidth = false,
    rounded = false,
    loading = false,
    disabled = false,
    href,
    onClick,
    className = '',
    type = 'button',
    gradient = false,
    shadow = true,
    title,
    badge,
    target,
    rel,
    iconColor
    }: ButtonProps) => {
    // Classes de base
    const baseClasses = 'inline-flex items-center justify-center font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

    // Variantes
    const variantClasses: Record<ButtonVariant, string> = {
        primary: 'bg-orange-500 text-white hover:bg-orange-600 focus:ring-orange-500 border border-orange-600',
        secondary: 'bg-white text-orange-600 border border-orange-500 hover:bg-orange-50 focus:ring-orange-500',
        outline: 'bg-transparent text-gray-700 border border-gray-300 hover:border-orange-500 hover:text-orange-600 focus:ring-orange-500',
        ghost: 'bg-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:ring-gray-500',
        danger: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500 border border-red-600',
        success: 'bg-green-500 text-white hover:bg-green-600 focus:ring-green-500 border border-green-600'
    };

    // Tailles
    const sizeClasses: Record<ButtonSize, string> = {
        xs: 'text-xs px-2.5 py-1.5',
        sm: 'text-sm px-3 py-2',
        md: 'text-base px-4 py-2.5',
        lg: 'text-lg px-6 py-3',
        xl: 'text-xl px-8 py-4'
    };

    // Icon only sizes
    const iconSizeClasses: Record<ButtonSize, string> = {
        xs: 'p-1.5',
        sm: 'p-2',
        md: 'p-2.5',
        lg: 'p-3',
        xl: 'p-4'
    };

    // Classes conditionnelles
    const gradientClass = gradient ? 'bg-linear-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700' : '';
    const shadowClass = shadow ? 'shadow-md hover:shadow-lg' : '';
    const roundedClass = rounded ? 'rounded-full' : 'rounded-xl';
    const widthClass = fullWidth ? 'w-full' : '';
    const relativeClass = badge ? 'relative' : '';

    // Classes combinées
    const combinedClasses = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${iconOnly ? iconSizeClasses[size] : sizeClasses[size]}
    ${gradientClass}
    ${shadowClass}
    ${roundedClass}
    ${widthClass}
    ${relativeClass}
    ${className}
  `.replace(/\s+/g, ' ').trim();

    // Contenu avec icon
    const renderContent = () => {
        if (loading) {
            return (
                <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    {!iconOnly && 'Chargement...'}
                </>
            );
        }

        if (Icon && iconOnly) {
            return (
                <>
                    <Icon className="h-5 w-5" />
                    {badge && (
                        <span className="absolute -top-1 -right-1 px-1.5 py-0.5 text-xs bg-linear-to-r from-orange-500 to-red-500 text-white rounded-full shadow-sm flex items-center justify-center min-w-5">
                            {badge}
                        </span>
                    )}
                </>
            );
        }

        if (Icon) {
            return (
                <>
                    {iconPosition === 'left' && <Icon className={`h-4 w-4 ${children ? 'mr-2' : ''}`} />}
                    {children}
                    {iconPosition === 'right' && <Icon className={`h-4 w-4 ${children ? 'ml-2' : ''}`} />}
                    {badge && (
                        <span className="ml-2 px-1.5 py-0.5 text-xs bg-linear-to-r from-orange-500 to-red-500 text-white rounded-full shadow-sm">
                            {badge}
                        </span>
                    )}
                </>
            );
        }

        return (
            <>
                {children}
                {badge && (
                    <span className="ml-2 px-1.5 py-0.5 text-xs bg-linear-to-r from-orange-500 to-red-500 text-white rounded-full shadow-sm">
                        {badge}
                    </span>
                )}
            </>
        );
    };

    // Si href est fourni, rend un Link
    if (href) {
         const isExternal = href.startsWith('http');
         const linkProps = isExternal
    ? { target: target || '_blank', rel: rel || 'noopener noreferrer' }
    : {};
        return (
            
            <Link
                href={href}
                {...linkProps}
                className={combinedClasses}
                onClick={onClick}
                aria-disabled={disabled || loading}
                title={title}
            >
                {renderContent()}
            </Link>
        );
    }

    // Sinon, rend un button
    return (
        <button
            type={type}
            className={combinedClasses}
            onClick={onClick}
            disabled={disabled || loading}
            aria-disabled={disabled || loading}
            title={title}
        >
            {renderContent()}
        </button>
    );
};

// Variantes pratiques prédéfinies
Button.PrimaryCTA = ({ children, href }: { children: ReactNode; href: string }) => (
    <Button
        href={href}
        variant="primary"
        size="lg"
        gradient
        shadow
        className="transform hover:-translate-y-1 hover:shadow-xl"
        icon={ChevronRight}
    >
        {children}
    </Button>
);

Button.SecondaryCTA = ({ children, href }: { children: ReactNode; href: string }) => (
    <Button
        href={href}
        variant="secondary"
        size="lg"
        className="hover:bg-orange-50"
    >
        {children}
    </Button>
);

export { Button };