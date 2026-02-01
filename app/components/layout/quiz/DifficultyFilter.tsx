'use client';

import { useState } from 'react';
import { Filter, TrendingUp, TrendingDown, Award, Zap } from 'lucide-react';
import { Card } from '@/app/components/ui/Card';
import { Button } from '@/app/components/ui/Button';

interface DifficultyFilterProps {
  difficulties: string[];
  selectedDifficulty: string;
  onDifficultyChange: (difficulty: string) => void;
}

export default function DifficultyFilter({
  difficulties,
  selectedDifficulty,
  onDifficultyChange
}: DifficultyFilterProps) {
  const [showAll, setShowAll] = useState(false);

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case 'Facile': return <Award className="w-4 h-4" />;
      case 'Moyenne': return <TrendingUp className="w-4 h-4" />;
      case 'Difficile': return <Zap className="w-4 h-4" />;
      case 'Expert': return <TrendingDown className="w-4 h-4" />;
      default: return <Filter className="w-4 h-4" />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Facile': return 'bg-green-500';
      case 'Moyenne': return 'bg-yellow-500';
      case 'Difficile': return 'bg-orange-500';
      case 'Expert': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const displayedDifficulties = showAll ? difficulties : difficulties.slice(0, 4);

  return (
    <Card variant="ghost" padding="sm" className="relative">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Difficulté</span>
          </div>
          {difficulties.length > 4 && (
            <Button
              variant="ghost"
              size="xs"
              onClick={() => setShowAll(!showAll)}
              className="text-xs"
            >
              {showAll ? 'Voir moins' : 'Voir tout'}
            </Button>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {/* Option "Toutes les difficultés" */}
          <button
            onClick={() => onDifficultyChange('Toutes')}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
              selectedDifficulty === 'Toutes'
                ? 'bg-orange-500 text-white shadow-sm'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Filter className="w-3 h-3" />
            Toutes
          </button>

          {/* Options de difficulté */}
          {displayedDifficulties
            .filter(d => d !== 'Toutes')
            .map((difficulty) => (
              <button
                key={difficulty}
                onClick={() => onDifficultyChange(difficulty)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                  selectedDifficulty === difficulty
                    ? 'bg-linear-to-r from-orange-500 to-red-500 text-white shadow-sm'
                    : 'bg-white border border-gray-200 text-gray-700 hover:border-orange-200 hover:bg-orange-50'
                }`}
              >
                <span className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${getDifficultyColor(difficulty)}`} />
                  {getDifficultyIcon(difficulty)}
                  {difficulty}
                </span>
                {selectedDifficulty === difficulty && (
                  <span className="ml-1 px-1.5 py-0.5 text-xs bg-white/20 rounded-full">
                    ✓
                  </span>
                )}
              </button>
            ))}
        </div>

        {/* Stats de difficulté */}
        <div className="pt-3 border-t border-gray-100">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>Distribution des quiz:</span>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                Facile: 25%
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                Difficile: 15%
              </span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}