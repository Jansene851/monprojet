'use client';

import { useState, useEffect, useMemo } from 'react';
import {
  Search, Filter, TrendingUp, Clock, Award, Users, Zap,
  Target, BookOpen, Flame, 
  BarChart, Brain, Trophy, Play, CheckCircle, ArrowRight
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import QuizProgressCard from '../components/layout/quiz/QuizProgressCard';
import DifficultyFilter from '../components/layout/quiz/DifficultyFilter';
import CategoryFilter from '../components/layout/quiz/CategoryFilter';
import {
  getAllQuizzes,
  getQuizCategories,
  getQuizDifficulties,
  getQuizStatistics,
  getUserQuizProgress,
  getFeaturedQuizzes,
  searchQuizzes
} from '../../lib/data';
import type { Quiz, UserQuizProgress } from '../../lib/types';
import { useRouter } from 'next/navigation';

export default function QuizPage() {
  const router = useRouter();
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [filteredQuizzes, setFilteredQuizzes] = useState<Quiz[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Toutes');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('Toutes');
  const [userProgress, setUserProgress] = useState<UserQuizProgress | null>(null);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<string[]>([]);
  const [difficulties, setDifficulties] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'popular' | 'newest' | 'difficulty' | 'duration'>('popular');
  const [currentPage, setCurrentPage] = useState(1);
  const quizzesPerPage = 9;

  // Charger les données
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [
          allQuizzes,
          progress,
          quizStats,
          cats,
          diffs
        ] = await Promise.all([
          getAllQuizzes(),
          getUserQuizProgress(),
          getQuizStatistics(),
          getQuizCategories(),
          getQuizDifficulties()
        ]);

        setQuizzes(allQuizzes);
        setFilteredQuizzes(allQuizzes);
        setUserProgress(progress);
        setStats(quizStats);
        setCategories(cats);
        setDifficulties(diffs);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Filtrer et trier les quiz
  useEffect(() => {
    const filterAndSortQuizzes = async () => {
      const filtered = await searchQuizzes(searchTerm, {
        category: selectedCategory === 'Toutes' ? undefined : selectedCategory,
        difficulty: selectedDifficulty === 'Toutes' ? undefined : selectedDifficulty
      });

      // Trier
      const sorted = [...filtered].sort((a, b) => {
        switch (sortBy) {
          case 'popular':
            return b.completed - a.completed;
          case 'newest':
            // Utiliser les dates de création si disponibles
            const dateA = a.createdAt ? new Date(a.createdAt).getTime() : parseInt(a.id.replace('q', ''));
            const dateB = b.createdAt ? new Date(b.createdAt).getTime() : parseInt(b.id.replace('q', ''));
            return dateB - dateA;
          case 'difficulty':
            const difficultyOrder: Record<string, number> = { 
              'Facile': 1, 
              'Moyenne': 2, 
              'Difficile': 3, 
              'Expert': 4 
            };
            return (difficultyOrder[a.difficulty] || 0) - (difficultyOrder[b.difficulty] || 0);
          case 'duration':
            return a.duration - b.duration;
          default:
            return 0;
        }
      });

      setFilteredQuizzes(sorted);
      setCurrentPage(1); // Reset à la première page lors du filtrage
    };

    filterAndSortQuizzes();
  }, [searchTerm, selectedCategory, selectedDifficulty, quizzes, sortBy]);

  // Pagination
  const paginatedQuizzes = useMemo(() => {
    const startIndex = (currentPage - 1) * quizzesPerPage;
    const endIndex = startIndex + quizzesPerPage;
    return filteredQuizzes.slice(startIndex, endIndex);
  }, [filteredQuizzes, currentPage]);

  const totalPages = Math.ceil(filteredQuizzes.length / quizzesPerPage);

  // Statistiques utilisateur
  const userStats = useMemo(() => [
    { 
      icon: Award, 
      label: 'Quiz complétés', 
      value: userProgress?.completedQuizzes?.length || 0, 
      change: '+12%',
      description: 'Progression hebdomadaire'
    },
    { 
      icon: Target, 
      label: 'Score moyen', 
      value: `${userProgress?.averageScore || 0}%`, 
      change: '+5%',
      description: 'Amélioration mensuelle'
    },
    { 
      icon: Clock, 
      label: 'Temps total', 
      value: `${Math.floor((userProgress?.totalTimeSpent || 0) / 60)}h`, 
      change: '+8%',
      description: 'Heures d\'étude'
    },
    { 
      icon: Flame, 
      label: 'Série actuelle', 
      value: `${userProgress?.streak || 0} jours`, 
      change: userProgress?.streak ? '+1' : '0',
      description: 'Jours consécutifs'
    },
  ], [userProgress]);

  // Quiz recommandés
  const recommendedQuizzes = useMemo(() => {
    if (!userProgress?.recommendedQuizzes) return [];
    return quizzes.filter(q => userProgress.recommendedQuizzes?.includes(q.id)).slice(0, 3);
  }, [quizzes, userProgress]);

  // Quiz en vedette
  const featuredQuizzes = useMemo(() => {
    return quizzes.filter(q => q.featured).slice(0, 4);
  }, [quizzes]);

  // Gestion de la difficulté
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Expert': return 'bg-red-100 text-red-800 border-red-200';
      case 'Difficile': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Moyenne': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Facile': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Vérifier si un quiz est complété
  const isQuizCompleted = (quizId: string) => {
    return userProgress?.completedQuizzes?.includes(quizId) || false;
  };

  // Formater la durée
  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    
    if (hours > 0) {
      return `${hours}h${mins > 0 ? ` ${mins}min` : ''}`;
    }
    return `${mins}min`;
  };

  // Gérer le clic sur un quiz
  const handleQuizClick = (quizId: string) => {
    router.push(`/quiz/${quizId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50/50 flex items-center justify-center">
        <Card variant="elevated" className="p-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Chargement des quiz...</p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Hero Section */}
      <div className="bg-white border-b border-gray-200 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
            <div className="flex-1 text-gray-900">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Quiz Préparatoires
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl">
                Testez vos connaissances, préparez-vous efficacement aux concours 
                et suivez votre progression en temps réel.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button.PrimaryCTA href="/quiz/start">
                  Démarrer un quiz aléatoire
                </Button.PrimaryCTA>
                <Button
                  variant="outline"
                  className="bg-white/10 text-orange-600 border-orange-600 hover:bg-orange-600 hover:text-white"
                  icon={BarChart}
                  onClick={() => router.push('/progress')}
                >
                  Voir ma progression
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 w-full lg:w-auto">
              <Card.Stats
                icon={<Trophy className="w-5 h-5" />}
                value={`${userProgress?.averageScore || 0}%`}
                label="Score moyen"
                color="orange"
                trend={{ value: "+5%", positive: true }}
              />
              <Card.Stats
                icon={<Flame className="w-5 h-5" />}
                value={`${userProgress?.streak || 0}j`}
                label="Série actuelle"
                color="red"
                trend={{ value: "+2", positive: true }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        {/* Search & Filters Card */}
        <Card variant="elevated" className="mb-8 shadow-xl">
          <div className="p-6">
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Rechercher un quiz, un sujet ou une compétence..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('Toutes');
                    setSelectedDifficulty('Toutes');
                  }}
                  icon={Filter}
                >
                  Réinitialiser
                </Button>
              </div>
            </div>

            {/* Filters Row */}
            <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
              <CategoryFilter
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
              />

              <DifficultyFilter
                difficulties={difficulties}
                selectedDifficulty={selectedDifficulty}
                onDifficultyChange={setSelectedDifficulty}
              />
            </div>
          </div>
        </Card>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Featured Quizzes */}
          <div className="lg:col-span-2 space-y-8">
            {/* Featured Quizzes */}
            {featuredQuizzes.length > 0 && (
              <section>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <Zap className="w-6 h-6 text-orange-500" />
                    <h2 className="text-2xl font-bold text-gray-900">Quiz en Vedette</h2>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    icon={TrendingUp}
                    onClick={() => router.push('/quiz/trending')}
                  >
                    Voir les tendances
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {featuredQuizzes.map((quiz) => (
                    <Card.Feature
                      key={quiz.id}
                      icon={<Brain className="w-6 h-6" />}
                      title={quiz.title}
                      description={quiz.description}
                      gradient="from-orange-100 to-red-100"
                      iconColor="text-orange-600"
                      onClick={() => handleQuizClick(quiz.id)}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* All Quizzes */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <BookOpen className="w-6 h-6 text-orange-500" />
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Tous les Quiz</h2>
                    <p className="text-gray-600">{filteredQuizzes.length} quiz disponibles</p>
                  </div>
                </div>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="popular">Plus populaires</option>
                  <option value="newest">Plus récents</option>
                  <option value="difficulty">Par difficulté</option>
                  <option value="duration">Par durée</option>
                </select>
              </div>

              {paginatedQuizzes.length === 0 ? (
                <Card variant="elevated" className="text-center py-12">
                  <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Aucun quiz trouvé
                  </h3>
                  <p className="text-gray-600 mb-6 max-w-md mx-auto">
                    Modifiez vos critères de recherche ou explorez toutes nos catégories.
                  </p>
                  <Button
                    variant="primary"
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedCategory('Toutes');
                      setSelectedDifficulty('Toutes');
                    }}
                  >
                    Voir tous les quiz
                  </Button>
                </Card>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {paginatedQuizzes.map((quiz) => {
                      const completed = isQuizCompleted(quiz.id);
                      
                      return (
                        <Card
                          key={quiz.id}
                          variant="elevated"
                          hover
                          clickable
                          className="h-full transition-all duration-300 hover:shadow-lg"
                          onClick={() => handleQuizClick(quiz.id)}
                        >
                          <div className="flex flex-col h-full">
                            <div className="flex items-start justify-between mb-4">
                              <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${getDifficultyColor(quiz.difficulty)}`}>
                                {quiz.difficulty}
                              </span>
                              {completed && (
                                <Award className="w-5 h-5 text-green-500" />
                              )}
                            </div>
                            
                            <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                              {quiz.title}
                            </h3>
                            
                            <p className="text-gray-600 text-sm mb-4 grow line-clamp-2">
                              {quiz.description}
                            </p>
                            
                            <div className="space-y-3">
                              <div className="flex items-center justify-between text-sm text-gray-500">
                                <span className="flex items-center gap-1">
                                  <Clock className="w-4 h-4" />
                                  {formatDuration(quiz.duration)}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Users className="w-4 h-4" />
                                  {quiz.completed.toLocaleString()} participants
                                </span>
                              </div>
                              
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">
                                  Score moyen: <span className="font-semibold">{quiz.averageScore}%</span>
                                </span>
                                <span className="text-sm text-gray-600">
                                  {quiz.questions} questions
                                </span>
                              </div>
                              
                              <div className="pt-4 border-t border-gray-100">
                                <Button
                                  variant={completed ? "outline" : "primary"}
                                  fullWidth
                                  className={completed ? "text-green-600 border-green-200 hover:bg-green-50" : ""}
                                  icon={completed ? CheckCircle : Play}
                                  iconPosition="left"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleQuizClick(quiz.id);
                                  }}
                                >
                                  {completed ? 'Quiz terminé' : 'Commencer le quiz'}
                                </Button>
                              </div>
                            </div>
                          </div>
                        </Card>
                      );
                    })}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="mt-8">
                      <Card variant="ghost" padding="sm">
                        <div className="flex items-center justify-between">
                          <p className="text-gray-600 text-sm">
                            Affichage de {(currentPage - 1) * quizzesPerPage + 1} à {Math.min(currentPage * quizzesPerPage, filteredQuizzes.length)} sur {filteredQuizzes.length} quiz
                          </p>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                              disabled={currentPage === 1}
                            >
                              Précédent
                            </Button>
                            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                              let pageNum;
                              if (totalPages <= 5) {
                                pageNum = i + 1;
                              } else if (currentPage <= 3) {
                                pageNum = i + 1;
                              } else if (currentPage >= totalPages - 2) {
                                pageNum = totalPages - 4 + i;
                              } else {
                                pageNum = currentPage - 2 + i;
                              }
                              
                              return (
                                <Button
                                  key={pageNum}
                                  variant={currentPage === pageNum ? "primary" : "ghost"}
                                  size="sm"
                                  className={currentPage === pageNum ? "rounded-full" : ""}
                                  onClick={() => setCurrentPage(pageNum)}
                                >
                                  {pageNum}
                                </Button>
                              );
                            })}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                              disabled={currentPage === totalPages}
                            >
                              Suivant
                            </Button>
                          </div>
                        </div>
                      </Card>
                    </div>
                  )}
                </>
              )}
            </section>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-8">
            {/* Progress & Recommendations */}
            {recommendedQuizzes.length > 0 && (
              <Card variant="elevated">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">Pour vous</h3>
                  <Button variant="ghost" size="sm" onClick={() => router.push('/recommendations')}>
                    Voir plus
                  </Button>
                </div>
                <div className="space-y-4">
                  {recommendedQuizzes.map((quiz) => (
                    <QuizProgressCard
                      key={quiz.id}
                      quiz={quiz}
                      userProgress={userProgress!}
                    />
                  ))}
                </div>
              </Card>
            )}

            {/* Quick Stats */}
            <Card variant="outlined">
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                  <BarChart className="w-4 h-4 text-orange-500" />
                  Statistiques globales
                </h3>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Total quiz</span>
                    <span className="font-semibold text-gray-900">{stats?.totalQuizzes || 0}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Questions totales</span>
                    <span className="font-semibold text-gray-900">
                      {stats?.totalQuestions?.toLocaleString() || 0}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Tentatives totales</span>
                    <span className="font-semibold text-gray-900">
                      {stats?.totalAttempts?.toLocaleString() || 0}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Score moyen</span>
                    <span className="font-semibold text-gray-900">
                      {stats?.averageScore || 0}%
                    </span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Weak Areas */}
            {userProgress?.weakAreas && userProgress.weakAreas.length > 0 && (
              <Card variant="elevated" className="border-l-4 border-l-red-500">
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                    <Target className="w-4 h-4 text-red-500" />
                    Domaines à améliorer
                  </h3>
                  
                  <div className="space-y-2">
                    {userProgress.weakAreas.slice(0, 3).map((area, index) => (
                      <div
                        key={index}
                        className="px-3 py-2 bg-red-50 border border-red-100 rounded-lg"
                      >
                        <p className="text-sm font-medium text-red-700">{area}</p>
                        <p className="text-xs text-red-600 mt-1">
                          Score moyen: 45% • Recommandé: 3 quiz
                        </p>
                      </div>
                    ))}
                  </div>
                  
                  <Button
                    variant="outline"
                    fullWidth
                    className="text-red-600 border-red-200 hover:bg-red-50"
                    onClick={() => router.push('/weaknesses')}
                  >
                    Améliorer ces compétences
                  </Button>
                </div>
              </Card>
            )}

            {/* Daily Challenge */}
            <Card variant="elevated" className="bg-linear-to-r from-purple-500 to-pink-600 text-white">
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Défi du jour</h3>
                <p className="text-white/90 text-sm">
                  Terminez 2 quiz aujourd'hui pour maintenir votre série et gagner 50 points d'expérience.
                </p>
                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    <div className="font-medium">Progression</div>
                    <div className="text-white/80">1/2 quiz complétés</div>
                  </div>
                  <div className="w-12 h-12 rounded-full border-4 border-white/20 flex items-center justify-center">
                    <span className="font-bold">50%</span>
                  </div>
                </div>
                <Button
                  variant="outline"
                  fullWidth
                  className="bg-white/10 text-white border-white/20 hover:bg-white/20"
                  icon={ArrowRight}
                  onClick={() => router.push('/daily-challenge')}
                >
                  Relever le défi
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}