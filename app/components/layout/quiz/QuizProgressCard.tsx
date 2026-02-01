'use client';

import { Target, Clock, CheckCircle, TrendingUp, Brain } from 'lucide-react';
import { Card } from '@/app/components/ui/Card';
import { Button } from '@/app/components/ui/Button';
import type { Quiz, UserQuizProgress } from '@/lib/types';

interface QuizProgressCardProps {
  quiz: Quiz;
  userProgress: UserQuizProgress;
}

export default function QuizProgressCard({ quiz, userProgress }: QuizProgressCardProps) {
  const getQuizProgress = () => {
    const attempt = userProgress.attemptedQuizzes.find(a => a.quizId === quiz.id);
    return attempt ? {
      score: attempt.score,
      timeSpent: attempt.timeSpent,
      completed: true,
      completedAt: attempt.completedAt
    } : null;
  };

  const getWeaknessMatch = () => {
    return userProgress.weakAreas.some(weakness => 
      quiz.topics.some(topic => 
        topic.toLowerCase().includes(weakness.toLowerCase()) ||
        weakness.toLowerCase().includes(topic.toLowerCase())
      )
    );
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Expert': return 'bg-red-100 text-red-800';
      case 'Difficile': return 'bg-orange-100 text-orange-800';
      case 'Moyenne': return 'bg-yellow-100 text-yellow-800';
      case 'Facile': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const progress = getQuizProgress();
  const isWeakness = getWeaknessMatch();

  return (
    <Card
      variant="elevated"
      hover
      clickable
      className="group transition-all duration-300 hover:shadow-lg border-l-4 border-l-orange-500"
      href={`/quiz/${quiz.id}`}
    >
      <div className="flex items-start gap-4">
        <div className="shrink-0">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
            isWeakness 
              ? 'bg-linear-to-r from-red-100 to-orange-100' 
              : 'bg-linear-to-r from-blue-100 to-cyan-100'
          }`}>
            {isWeakness ? (
              <Target className="w-6 h-6 text-red-600" />
            ) : (
              <Brain className="w-6 h-6 text-blue-600" />
            )}
          </div>
        </div>

        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">
              {quiz.title}
            </h3>
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(quiz.difficulty)}`}>
              {quiz.difficulty}
            </span>
          </div>

          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {quiz.description}
          </p>

          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1 text-gray-500">
                  <Clock className="w-4 h-4" />
                  {quiz.duration} min
                </span>
                <span className="flex items-center gap-1 text-gray-500">
                  <TrendingUp className="w-4 h-4" />
                  {quiz.averageScore}% moyenne
                </span>
              </div>
              
              {progress && (
                <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                  {progress.score}%
                </span>
              )}
            </div>

            {isWeakness && (
              <div className="px-3 py-2 bg-red-50 border border-red-100 rounded-lg">
                <p className="text-xs font-medium text-red-700 flex items-center gap-1">
                  <Target className="w-3 h-3" />
                  Recommandé pour améliorer vos compétences dans ce domaine
                </p>
              </div>
            )}

            <div className="pt-3 border-t border-gray-100">
              {progress ? (
                <Button
                  variant="outline"
                  fullWidth
                  icon={CheckCircle}
                  iconPosition="left"
                  className="text-green-600 border-green-200 hover:bg-green-50"
                >
                  Quiz terminé ({progress.score}%)
                </Button>
              ) : (
                <Button
                  variant={isWeakness ? "primary" : "secondary"}
                  fullWidth
                  icon={Target}
                  iconPosition="left"
                  gradient={isWeakness}
                >
                  {isWeakness ? 'Améliorer cette compétence' : 'Commencer le quiz'}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

const CheckCircleIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);