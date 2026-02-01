'use client';

import { useState } from 'react';
import { 
  BookOpen, Briefcase, Users, Award, Star, 
  GraduationCap, Building, Filter, ChevronRight 
} from 'lucide-react';
import { Card } from '@/app/components/ui/Card';
import { Button } from '@/app/components/ui/Button';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function CategoryFilter({
  categories,
  selectedCategory,
  onCategoryChange
}: CategoryFilterProps) {
  const [showAll, setShowAll] = useState(false);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Culture générale': return <BookOpen className="w-4 h-4" />;
      case 'Droit': return <Briefcase className="w-4 h-4" />;
      case 'Économie': return <Building className="w-4 h-4" />;
      case 'Mathématiques': return <GraduationCap className="w-4 h-4" />;
      case 'Psychotechnique': return <Users className="w-4 h-4" />;
      case 'Médecine': return <Star className="w-4 h-4" />;
      case 'Langues': return <Award className="w-4 h-4" />;
      default: return <Filter className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Culture générale': return 'bg-blue-500';
      case 'Droit': return 'bg-purple-500';
      case 'Économie': return 'bg-green-500';
      case 'Mathématiques': return 'bg-orange-500';
      case 'Psychotechnique': return 'bg-pink-500';
      case 'Médecine': return 'bg-red-500';
      case 'Langues': return 'bg-cyan-500';
      default: return 'bg-gray-500';
    }
  };

  const getCategoryCount = (category: string) => {
    // Mock data - en réalité, cela viendrait des props
    const mockCounts: Record<string, number> = {
      'Culture générale': 8,
      'Droit': 6,
      'Économie': 5,
      'Mathématiques': 7,
      'Psychotechnique': 4,
      'Médecine': 3,
      'Langues': 2,
      'Tous': 35
    };
    return mockCounts[category] || 0;
  };

  const displayedCategories = showAll ? categories : categories.slice(0, 6);

  return (
    <Card variant="ghost" padding="sm">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Catégories</span>
          </div>
          {categories.length > 6 && (
            <Button
              variant="ghost"
              size="xs"
              onClick={() => setShowAll(!showAll)}
              className="text-xs"
              icon={ChevronRight}
              iconPosition="right"
            >
              {showAll ? 'Voir moins' : `+${categories.length - 6} autres`}
            </Button>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {/* Option "Toutes les catégories" */}
          <button
            onClick={() => onCategoryChange('Toutes')}
            className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 flex items-center justify-between min-w-[140px] ${
              selectedCategory === 'Toutes'
                ? 'bg-linear-to-r from-orange-500 to-red-500 text-white shadow-lg'
                : 'bg-white border border-gray-200 text-gray-700 hover:border-orange-200 hover:bg-orange-50'
            }`}
          >
            <span className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Toutes
            </span>
            <span className={`px-2 py-1 text-xs rounded-full ${
              selectedCategory === 'Toutes'
                ? 'bg-white/20'
                : 'bg-gray-100 text-gray-600'
            }`}>
              {getCategoryCount('Toutes')}
            </span>
          </button>

          {/* Options de catégorie */}
          {displayedCategories
            .filter(c => c !== 'Toutes')
            .map((category) => (
              <button
                key={category}
                onClick={() => onCategoryChange(category)}
                className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 flex items-center justify-between min-w-[140px] ${
                  selectedCategory === category
                    ? 'bg-linear-to-r from-blue-500 to-cyan-500 text-white shadow-lg'
                    : 'bg-white border border-gray-200 text-gray-700 hover:border-blue-200 hover:bg-blue-50'
                }`}
              >
                <span className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${getCategoryColor(category)}`} />
                  {getCategoryIcon(category)}
                  {category}
                </span>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  selectedCategory === category
                    ? 'bg-white/20'
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {getCategoryCount(category)}
                </span>
              </button>
            ))}
        </div>

        {/* Stats de catégories */}
        {selectedCategory !== 'Toutes' && (
          <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-600">Quiz dans cette catégorie:</span>
              <span className="font-semibold text-gray-900">
                {getCategoryCount(selectedCategory)} quiz disponibles
              </span>
            </div>
            <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
              <span>Score moyen: 72%</span>
              <span>Taux de réussite: 85%</span>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}