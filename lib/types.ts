import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('fr-FR').format(num);
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

// Types principaux
export type Niveau = 'BAC' | 'BAC+2' | 'BAC+3' | 'BAC+5' | 'Master' | 'Doctorat';
export type Status = 'Inscriptions ouvertes' | 'À venir' | 'En cours' | 'Terminé';
export type Difficulte = 'Très élevée' | 'Élevée' | 'Moyenne';
export type Popularite = 'Très populaire' | 'Populaire' | 'Moyenne';
export type QuizDifficulty = 'Facile' | 'Moyenne' | 'Difficile' | 'Expert';
export type QuestionType = 'single' | 'multiple' | 'text' | 'true-false';
// Interfaces principales
export interface Concours {
  tags?: string[];
  id: string;
  title: string;
  institution: string;
  description: string;
  fullDescription: string;
  category: string;
  region: string;
  niveau: Niveau;
  dateLimite: string;
  dateOuverture: string;
  dateEpreuves: string;
  dateResultats: string;
  inscriptionFee: number;
  participants: number;
  difficulte: Difficulte;
  popularite: Popularite;
  status: Status;
  accentColor: string;
  location: string;
  website?: string;
  contacts?: {
    phone?: string;
    email?: string;
  };
  eligibility: string[];
  documents: string[];
  program?: Array<{
    nom: string;
    description: string;
    coefficient?: number;
  }>;
  stats: {
    places: number;
    applicants: number;
    successRate: number;
    lastYearApplicants?: number;
  };
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  concoursId: string;
  questions: number; // Nombre de questions
  duration: number; // Durée en minutes
  difficulty: QuizDifficulty;
  category: string;
  completed: number; // Nombre de fois complété
  averageScore: number; // Score moyen en pourcentage
  topics: string[];
  tags?: string[];
  featured: boolean;
  createdAt: string;
  updatedAt: string;
  instructions?: string; // Instructions pour le quiz
  passingScore?: number; // Score de passage (optionnel)
  showAnswers?: boolean; // Si les réponses sont montrées après
  showExplanations?: boolean; // Si les explications sont montrées
  allowRetry?: boolean; // Si le quiz peut être refait
  maxAttempts?: number; // Nombre maximum de tentatives
}

export interface Question {
  id: string; // Identifiant unique de la question
  text: string; // Énoncé de la question
  type: QuestionType; // Type de question
  options: QuestionOption[]; // Options de réponse
  explanation?: string; // Explication de la réponse correcte
  points: number; // Points attribués pour une réponse correcte
  category: string; // Catégorie de la question
  difficulty: 'Facile' | 'Moyenne' | 'Difficile' | 'Expert'; // Difficulté
  tags?: string[]; // Tags pour la recherche
  hint?: string; // Indice facultatif
  reference?: string; // Référence ou source
  createdAt?: string; // Date de création
  updatedAt?: string; // Date de mise à jour
}
export interface Answer {
  id?: string; // Identifiant unique de la réponse
  questionId: string; // ID de la question
  selectedOptions: string[]; // Options sélectionnées (tableau pour gérer les questions multiples)
  userId?: string; // ID de l'utilisateur (optionnel)
  quizId?: string; // ID du quiz (optionnel)
  isCorrect?: boolean; // Si la réponse est correcte
  pointsEarned?: number; // Points gagnés
  timestamp?: string; // Horodatage de la réponse
  timeSpent?: number; // Temps passé sur la question en secondes
}
export interface QuestionOption {
  id: string; // Identifiant de l'option (ex: "a", "b", "c")
  text: string; // Texte de l'option
  isCorrect: boolean; // Si l'option est correcte
  explanation?: string; // Explication supplémentaire pour cette option
}


export interface QuizAttempt {
  id: string;
  userId: string;
  quizId: string;
  score: number; // Score en pourcentage
  totalQuestions: number;
  correctAnswers: number;
  timeSpent: number; // En secondes
  answers: Answer[]; // Remplacez 'any[]' par 'Answer[]'
  completedAt: string;
  startedAt: string;
  details?: {
    categoryScores: Record<string, number>; // Scores par catégorie
    timePerQuestion: number[]; // Temps passé par question
    strengths: string[]; // Points forts identifiés
    weaknesses: string[]; // Points faibles identifiés
  };
}

