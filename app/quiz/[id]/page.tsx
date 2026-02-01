'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import {
  Clock, CheckCircle, XCircle,
  ChevronLeft, ChevronRight, Flag,
  BarChart3, Award, Target, Eye, EyeOff
} from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import {
  getQuizById,
  getShuffledQuizQuestions,
  calculateQuizScore,
  updateQuizProgress,
  checkAnswer
} from '@/lib/data';
import type { Answer, Question } from '@/lib/types';

export default function QuizPage() {
  const router = useRouter();
  const params = useParams();
  const quizId = params.id as string;

  const [quiz, setQuiz] = useState<any>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<string>>(new Set());
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showExplanations, setShowExplanations] = useState(false);

  const questionRef = useRef<HTMLDivElement>(null);

  // Initialiser le quiz
  useEffect(() => {
    const loadQuiz = async () => {
      setLoading(true);
      try {
        const quizData = getQuizById(quizId);
        if (!quizData) {
          router.push('/quiz');
          return;
        }

        const quizQuestions = getShuffledQuizQuestions(quizId, {
          shuffleQuestions: true,
          shuffleOptions: true
        });

        setQuiz(quizData);
        setQuestions(quizQuestions);
        setTimeRemaining(quizData.duration * 60);
        
        const initialAnswers: Answer[] = quizQuestions.map(q => ({
          questionId: q.id,
          selectedOptions: [],
          isCorrect: false,
          timeSpent: 0
        }));
        setAnswers(initialAnswers);
      } catch (error) {
        console.error('Erreur lors du chargement du quiz:', error);
        router.push('/quiz');
      } finally {
        setLoading(false);
      }
    };

    loadQuiz();
  }, [quizId, router]);

  // Gérer le timer
  useEffect(() => {
    if (!quizStarted || quizCompleted || timeRemaining <= 0) return;

    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          handleSubmitQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [quizStarted, quizCompleted, timeRemaining]);

  // Effet pour scroller vers le haut lors du changement de question
  useEffect(() => {
    // Scroller vers le haut de la page lors du changement de question
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Optionnel: Scroller vers la référence de la question si elle existe
    if (questionRef.current) {
      questionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [currentQuestionIndex]);

  // Effet pour scroller vers le haut lors du redémarrage du quiz
  useEffect(() => {
    if (!quizStarted && !quizCompleted && results) {
      // Quand on recommence le quiz, on revient à l'écran de démarrage
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [quizStarted, quizCompleted, results]);

  // Formater le temps
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Gérer la sélection de réponse
  const handleAnswerSelect = (optionId: string, questionId: string, type: string) => {
    const currentQuestion = questions[currentQuestionIndex];
    if (!currentQuestion) return;

    setAnswers(prev => {
      const existingAnswer = prev.find(a => a.questionId === questionId);
      
      let newSelectedOptions: string[];
      
      if (type === 'single') {
        newSelectedOptions = [optionId];
      } else {
        const selected = existingAnswer?.selectedOptions || [];
        if (selected.includes(optionId)) {
          newSelectedOptions = selected.filter(id => id !== optionId);
        } else {
          newSelectedOptions = [...selected, optionId];
        }
      }

      // Vérifier si la réponse est correcte
      const result = checkAnswer(currentQuestion, newSelectedOptions);

      if (existingAnswer) {
        return prev.map(a =>
          a.questionId === questionId
            ? { 
                ...a, 
                selectedOptions: newSelectedOptions,
                isCorrect: result.isCorrect
              }
            : a
        );
      } else {
        return [...prev, {
          questionId,
          selectedOptions: newSelectedOptions,
          isCorrect: result.isCorrect,
          timeSpent: 0,
          timestamp: new Date().toISOString()
        }];
      }
    });
  };

  // Marquer/démarquer une question
  const toggleFlagQuestion = (questionId: string) => {
    const newFlagged = new Set(flaggedQuestions);
    if (newFlagged.has(questionId)) {
      newFlagged.delete(questionId);
    } else {
      newFlagged.add(questionId);
    }
    setFlaggedQuestions(newFlagged);
  };

  // Navigation entre questions
  const goToQuestion = (index: number) => {
    if (index >= 0 && index < questions.length) {
      setCurrentQuestionIndex(index);
    }
  };

  // Soumettre le quiz
  const handleSubmitQuiz = useCallback(async () => {
    if (!quiz || !questions.length) return;

    const scoreData = calculateQuizScore(answers, questions);

    setResults({
      ...scoreData,
      quizId: quiz.id,
      submittedAt: new Date().toISOString()
    });

    setQuizCompleted(true);

    // Scroller vers le haut pour voir les résultats
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Mettre à jour la progression
    try {
      await updateQuizProgress(
        quiz.id,
        scoreData.percentage,
        0,
        answers
      );
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la progression:', error);
    }
  }, [quiz, answers, questions]);

  // Redémarrer le quiz
  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setAnswers(questions.map(q => ({
      questionId: q.id,
      selectedOptions: [],
      isCorrect: false,
      timeSpent: 0
    })));
    setFlaggedQuestions(new Set());
    setTimeRemaining(quiz.duration * 60);
    setQuizStarted(false);
    setQuizCompleted(false);
    setResults(null);
    setShowExplanations(false);
    
    // Scroller vers le haut pour voir l'écran de démarrage
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Vérifier si une option est sélectionnée
  const isOptionSelected = (questionId: string, optionId: string) => {
    const answer = answers.find(a => a.questionId === questionId);
    if (!answer) return false;
    return answer.selectedOptions.includes(optionId);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-3 text-sm text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!quiz || questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="p-6">
          <div className="text-center">
            <XCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Quiz non trouvé</h2>
            <Button
              variant="primary"
              size="sm"
              onClick={() => router.push('/quiz')}
            >
              Retour aux quiz
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const answeredCount = answers.filter(a => a.selectedOptions.length > 0).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* En-tête minimal */}
      <header className="sticky top-0 z-10 bg-white border-b pt-16">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push('/quiz')}
                className="mr-3"
              >
                <ChevronLeft size={16} />
              </Button>
              <div>
                <h1 className="text-base font-semibold truncate max-w-[200px]">{quiz.title}</h1>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <Badge variant="secondary" className="text-xs">{quiz.category}</Badge>
                  <Badge variant="outline" className="text-xs">{quiz.difficulty}</Badge>
                </div>
              </div>
            </div>

            {quizStarted && !quizCompleted && (
              <div className="flex items-center gap-4">
                <div className="flex items-center bg-red-50 px-3 py-1.5 rounded">
                  <Clock className="text-red-600 mr-1.5" size={16} />
                  <span className="text-sm font-semibold text-red-600">
                    {formatTime(timeRemaining)}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Contenu principal - avec ref pour le scrolling */}
      <div className="container mx-auto px-4 py-6" ref={questionRef}>
        {!quizStarted ? (
          // Écran de démarrage compact
          <div className="max-w-2xl mx-auto">
            <Card className="p-6">
              <div className="text-center mb-6">
                <h2 className="text-xl font-bold mb-2">{quiz.title}</h2>
                <p className="text-gray-600 text-sm">{quiz.description}</p>
              </div>

              <div className="grid grid-cols-1 gap-4 mb-6">
                <div className="flex items-center">
                  <Clock className="text-orange-500 mr-3" size={18} />
                  <div>
                    <div className="font-medium text-sm">Durée</div>
                    <div className="text-gray-600 text-sm">{quiz.duration} min</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <Target className="text-orange-500 mr-3" size={18} />
                  <div>
                    <div className="font-medium text-sm">Questions</div>
                    <div className="text-gray-600 text-sm">{questions.length} questions mélangées</div>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <Button
                  className="w-full"
                  onClick={() => {
                    setQuizStarted(true);
                    // Scroller vers le haut pour voir la première question
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  Commencer
                </Button>
              </div>
            </Card>
          </div>
        ) : quizCompleted ? (
          // Écran de résultats
          <div className="max-w-3xl mx-auto">
            <Card className="p-6">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-r from-orange-500 to-red-500 rounded-full mb-3">
                  <Award className="text-white" size={28} />
                </div>
                <h2 className="text-2xl font-bold mb-1">Terminé !</h2>
                <div className="text-4xl font-bold text-orange-600 mb-3">
                  {results?.percentage || 0}%
                </div>
                <p className="text-gray-600 text-sm">
                  {results?.correctAnswers || 0} / {questions.length} réponses correctes
                </p>
              </div>

              {/* Bouton pour voir les explications */}
              <div className="mb-4">
                <Button
                  variant="outline"
                  fullWidth
                  size="sm"
                  onClick={() => setShowExplanations(!showExplanations)}
                  icon={showExplanations ? EyeOff : Eye}
                >
                  {showExplanations ? 'Masquer les erreurs' : 'Voir les erreurs'}
                </Button>
              </div>

              {/* Explications (seulement si demandé) */}
              {showExplanations && (
                <div className="space-y-4 mb-6">
                  <h3 className="font-semibold text-gray-900">Explications</h3>
                  {questions.map((question, index) => {
                    const answer = answers.find(a => a.questionId === question.id);
                    const result = checkAnswer(question, answer?.selectedOptions || []);
                    
                    if (result.isCorrect) return null; // Ne montrer que les erreurs

                    return (
                      <Card key={question.id} className="p-4 border-red-200 bg-red-50/50">
                        <div className="text-sm font-medium text-gray-900 mb-2">
                          Question {index + 1}
                        </div>
                        <div className="text-sm text-gray-800 mb-3">{question.text}</div>
                        <div className="text-sm text-blue-700">{question.explanation}</div>
                      </Card>
                    );
                  })}
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  size="sm"
                  onClick={handleRestartQuiz}
                >
                  Recommencer
                </Button>
                <Button
                  variant="primary"
                  className="flex-1"
                  size="sm"
                  onClick={() => router.push('/quiz')}
                  icon={BarChart3 }
                >
                  Autres quiz
                </Button>
              </div>
            </Card>
          </div>
        ) : (
          // Interface du quiz compacte
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Navigation compacte */}
              <Card className="lg:col-span-1 p-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Progress</span>
                    <span className="font-medium">{currentQuestionIndex + 1}/{questions.length}</span>
                  </div>
                  <div className="grid grid-cols-4 gap-1.5">
                    {questions.map((question, index) => {
                      const answer = answers.find(a => a.questionId === question.id);
                      const isAnswered = (answer?.selectedOptions?.length || 0) > 0;
                      const isCurrent = currentQuestionIndex === index;
                      
                      return (
                        <button
                          key={question.id}
                          onClick={() => goToQuestion(index)}
                          className={`h-8 rounded text-xs font-medium flex items-center justify-center relative ${
                            isCurrent
                              ? 'bg-orange-500 text-white'
                              : isAnswered
                              ? answer?.isCorrect
                                ? 'bg-green-100 text-green-800 border border-green-200'
                                : 'bg-red-100 text-red-800 border border-red-200'
                              : flaggedQuestions.has(question.id)
                              ? 'bg-yellow-100 text-yellow-700 border border-yellow-200'
                              : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {index + 1}
                          {flaggedQuestions.has(question.id) && (
                            <Flag size={8} className="absolute -top-0.5 -right-0.5" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Répondues</span>
                    <span className="font-medium">{answeredCount}/{questions.length}</span>
                  </div>
                </div>
              </Card>

              {/* Question principale */}
              <Card className="lg:col-span-2 p-5">
                {/* En-tête question */}
                <div className="flex items-center justify-between mb-4 pb-3 border-b">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      Q{currentQuestionIndex + 1}
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      {currentQuestion?.category}
                    </Badge>
                    <span className="text-xs text-gray-500">
                      {currentQuestion?.points}pt
                    </span>
                  </div>
                  <button
                    onClick={() => toggleFlagQuestion(currentQuestion.id)}
                    className={`text-sm flex items-center gap-1 ${flaggedQuestions.has(currentQuestion.id) ? 'text-yellow-600' : 'text-gray-500'}`}
                  >
                    <Flag size={14} />
                    {flaggedQuestions.has(currentQuestion.id) ? 'Marqué' : 'Marquer'}
                  </button>
                </div>

                {/* Question */}
                <h3 className="text-lg font-semibold mb-5 text-gray-900">
                  {currentQuestion?.text}
                </h3>

                {/* Options compactes */}
                <div className="space-y-2.5 mb-6">
                  {currentQuestion?.options?.map((option: any) => {
                    const isSelected = isOptionSelected(currentQuestion.id, option.id);
                    
                    return (
                      <button
                        key={option.id}
                        onClick={() => handleAnswerSelect(option.id, currentQuestion.id, currentQuestion.type)}
                        className={`w-full text-left p-3 rounded-lg border transition-all text-sm ${
                          isSelected
                            ? 'border-orange-500 bg-orange-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center">
                          <div className={`w-7 h-7 rounded-full flex items-center justify-center mr-3 text-sm ${
                            isSelected
                              ? 'bg-orange-500 text-white'
                              : 'bg-gray-100 text-gray-700'
                          }`}>
                            {String.fromCharCode(65 + option.id.charCodeAt(0) - 97)}
                          </div>
                          <span className={`${isSelected ? 'font-medium' : ''}`}>
                            {option.text}
                          </span>
                          {isSelected && (
                            <CheckCircle className="ml-auto text-orange-500" size={18} />
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Navigation */}
                <div className="flex justify-between pt-4 border-t">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => goToQuestion(currentQuestionIndex - 1)}
                    disabled={currentQuestionIndex === 0}
                  >
                    <ChevronLeft size={16} />
                    Précédent
                  </Button>
                  
                  <div className="flex items-center gap-3">
                    {currentQuestionIndex < questions.length - 1 ? (
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => goToQuestion(currentQuestionIndex + 1)}
                      >
                        Suivant
                        <ChevronRight size={16} />
                      </Button>
                    ) : (
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={handleSubmitQuiz}
                      >
                        Terminer
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}