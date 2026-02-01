import { Quiz } from '@/lib/data';
import { Card } from '../../ui/Card';
import { Button } from '../../ui/Button';
import { Badge, BadgeGroup } from '../../ui/Badge';
import {
  Clock,
  BarChart3,
  Target,
  ArrowRight,
  Brain,
  Trophy,
  Users,
  Award
} from 'lucide-react';

interface QuizCardProps {
  quiz: Quiz;
  variant?: 'featured' | 'default';
}

export default function QuizCard({ quiz, variant = 'default' }: QuizCardProps) {
  const difficultyColors = {
    'Facile': { variant: 'success' as const, icon: '🟢' },
    'Moyenne': { variant: 'warning' as const, icon: '🟡' },
    'Difficile': { variant: 'secondary' as const, icon: '🟠' },
    'Expert': { variant: 'destructive' as const, icon: '🔴' },
  };

  const difficultyConfig = difficultyColors[quiz.difficulty] || difficultyColors['Moyenne'];

  // Configuration pour les variantes
  const cardProps = variant === 'featured' 
    ? {
        variant: 'gradient' as const,
        hover: true,
        clickable: false,
        shadow: 'lg' as const,
        className: 'border-0',
        accent: 'top' as const,
        accentColor: 'from-orange-500 to-red-600',
      }
    : {
        variant: 'elevated' as const,
        hover: true,
        clickable: false,
        shadow: 'md' as const,
        className: 'border border-gray-200',
      };

  return (
    <Card {...cardProps}>
      <div className="p-6">
        {/* Header avec icône et badge de difficulté */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-xl ${
              variant === 'featured' 
                ? 'bg-white/20' 
                : 'bg-linear-to-r from-orange-50 to-red-50'
            }`}>
              <Brain className={`h-6 w-6 ${
                variant === 'featured' ? 'text-white' : 'text-orange-600'
              }`} />
            </div>
            <div>
              <Badge 
                variant={difficultyConfig.variant}
                icon={difficultyConfig.icon}
                size="sm"
                className={variant === 'featured' ? 'bg-white/20' : ''}
              >
                {quiz.difficulty}
              </Badge>
            </div>
          </div>
          
          {/* Stats rapides */}
          {quiz.averageScore && (
            <div className="flex items-center gap-2">
              <Badge 
                variant="outline" 
                size="sm"
                icon={<Trophy className="h-3 w-3" />}
                className={variant === 'featured' ? 'border-white/30 text-white' : ''}
              >
                {quiz.averageScore}%
              </Badge>
            </div>
          )}
        </div>

        {/* Titre et description */}
        <h3 className={`text-xl font-bold mb-3 ${
          variant === 'featured' ? 'text-white' : 'text-gray-900'
        }`}>
          {quiz.title}
        </h3>

        <p className={`text-sm mb-6 line-clamp-2 ${
          variant === 'featured' ? 'text-white/80' : 'text-gray-600'
        }`}>
          {quiz.description}
        </p>

        {/* Métriques */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center">
            <Target className={`h-4 w-4 mr-3 ${
              variant === 'featured' ? 'text-white/60' : 'text-gray-400'
            }`} />
            <span className={`text-sm ${
              variant === 'featured' ? 'text-white/80' : 'text-gray-600'
            }`}>
              {quiz.questions} questions
            </span>
          </div>

          <div className="flex items-center">
            <Clock className={`h-4 w-4 mr-3 ${
              variant === 'featured' ? 'text-white/60' : 'text-gray-400'
            }`} />
            <span className={`text-sm ${
              variant === 'featured' ? 'text-white/80' : 'text-gray-600'
            }`}>
              {quiz.duration} minutes
            </span>
          </div>

          <div className="flex items-center">
            <BarChart3 className={`h-4 w-4 mr-3 ${
              variant === 'featured' ? 'text-white/60' : 'text-gray-400'
            }`} />
            <span className={`text-sm ${
              variant === 'featured' ? 'text-white/80' : 'text-gray-600'
            }`}>
              {quiz.category}
            </span>
          </div>

          {/* Participants (si disponible) */}
          {quiz.completed && (
            <div className="flex items-center">
              <Users className={`h-4 w-4 mr-3 ${
                variant === 'featured' ? 'text-white/60' : 'text-gray-400'
              }`} />
              <span className={`text-sm ${
                variant === 'featured' ? 'text-white/80' : 'text-gray-600'
              }`}>
                {quiz.completed} participants
              </span>
            </div>
          )}
        </div>

        {/* Tags */}
        {quiz.tags && quiz.tags.length > 0 && (
          <div className="mb-6">
            <BadgeGroup maxBadges={3} overflowLabel="+%d">
              {quiz.tags.map((tag, index) => (
                <Badge 
                  key={index}
                  variant={variant === 'featured' ? 'outline' : 'secondary'}
                  size="sm"
                  className={
                    variant === 'featured' 
                      ? 'border-white/30 text-white bg-white/10' 
                      : ''
                  }
                >
                  {tag}
                </Badge>
              ))}
            </BadgeGroup>
          </div>
        )}

        {/* Bouton d'action */}
        <div className="mt-auto">
          {variant === 'featured' ? (
            <Button
              href={`/quiz/${quiz.id}`}
              variant="secondary"
              gradient
              shadow
              fullWidth
              icon={ArrowRight}
              iconPosition="right"
              className="bg-white text-orange-600 hover:text-orange-700 hover:bg-white/90 border-0 transform hover:-translate-y-0.5 transition-all"
            >
              Commencer le quiz
            </Button>
          ) : (
            <Button
              href={`/quiz/${quiz.id}`}
              variant="primary"
              gradient
              shadow
              fullWidth
              icon={ArrowRight}
              iconPosition="right"
              className="transform hover:-translate-y-0.5 transition-all"
            >
              Commencer le quiz
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}