export interface UserQuizProgress {
  userId: string;
  completedQuizzes: string[]; // IDs des quiz complétés
  attemptedQuizzes: QuizAttempt[];
  averageScore: number;
  totalTimeSpent: number; // en secondes
  streak: number; // jours consécutifs
  lastActive: string;
  level: number;
  experience: number;
  nextLevelExperience: number;
  achievements: string[];
  weakAreas: string[]; // domaines où l'utilisateur a des difficultés
  strongAreas: string[]; // domaines où l'utilisateur excelle
  recommendedQuizzes: string[]; // IDs des quiz recommandés
  categoriesProgress: Array<{
    category: string;
    completed: number;
    total: number;
    averageScore: number;
    lastAttempt?: string;
  }>;
  dailyGoals: {
    quizzes: number;
    time: number; // en minutes
    streak: boolean;
  };
  stats: {
    totalQuizzes: number;
    totalQuestions: number;
    correctAnswers: number;
    accuracy: number;
    averageTimePerQuestion: number;
    bestScore: number;
    bestScoreQuizId: string;
    fastestCompletion: number; // en secondes
    fastestCompletionQuizId: string;
  };
}

export interface User {
  id: string;
  email: string;
  name: string;
  profileImage?: string;
  role: 'student' | 'admin' | 'institution';
  preferences: {
    notifications: boolean;
    emailUpdates: boolean;
    region?: string;
    categories?: string[];
    difficulty?: QuizDifficulty[];
  };
  stats: {
    quizzesCompleted: number;
    averageScore: number;
    streak: number;
    totalStudyTime: number; // in minutes
  };
  createdAt: string;
  updatedAt: string;
}

export interface UserConcours {
  userId: string;
  concoursId: string;
  status: 'interested' | 'preparing' | 'registered' | 'attended' | 'passed' | 'failed';
  registrationDate?: string;
  applicationStatus?: 'draft' | 'submitted' | 'pending' | 'accepted' | 'rejected';
  notes?: string;
  documentsUploaded: string[];
  reminders: {
    deadline?: boolean;
    exam?: boolean;
    results?: boolean;
  };
  createdAt: string;
  updatedAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'info' | 'warning' | 'success' | 'reminder';
  title: string;
  message: string;
  link?: string;
  read: boolean;
  createdAt: string;
  expiresAt?: string;
}

export interface Category {
  id: string;
  label: string;
  count: number;
  color: string;
  icon: string;
  description: string;
}

export interface Statistic {
  title: string;
  value: string;
  change: string;
  icon: string;
  color: 'orange' | 'blue' | 'green' | 'purple' | 'red';
  description: string;
}

export interface BreadcrumbItem {
  label: string;
  href: string;
}

export interface SearchFilters {
  categories?: string[];
  regions?: string[];
  niveaux?: Niveau[];
  statuses?: Status[];
  difficulty?: Difficulte[];
  quizDifficulty?: QuizDifficulty[];
  priceRange?: {
    min?: number;
    max?: number;
  };
  dateRange?: {
    from?: string;
    to?: string;
  };
  applicationFee?: 'free' | 'paid';
  placesAvailable?: boolean;
  successRate?: {
    min?: number;
    max?: number;
  };
}

export interface PaginatedResult<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
  };
}

export interface QuizAnalytics {
  quizId: string;
  totalAttempts: number;
  averageScore: number;
  averageTime: number;
  questionStats: Array<{
    questionNumber: number;
    difficulty: string;
    correctRate: number;
    averageTime: number;
  }>;
  timeDistribution: Array<{
    range: string;
    count: number;
  }>;
  scoreDistribution: Array<{
    range: string;
    count: number;
  }>;
  completionRate: number;
}


export interface ConcoursAnalytics {
  concoursId: string;
  views: number;
  saves: number;
  shares: number;
  registrations: number;
  regionalDistribution: Record<string, number>;
  demographicData: {
    ageGroups: Record<string, number>;
    gender: Record<string, number>;
    educationLevel: Record<string, number>;
  };
  trafficSources: {
    direct: number;
    search: number;
    social: number;
    referral: number;
  };
  conversionRate: number;
  peakTimes: {
    hour: number;
    day: string;
    registrations: number;
  }[];
}
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  phone?: string;
}

