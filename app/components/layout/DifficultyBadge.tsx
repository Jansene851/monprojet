import { Badge } from '../ui/Badge';
import { Star, TrendingUp, Target, Zap } from 'lucide-react';

interface DifficultyBadgeProps {
  difficulty: 'Débutant' | 'Intermédiaire' | 'Avancé' | 'Expert';
  size?: 'sm' | 'default' | 'lg' | 'xl';
  showIcon?: boolean;
  className?: string;
}

export default function DifficultyBadge({ 
  difficulty, 
  size = 'default',
  showIcon = true,
  className = ''
}: DifficultyBadgeProps) {
  const difficultyConfig = {
    'Débutant': {
      variant: 'success' as const,
      icon: showIcon ? <Star className="h-3 w-3" /> : undefined,
      label: 'Débutant',
      colorClass: 'from-emerald-500 to-green-500'
    },
    'Intermédiaire': {
      variant: 'info' as const,
      icon: showIcon ? <TrendingUp className="h-3 w-3" /> : undefined,
      label: 'Intermédiaire',
      colorClass: 'from-blue-500 to-cyan-500'
    },
    'Avancé': {
      variant: 'warning' as const,
      icon: showIcon ? <Target className="h-3 w-3" /> : undefined,
      label: 'Avancé',
      colorClass: 'from-orange-500 to-amber-500'
    },
    'Expert': {
      variant: 'destructive' as const,
      icon: showIcon ? <Zap className="h-3 w-3" /> : undefined,
      label: 'Expert',
      colorClass: 'from-red-500 to-rose-500'
    }
  };

  const config = difficultyConfig[difficulty];

  return (
    <Badge
      variant={config.variant}
      size={size}
      icon={config.icon}
      className={`${className} ${
        difficulty === 'Expert' || difficulty === 'Avancé' 
          ? 'bg-linear-to-r ' + config.colorClass + ' text-white hover:opacity-90' 
          : ''
      }`}
    >
      {config.label}
    </Badge>
  );
}