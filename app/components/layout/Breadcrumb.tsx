// app/components/Breadcrumb.tsx
'use client';

import Link from 'next/link';
import { Card } from '@/app/components/ui/Card';
import { Button } from '@/app/components/ui/Button';
import { 
  ChevronRight, 
  Home, 
  ArrowLeft, 
  ArrowRight,
  MoreHorizontal,
  Download,
  Share2,
  LucideIcon,
  Bookmark
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import { Fragment, useState } from 'react';

interface BreadcrumbItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
}

interface BreadcrumbProps {
  items?: BreadcrumbItem[];
  showHome?: boolean;
  className?: string;
  separator?: React.ReactNode;
  variant?: 'default' | 'minimal' | 'enhanced';
  title?: string;
  actions?: React.ReactNode;
}

export default function Breadcrumb({ 
  items = [], 
  showHome = true,
  className = '',
  separator = <ChevronRight className="h-4 w-4 text-gray-400" />,
  variant = 'default',
  title,
  actions
}: BreadcrumbProps) {
  const pathname = usePathname();
  
  // Générer automatiquement les breadcrumbs à partir du chemin
  const generateBreadcrumbs = () => {
    if (items.length > 0) return items;
    
    const pathSegments = pathname.split('/').filter(segment => segment);
    const breadcrumbs: BreadcrumbItem[] = [];
    
    let accumulatedPath = '';
    pathSegments.forEach((segment, index) => {
      accumulatedPath += `/${segment}`;
      const label = segment
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      
      breadcrumbs.push({
        label,
        href: accumulatedPath,
      });
    });
    
    return breadcrumbs;
  };
  
  const breadcrumbItems = generateBreadcrumbs();
  
  // Noms de pages personnalisés
  const customLabels: Record<string, string> = {
    'concours': 'Concours',
    'quiz': 'Quiz',
    'actualites': 'Actualités',
    'ressources': 'Ressources',
    'contact': 'Contact',
    'dashboard': 'Tableau de bord',
    'profil': 'Mon profil',
    'parametres': 'Paramètres',
  };

  // Rendu minimal
  if (variant === 'minimal') {
    return (
      <div className={`py-2 ${className}`}>
        <nav className="flex items-center space-x-2 text-sm">
          {showHome && (
            <>
              <Link
                href="/"
                className="flex items-center text-gray-500 hover:text-orange-600 transition-colors"
                aria-label="Accueil"
              >
                <Home className="h-3 w-3 mr-1" />
                Accueil
              </Link>
              <span className="text-gray-300">/</span>
            </>
          )}
          
          {breadcrumbItems.map((item, index) => {
            const isLast = index === breadcrumbItems.length - 1;
            const customLabel = customLabels[item.label.toLowerCase()] || item.label;
            
            return (
              <Fragment key={item.href}>
                {isLast ? (
                  <span className="text-gray-700 font-medium">
                    {customLabel}
                  </span>
                ) : (
                  <>
                    <Link
                      href={item.href}
                      className="text-gray-500 hover:text-orange-600 transition-colors"
                    >
                      {customLabel}
                    </Link>
                    <span className="text-gray-300">/</span>
                  </>
                )}
              </Fragment>
            );
          })}
        </nav>
      </div>
    );
  }

  // Rendu par défaut ou amélioré
  return (
    <div className={`${className}`}>
      <Card
        variant={variant === 'enhanced' ? 'gradient' : 'ghost'}
        padding="md"
        className={variant === 'enhanced' ? 'mb-6 border border-orange-100' : ''}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center">
            <nav className="flex items-center space-x-2" aria-label="Fil d'Ariane">
              {/* Accueil */}
              {showHome && (
                <>
                  <Link
                    href="/"
                    className="flex items-center text-gray-500 hover:text-orange-600 transition-colors group"
                    aria-label="Accueil"
                  >
                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-orange-50 transition">
                      <Home className="h-4 w-4" />
                    </div>
                  </Link>
                  {breadcrumbItems.length > 0 && (
                    <div className="mx-1">{separator}</div>
                  )}
                </>
              )}
              
              {/* Items du breadcrumb */}
              {breadcrumbItems.map((item, index) => {
                const isLast = index === breadcrumbItems.length - 1;
                const customLabel = customLabels[item.label.toLowerCase()] || item.label;
                
                return (
                  <Fragment key={item.href}>
                    <div className="flex items-center">
                      {isLast ? (
                        <div className="flex items-center">
                          {item.icon && (
                            <div className="mr-2 w-6 h-6 text-orange-600">
                              {item.icon}
                            </div>
                          )}
                          <span className="text-gray-900 font-semibold">
                            {customLabel}
                          </span>
                        </div>
                      ) : (
                        <Link
                          href={item.href}
                          className="flex items-center text-gray-600 hover:text-orange-600 transition-colors group"
                        >
                          {item.icon && (
                            <div className="mr-2 w-5 h-5 text-gray-500 group-hover:text-orange-500">
                              {item.icon}
                            </div>
                          )}
                          <span className="hidden sm:inline">{customLabel}</span>
                          <span className="sm:hidden">
                            {customLabel.length > 15 ? `${customLabel.substring(0, 15)}...` : customLabel}
                          </span>
                        </Link>
                      )}
                    </div>
                    
                    {!isLast && breadcrumbItems.length > 1 && (
                      <div className="mx-1">{separator}</div>
                    )}
                  </Fragment>
                );
              })}
            </nav>
          </div>
          
          {/* Actions */}
          {actions || (variant === 'enhanced' && (
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                size="sm"
                icon={ArrowLeft}
                onClick={() => window.history.back()}
              >
                <span className="hidden sm:inline">Retour</span>
              </Button>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  icon={Share2}
                  iconOnly
                />
                <Button
                  variant="ghost"
                  size="sm"
                  icon={Bookmark}
                  iconOnly
                />
                <Button
                  variant="primary"
                  size="sm"
                  icon={Download}
                  iconOnly
                />
              </div>
            </div>
          ))}
        </div>
        
        {/* Titre (pour la version améliorée) */}
        {title && variant === 'enhanced' && (
          <div className="mt-4">
            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          </div>
        )}
      </Card>
      
      {/* Version mobile avec dropdown (alternative) */}
      <div className="md:hidden mt-4">
        <Card
          variant="outlined"
          padding="sm"
        >
          <div className="relative">
            <select
              className="w-full appearance-none bg-transparent border-none px-3 py-2 text-gray-700 focus:outline-none focus:ring-0"
              onChange={(e) => {
                if (e.target.value) {
                  window.location.href = e.target.value;
                }
              }}
              value={pathname}
            >
              <option value="/">Accueil</option>
              {breadcrumbItems.map((item) => {
                const customLabel = customLabels[item.label.toLowerCase()] || item.label;
                return (
                  <option key={item.href} value={item.href}>
                    {customLabel}
                  </option>
                );
              })}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <MoreHorizontal className="h-4 w-4" />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

// Composant Breadcrumb avec actions contextuelles
export function BreadcrumbWithActions({ 
  title, 
  description,
  backUrl,
  primaryAction,
  secondaryActions 
}: {
  title: string;
  description?: string;
  backUrl?: string;
  primaryAction?: {
    label: string;
    onClick: () => void;
    icon?: React.ReactNode;
  };
  secondaryActions?: React.ReactNode;
}) {
  return (
    <Card
      variant="elevated"
      padding="lg"
      className="mb-6 border-l-4 border-l-orange-500"
    >
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            {backUrl && (
              <Button
                variant="ghost"
                size="sm"
                icon={ArrowLeft}
                href={backUrl}
                className="shrink-0"
              />
            )}
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
              {description && (
                <p className="text-gray-600 mt-1">{description}</p>
              )}
            </div>
          </div>
          
          <div className="mt-4">
            <Breadcrumb variant="minimal" />
          </div>
        </div>
        
        <div className="flex flex-wrap gap-3">
          {secondaryActions}
          {primaryAction && (
            <Button
              variant="primary"
              gradient
              
              onClick={primaryAction.onClick}
            >
              {primaryAction.label}
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}

// Composant Breadcrumb pour les pages de formulaire
export function FormBreadcrumb({ 
  steps,
  currentStep,
  onStepClick
}: {
  steps: Array<{ id: string; label: string; href: string }>;
  currentStep: number;
  onStepClick?: (step: number) => void;
}) {
  return (
    <Card
      variant="outlined"
      padding="lg"
      className="mb-8"
    >
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="w-full">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const isActive = index === currentStep;
              const isCompleted = index < currentStep;
              const isLast = index === steps.length - 1;
              
              return (
                <Fragment key={step.id}>
                  <button
                    onClick={() => onStepClick?.(index)}
                    className={`flex flex-col items-center relative ${
                      isCompleted ? 'cursor-pointer' : 'cursor-default'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                      isActive 
                        ? 'bg-orange-500 text-white' 
                        : isCompleted 
                        ? 'bg-green-100 text-green-600' 
                        : 'bg-gray-100 text-gray-400'
                    }`}>
                      {isCompleted ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <span className="font-semibold">{index + 1}</span>
                      )}
                    </div>
                    <span className={`text-sm font-medium ${
                      isActive ? 'text-orange-600' : 
                      isCompleted ? 'text-green-600' : 
                      'text-gray-500'
                    }`}>
                      {step.label}
                    </span>
                  </button>
                  
                  {!isLast && (
                    <div className="flex-1 mx-4">
                      <div className={`h-1 ${
                        isCompleted ? 'bg-green-500' : 'bg-gray-200'
                      }`} />
                    </div>
                  )}
                </Fragment>
              );
            })}
          </div>
        </div>
        
        <div className="text-sm text-gray-500">
          Étape {currentStep + 1} sur {steps.length}
        </div>
      </div>
    </Card>
  );
}

// Composant Breadcrumb pour les pages de résultats
export function ResultsBreadcrumb({ 
  resultsCount,
  searchTerm,
  filters,
  onClearFilters 
}: {
  resultsCount: number;
  searchTerm?: string;
  filters?: string[];
  onClearFilters?: () => void;
}) {
  return (
    <Card
      variant="elevated"
      padding="lg"
      className="mb-6"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <Breadcrumb variant="minimal" />
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {searchTerm && (
              <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                Recherche: "{searchTerm}"
              </span>
            )}
            {filters?.map((filter, index) => (
              <span key={index} className="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full">
                {filter}
              </span>
            ))}
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-900">{resultsCount}</div>
            <div className="text-sm text-gray-600">résultats</div>
          </div>
          
          {filters && filters.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={onClearFilters}
            >
              Effacer les filtres
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}