export interface NewsletterFormData {
  email: string;
  categories: string[];
  frequency: 'daily' | 'weekly' | 'monthly';
}

export interface UserRegistrationData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  region: string;
  interests: string[];
  acceptTerms: boolean;
}
export interface UserAnalytics {
  userId: string;
  dailyActivity: Array<{
    date: string;
    quizzesCompleted: number;
    timeSpent: number;
    score: number;
  }>;
  weeklyProgress: {
    quizzes: number;
    scoreImprovement: number;
    streak: number;
  };
  learningPath: {
    completedCategories: string[];
    recommendedNext: string[];
    estimatedCompletion: string;
  };
}
export interface DashboardStats {
  urgentCount: number;
  openCount: number;
  totalParticipants: number;
  averageRate: number;
  totalQuizzes: number;
  quizParticipants: number;
  totalConcours: number;
  featuredQuizzes: number;
  userRank?: number;
  totalUsers?: number;
}


export interface DataVersion {
  version: string;
  updatedAt: string;
  changes: string[];
}


// Enums pour les icônes
export const IconMap = {
  BookOpen: 'BookOpen',
  Briefcase: 'Briefcase',
  Users: 'Users',
  Award: 'Award',
  Star: 'Star',
  GraduationCap: 'GraduationCap',
  Building: 'Building',
  Filter: 'Filter',
  Calendar: 'Calendar',
  Clock: 'Clock',
  TrendingUp: 'TrendingUp',
  TrendingDown: 'TrendingDown',
  Zap: 'Zap',
  Target: 'Target',
  BarChart: 'BarChart',
  Brain: 'Brain',
  Trophy: 'Trophy',
  Flame: 'Flame',
  Search: 'Search',
  ChevronRight: 'ChevronRight',
  ChevronDown: 'ChevronDown',
  Play: 'Play',
  CheckCircle: 'CheckCircle',
  ArrowRight: 'ArrowRight',
  MoreVertical: 'MoreVertical',
  Upload: 'Upload',
  Copy: 'Copy',
  Check: 'Check',
  Shield: 'Shield',
  MapPin: 'MapPin',
  Mail: 'Mail',
  Phone: 'Phone',
  Globe: 'Globe',
  FileText: 'FileText',
  UserCheck: 'UserCheck',
  Bookmark: 'Bookmark',
  Share2: 'Share2',
  Download: 'Download',
  Eye: 'Eye',
  Edit: 'Edit',
  Trash2: 'Trash2',
  Plus: 'Plus',
  Minus: 'Minus',
  X: 'X',
  Menu: 'Menu',
  Home: 'Home',
  Settings: 'Settings',
  Bell: 'Bell',
  LogOut: 'LogOut',
  HelpCircle: 'HelpCircle',
  ExternalLink: 'ExternalLink',
  Lock: 'Lock',
  Unlock: 'Unlock',
  Heart: 'Heart',
  ThumbsUp: 'ThumbsUp',
  MessageSquare: 'MessageSquare',
  Send: 'Send',
  Camera: 'Camera',
  Image: 'Image',
  Video: 'Video',
  Music: 'Music',
  Film: 'Film',
  Mic: 'Mic',
  Headphones: 'Headphones',
  Radio: 'Radio',
  Tv: 'Tv',
  Smartphone: 'Smartphone',
  Tablet: 'Tablet',
  Monitor: 'Monitor',
  Printer: 'Printer',
  Server: 'Server',
  Database: 'Database',
  HardDrive: 'HardDrive',
  Cpu: 'Cpu',
  MemoryStick: 'MemoryStick',
  Router: 'Router',
  Wifi: 'Wifi',
  Bluetooth: 'Bluetooth',
  Cloud: 'Cloud',
  CloudRain: 'CloudRain',
  CloudSnow: 'CloudSnow',
  CloudLightning: 'CloudLightning',
  Sun: 'Sun',
  Moon: 'Moon',
  Wind: 'Wind',
  Droplets: 'Droplets',
  Thermometer: 'Thermometer',
  Umbrella: 'Umbrella',
} as const;

export type IconType = keyof typeof IconMap;


