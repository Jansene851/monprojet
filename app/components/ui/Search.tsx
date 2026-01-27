'use client';

import { Search, X } from 'lucide-react';
import { useState, useCallback, useEffect, useRef } from 'react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSearch: (query: string, filter: string) => void;
}

export default function SearchModal({ isOpen, onClose, onSearch }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const inputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Focus sur l'input quand le modal s'ouvre
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Gestion des raccourcis clavier
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleSubmit = useCallback((e?: React.FormEvent) => {
    e?.preventDefault();
    
    if (!query.trim()) return;
    
    onSearch(query, selectedFilter);
    onClose();
  }, [query, selectedFilter, onSearch, onClose]);

  // Empêcher le scroll du body
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-2 sm:p-4 bg-black/50 backdrop-blur-sm">
      <div 
        ref={modalRef}
        className="relative w-full max-w-lg bg-white dark:bg-gray-900 rounded-xl shadow-xl mt-4 max-h-[calc(100vh-2rem)] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header compact */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Search className="h-5 w-5 text-blue-600" />
              <h2 className="font-bold text-gray-900 dark:text-white">
                Recherche
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              aria-label="Fermer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Search Input */}
          <form onSubmit={handleSubmit} className="mb-3">
            <div className="relative">
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Rechercher un concours, quiz, actualité..."
                className="w-full pl-10 pr-10 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:text-white"
                autoComplete="off"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 p-0.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  aria-label="Effacer"
                >
                  <X className="h-3 w-3" />
                </button>
              )}
            </div>
          </form>

          {/* Filters horizontaux */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {[
              { id: 'all', label: 'Tout' },
              { id: 'concours', label: 'Concours' },
              { id: 'quiz', label: 'Quiz' },
              { id: 'actualites', label: 'Actualités' },
              { id: 'calendrier', label: 'Calendrier' },
            ].map((filter) => (
              <button
                key={filter.id}
                type="button"
                onClick={() => setSelectedFilter(filter.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap shrink-0 transition-colors ${
                  selectedFilter === filter.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-linear-to-r from-gray-100 to-gray-200 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Contenu scrollable - prend tout l'espace disponible */}
        <div className="flex-1 overflow-y-auto p-4">
          {/* Suggestions rapides */}
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white text-sm mb-3">
              Suggestions populaires
            </h3>
            <div className="flex flex-wrap gap-2">
              {[
                'ENA 2024',
                'Police nationale',
                'Quiz culture générale',
                'Santé publique',
                'Dates limites',
                'Concours administratifs',
                'Préparation oral',
                'Résultats concours'
              ].map((term, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setQuery(term);
                    onSearch(term, selectedFilter);
                    onClose();
                  }}
                  className="px-3 py-2 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-sm"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* FOOTER FIXE EN BAS - Compact et visible */}
        <div className="sticky bottom-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 p-4 rounded-b-xl">
          <div className="flex items-center justify-between">
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Appuyez sur <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded border">Esc</kbd> pour fermer
            </div>
            <button
              type="button"
              onClick={() => handleSubmit()}
              disabled={!query.trim()}
              className="px-4 py-2 bg-linear-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-medium rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm flex items-center gap-2"
            >
              <Search className="h-3 w-3" />
              Rechercher
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}