'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Search,
  Menu,
  X,
  GraduationCap,
  Bell,
  User,
  ChevronDown,
  Home,
  BookOpen,
  MessageSquare,
  Calendar,
  Award,
  Sparkles,
  Moon,
  Sun,
  Settings,
  LogOut,
  Bookmark,
  UserCheck,
  Shield,
  FileText,
  HelpCircle,
  Phone,
  Sparkle,
  ChevronUp,
  ChevronRight,
  Zap,
  Target,
  Users,
  TrendingUp,
  BarChart3,
  Target as TargetIcon,
  Clock,
  CheckCircle,
  TrendingDown,
  CalendarDays,
  Trophy,
  Medal,
  Crown
} from 'lucide-react';
import SearchModal from '@/app/components/ui/Search';
import AuthModal from '@/app/components/layout/AuthModal';
import { Button } from '@/app/components/ui/Button';
import { Card } from '@/app/components/ui/Card';



// Types
interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'premium' | 'admin';
  avatarColor: string;
  memberSince: string;
  notifications: number;
  favorites: number;
  enrolled: number;
  level?: number;
  points?: number;
  nextLevelPoints?: number;
}

interface NavLink {
  name: string;
  href: string;
  icon: React.ReactNode;
  badge: string | null;
  description: string;
  color: string;
}

interface DashboardStats {
  totalEnrolled: number;
  completedQuizzes: number;
  averageScore: number;
  nextDeadline: string | null;
  upcomingConcours: number;
  progress: number;
  studyHours: number;
  streak: number;
}

interface Concours {
  id: number;
  title: string;
  institution: string;
  deadline: string;
  status: 'registered' | 'pending' | 'completed' | 'upcoming';
  progress: number;
  daysLeft: number;
  category: string;
  priority: 'high' | 'medium' | 'low';
}

interface Quiz {
  id: number;
  title: string;
  category: string;
  score: number;
  totalQuestions: number;
  status: 'completed' | 'in-progress' | 'not-started';
  timeSpent: number;
  lastAttempt: string;
  improvement: number;
}

interface Activity {
  id: number;
  type: 'quiz' | 'concours' | 'resource' | 'achievement';
  title: string;
  description: string;
  time: string;
  read: boolean;
  icon: React.ReactNode;
  color: string;
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isTop, setIsTop] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [notifications] = useState(3);

  // Dashboard data
  const [dashboardStats, setDashboardStats] = useState<DashboardStats>({
    totalEnrolled: 0,
    completedQuizzes: 0,
    averageScore: 0,
    nextDeadline: null,
    upcomingConcours: 0,
    progress: 0,
    studyHours: 0,
    streak: 0
  });

  const pathname = usePathname();
  const router = useRouter();
  const userMenuRef = useRef<HTMLDivElement>(null);
  const dashboardRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const lastScrollY = useRef(0);

  // Navigation links - mémoïsé
  const navLinks = useMemo<NavLink[]>(() => [
    {
      name: 'Accueil',
      href: '/',
      icon: <Home className="h-4 w-4" />,
      badge: null,
      description: 'Page principale',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      name: 'Concours',
      href: '/concours',
      icon: <Award className="h-4 w-4" />,
      badge: '24',
      description: 'Tous les concours',
      color: 'from-orange-500 to-red-500'
    },
    {
      name: 'Quiz',
      href: '/quiz',
      icon: <Target className="h-4 w-4" />,
      badge: '50+',
      description: 'Tests d\'entraînement',
      color: 'from-purple-500 to-pink-500'
    },
    {
      name: 'Actualités',
      href: '/actualites',
      icon: <MessageSquare className="h-4 w-4" />,
      badge: '12',
      description: 'Nouvelles et mises à jour',
      color: 'from-green-500 to-emerald-500'
    },
    {
      name: 'Calendrier',
      href: '/calendrier',
      icon: <Calendar className="h-4 w-4" />,
      badge: null,
      description: 'Dates importantes',
      color: 'from-yellow-500 to-amber-500'
    },
  ], []);

  // Mock data for dashboard
  const upcomingConcours: Concours[] = [
    {
      id: 1,
      title: 'Concours ENA 2024',
      institution: 'École Nationale d\'Administration',
      deadline: '15 Mai 2024',
      status: 'registered',
      progress: 75,
      daysLeft: 45,
      category: 'Administration',
      priority: 'high'
    },
    {
      id: 2,
      title: 'Police Nationale',
      institution: 'Ministère de la Sécurité',
      deadline: '30 Juin 2024',
      status: 'pending',
      progress: 30,
      daysLeft: 90,
      category: 'Sécurité',
      priority: 'medium'
    }
  ];

  const recentQuizzes: Quiz[] = [
    {
      id: 1,
      title: 'Culture Générale - Session 1',
      category: 'Culture Générale',
      score: 85,
      totalQuestions: 20,
      status: 'completed',
      timeSpent: 45,
      lastAttempt: 'Il y a 2 jours',
      improvement: 12
    },
    {
      id: 2,
      title: 'Mathématiques - Algèbre',
      category: 'Mathématiques',
      score: 72,
      totalQuestions: 15,
      status: 'completed',
      timeSpent: 30,
      lastAttempt: 'Il y a 5 jours',
      improvement: 5
    }
  ];

  const activities: Activity[] = [
    {
      id: 1,
      type: 'quiz',
      title: 'Quiz terminé avec succès',
      description: 'Vous avez obtenu 85% au quiz "Culture Générale"',
      time: 'Il y a 2 heures',
      read: false,
      icon: <Target className="h-4 w-4" />,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      id: 2,
      type: 'concours',
      title: 'Date limite approche',
      description: 'Concours ENA : Plus que 45 jours pour finaliser',
      time: 'Il y a 1 jour',
      read: false,
      icon: <CheckCircle className="h-4 w-4" />,
      color: 'bg-orange-100 text-orange-600'
    }
  ];

  // Graph data
  const weeklyProgress = [
    { day: 'Lun', value: 60 },
    { day: 'Mar', value: 75 },
    { day: 'Mer', value: 85 },
    { day: 'Jeu', value: 70 },
    { day: 'Ven', value: 90 },
    { day: 'Sam', value: 65 },
    { day: 'Dim', value: 80 }
  ];

  // Gestion du scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      setIsScrolled(scrollY > 50);
      setIsTop(scrollY < 10);
      setShowScrollTop(scrollY > 500);

      // Calcul du progrès du scroll
      const maxScroll = documentHeight - windowHeight;
      const progress = maxScroll > 0 ? (scrollY / maxScroll) * 100 : 0;
      setScrollProgress(progress);

      // Cache/affiche le header au scroll
      const isScrollingDown = scrollY > lastScrollY.current && scrollY > 100;
      lastScrollY.current = scrollY;

      if (headerRef.current) {
        if (isScrollingDown && !isMenuOpen) {
          headerRef.current.style.transform = 'translateY(-100%)';
        } else {
          headerRef.current.style.transform = 'translateY(0)';
        }
        headerRef.current.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMenuOpen]);

  // Fermeture du menu utilisateur et dashboard au clic extérieur
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
      if (dashboardRef.current && !dashboardRef.current.contains(event.target as Node)) {
        setIsDashboardOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Empêcher le scroll quand les modals sont ouverts
  useEffect(() => {
    if (searchModalOpen || isMenuOpen || isDashboardOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [searchModalOpen, isMenuOpen, isDashboardOpen]);

  // Initialisation du thème et de l'utilisateur
  useEffect(() => {




    // Charger l'utilisateur
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);

        // Charger les stats du dashboard
        const stats: DashboardStats = {
          totalEnrolled: parsedUser.enrolled || 3,
          completedQuizzes: 12,
          averageScore: 78,
          nextDeadline: '15 Mars 2024',
          upcomingConcours: 2,
          progress: 68,
          studyHours: 45,
          streak: 7
        };
        setDashboardStats(stats);
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('user');
      }
    }
  }, []);

  // Toggle dark mode

  // Gestion de la recherche
  const handleSearch = useCallback((query: string, filter: string = 'all') => {
    const params = new URLSearchParams();
    if (query) params.set('search', query);
    if (filter && filter !== 'all') params.set('filter', filter);

    router.push(`/concours?${params.toString()}`);
    setSearchModalOpen(false);
    setIsMenuOpen(false);
    setIsDashboardOpen(false);
  }, [router]);

  // Gestion de l'authentification
  const handleLogin = useCallback((demoUser?: boolean) => {
    if (demoUser) {
      const demoUserData: User = {
        id: '1',
        name: 'Koffi Traoré',
        email: 'koffi.traore@example.com',
        role: 'premium',
        avatarColor: 'from-blue-500 to-cyan-500',
        memberSince: '2024-01-01',
        notifications: 5,
        favorites: 12,
        enrolled: 3,
        level: 3,
        points: 450,
        nextLevelPoints: 600
      };
      setUser(demoUserData);

      const stats: DashboardStats = {
        totalEnrolled: demoUserData.enrolled,
        completedQuizzes: 12,
        averageScore: 78,
        nextDeadline: '15 Mars 2024',
        upcomingConcours: 2,
        progress: 68,
        studyHours: 45,
        streak: 7
      };
      setDashboardStats(stats);

      localStorage.setItem('user', JSON.stringify(demoUserData));
      setIsUserMenuOpen(false);
      setIsDashboardOpen(true);
    } else {
      setAuthMode('login');
      setAuthModalOpen(true);
    }
  }, []);

  const handleSignup = useCallback(() => {
    setAuthMode('signup');
    setAuthModalOpen(true);
  }, []);

  const handleLogout = useCallback(() => {
    setUser(null);
    setDashboardStats({
      totalEnrolled: 0,
      completedQuizzes: 0,
      averageScore: 0,
      nextDeadline: null,
      upcomingConcours: 0,
      progress: 0,
      studyHours: 0,
      streak: 0
    });
    localStorage.removeItem('user');
    setIsUserMenuOpen(false);
    setIsDashboardOpen(false);
    router.push('/');
  }, [router]);

  // Toggle dashboard
  const toggleDashboard = useCallback(() => {
    if (user) {
      setIsDashboardOpen(!isDashboardOpen)
      router.push('/dashbord');
    } else {
      setAuthMode('login');
      setAuthModalOpen(true);
      ;
    }
  }, [user, isDashboardOpen]);

  // Fonction pour scroller vers le haut
  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

  // Fermer tous les menus
  const closeAllMenus = useCallback(() => {
    setIsMenuOpen(false);
    setIsUserMenuOpen(false);
    setIsDashboardOpen(false);
  }, []);

  // Navigation item mobile avec Button réutilisable
  const MobileNavItem = useCallback(({ link }: { link: NavLink }) => (
    <Button
      href={link.href}
      variant="ghost"
      className={`w-full justify-start h-auto py-4 ${pathname === link.href
        ? 'bg-linear-to-r from-orange-50 to-red-50 dark:from-gray-800 dark:to-gray-800 text-orange-600 dark:text-orange-400 font-semibold'
        : 'text-gray-700 dark:text-gray-300'
        }`}
      onClick={closeAllMenus}
    >
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center space-x-3">
          <div className={`w-10 h-10 rounded-xl bg-linear-to-r ${link.color} flex items-center justify-center`}>
            {link.icon}
          </div>
          <div className="text-left">
            <div className="font-medium">{link.name}</div>
            <div className="text-xs opacity-75">{link.description}</div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {link.badge && (
            <span className="px-2 py-1 text-xs bg-linear-to-r from-orange-500 to-red-500 text-white rounded-full">
              {link.badge}
            </span>
          )}
          <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>
    </Button>
  ), [pathname, closeAllMenus]);


  return (
    <>
      <header
        ref={headerRef}
        className={`
          fixed top-0 left-0 right-0 z-50
          transition-all duration-300 ease-out
          ${isScrolled
            ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl shadow-lg shadow-gray-200/50 dark:shadow-gray-900/50 py-2'
            : 'bg-white dark:bg-gray-900 py-3'
          }
          ${isTop ? 'border-b border-gray-200 dark:border-gray-800' : ''}
        `}
      >
        {/* Progress bar */}
        <div
          className="absolute bottom-0 left-0 h-0.5 bg-linear-to-r from-orange-500 via-red-500 to-pink-500 transition-all duration-200"
          style={{ width: `${scrollProgress}%` }}
        />

        {/* Top banner - visible seulement au top */}
        {isTop && (
          <div className="animate-slide-down">
            <div className="bg-linear-to-r from-orange-500 via-red-500 to-pink-500 text-white">
              <div className="container mx-auto px-4 py-1.5">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <Sparkles className="h-3.5 w-3.5 mr-2 animate-pulse" />
                    <span className="font-medium truncate">🎉 Nouveau : 15 concours ouverts cette semaine !</span>
                  </div>
                  <Button
                    href="/concours"
                    variant="ghost"
                    size="sm"
                    className="text-white hover:text-white hover:bg-white/20"
                  >
                    Voir maintenant
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main header */}
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Button
              href="/"
              variant="ghost"
              className="flex items-center space-x-3 group p-0"
              onClick={closeAllMenus}
            >
              <div className="relative">
                <div className={`absolute inset-0 bg-linear-to-r from-orange-500 to-red-600 rounded-xl blur transition-all duration-300 ${isScrolled ? 'opacity-50' : 'opacity-70 group-hover:opacity-100 group-hover:blur-lg'
                  }`} />
                <div className={`relative bg-linear-to-r from-orange-500 to-red-600 rounded-xl shadow-md transition-all duration-300 ${isScrolled ? 'p-2' : 'p-2.5'
                  }`}>
                  <GraduationCap className={`text-white transition-all duration-300 ${isScrolled ? 'h-6 w-6' : 'h-7 w-7'
                    }`} />
                </div>
              </div>
              <div className={`${isScrolled ? 'hidden md:block' : 'hidden sm:block'}`}>
                <h1 className={`font-bold text-gray-900 dark:text-white tracking-tight transition-all duration-300 ${isScrolled ? 'text-xl' : 'text-2xl'
                  }`}>
                  Concours<span className="text-orange-600 dark:text-orange-400">.ci</span>
                </h1>
                {!isScrolled && (
                  <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                    Votre succès commence ici
                  </p>
                )}
              </div>
            </Button>

            {/* Desktop Navigation - se cache sur mobile */}
            <nav className="hidden lg:flex items-center space-x-1" aria-label="Navigation principale">
              {navLinks.map((link) => (
                <Button
                  key={link.name}
                  href={link.href}
                  variant={pathname === link.href ? 'primary' : 'ghost'}
                  className={`px-4 py-2.5 ${pathname === link.href ? 'linear shadow-sm' : ''}`}
                  title={link.description}
                  size="sm"
                >
                  <div className={`transition-transform duration-200 ${isScrolled ? 'scale-90' : ''}`}>
                    {link.icon}
                  </div>
                  <span className={`font-medium whitespace-nowrap transition-all duration-200 ${isScrolled ? 'text-sm' : ''
                    }`}>
                    {link.name}
                  </span>
                  {link.badge && (
                    <span className="absolute -top-1 -right-1 px-1.5 py-0.5 text-xs bg-linear-to-r from-orange-500 to-red-500 text-white rounded-full shadow-sm">
                      {link.badge}
                    </span>
                  )}
                </Button>
              ))}
            </nav>

            {/* Right side actions */}
            <div className="flex items-center space-x-2 lg:space-x-3">
              {/* Dashboard Button */}
              <Button
                onClick={toggleDashboard}
                variant="ghost"
                icon={BarChart3}
                iconOnly
                className="shadow-sm relative"
                title="Dashboard"
                badge={user && user.notifications > 0 ? "!" : undefined}
              />

              {/* Search Button */}
              <Button
                onClick={() => setSearchModalOpen(true)}
                variant="ghost"
                icon={Search}
                iconOnly
                className="shadow-sm"
                title="Rechercher"
              />

              {/* Notifications */}
              <div className="relative">
                <Button
                  onClick={() => {
                    router.push('/notifications');
                    closeAllMenus();
                  }}
                  variant="ghost"
                  icon={Bell}
                  iconOnly
                  className="shadow-sm relative"
                  badge={notifications > 0 ? notifications.toString() : undefined}
                />
              </div>

              {/* User Menu */}
              <div className="relative" ref={userMenuRef}>
                <Button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  variant="ghost"
                  className="p-1.5"
                >
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-white shadow-sm transition-all duration-200 ${user ? user.avatarColor : 'bg-linear-to-r from-orange-500 to-red-600'
                    } ${isScrolled ? 'scale-90' : ''}`}>
                    {user ? (
                      <span className="font-semibold">
                        {user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                      </span>
                    ) : (
                      <User className="h-5 w-5" />
                    )}
                  </div>
                  <div className="hidden lg:block text-left min-w-0">
                    <p className={`font-medium text-gray-900 dark:text-white truncate transition-all duration-200 ${isScrolled ? 'text-sm' : ''
                      }`}>
                      {user ? user.name : 'Bienvenue'}
                    </p>
                    {!isScrolled && (
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                        {user ? user.email : 'Connectez-vous'}
                      </p>
                    )}
                  </div>
                  <ChevronDown className={`h-4 w-4 text-gray-400 transition-all duration-200 ${isUserMenuOpen ? 'rotate-180' : ''
                    } ${isScrolled ? 'scale-90' : ''}`} />
                </Button>

                {/* User Menu Dropdown */}
                {isUserMenuOpen && (
                  <Card
                    variant="elevated"
                    className="absolute right-0 mt-2 w-80 shadow-2xl animate-slide-up"
                    padding="none"
                  >
                    <div className="max-h-[calc(100vh-200px)] overflow-y-auto">
                      {user ? (
                        <>
                          {/* User info */}
                          <div className="p-6 bg-linear-to-br from-orange-50 via-red-50 to-pink-50 dark:from-gray-800 dark:via-gray-800 dark:to-gray-800">
                            <div className="flex items-center space-x-3">
                              <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-md ${user.avatarColor}`}>
                                <span className="font-bold text-lg">
                                  {user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                                </span>
                              </div>
                              <div>
                                <div className="flex items-center space-x-2">
                                  <h3 className="font-semibold text-gray-900 dark:text-white">
                                    {user.name}
                                  </h3>
                                  {user.role === 'premium' && (
                                    <span className="px-2 py-0.5 text-xs bg-linear-to-r from-yellow-500 to-yellow-600 text-white rounded-full flex items-center">
                                      <Sparkle className="h-2.5 w-2.5 mr-1" />
                                      Premium
                                    </span>
                                  )}
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                  {user.email}
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Stats avec Card.Stats */}
                          <div className="px-6 py-4 border-t border-gray-100 dark:border-gray-800">
                            <div className="grid grid-cols-3 gap-4">
                              <Card.Stats
                                icon={<UserCheck className="h-4 w-4" />}
                                value={user.enrolled.toString()}
                                label="Inscrits"
                                color="orange"
                              />
                              <Card.Stats
                                icon={<Bookmark className="h-4 w-4" />}
                                value={user.favorites.toString()}
                                label="Favoris"
                                color="blue"
                              />
                              <Card.Stats
                                icon={<Bell className="h-4 w-4" />}
                                value={user.notifications.toString()}
                                label="Alertes"
                                color="green"
                              />
                            </div>
                          </div>

                          {/* Menu items */}
                          <div className="max-h-96 overflow-y-auto py-2">
                            {[
                              {
                                section: 'Compte',
                                items: [
                                  { label: 'Mon profil', icon: User, href: '/profil' },
                                  { label: 'Mes favoris', icon: Bookmark, href: '/favoris', badge: user.favorites },
                                  { label: 'Mes inscriptions', icon: UserCheck, href: '/inscriptions', badge: user.enrolled },
                                  { label: 'Dashboard', icon: BarChart3, href: '/dashboard', badge: 'New' },
                                ]
                              },
                              {
                                section: 'Paramètres',
                                items: [
                                  { label: 'Paramètres', icon: Settings, href: '/parametres' },
                                  { label: 'Sécurité', icon: Shield, href: '/securite' },
                                  { label: 'Documents', icon: FileText, href: '/documents' },
                                ]
                              },
                              {
                                section: 'Aide',
                                items: [
                                  { label: 'Centre d\'aide', icon: HelpCircle, href: '/aide' },
                                  { label: 'Contact', icon: Phone, href: '/contact' },
                                ]
                              }
                            ].map((section, index) => (
                              <div key={section.section} className={`${index > 0 ? 'border-t border-gray-100 dark:border-gray-800' : ''}`}>
                                <div className="px-4 py-2.5 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                  {section.section}
                                </div>
                                {section.items.map((item) => (
                                  <Button
                                    key={item.label}
                                    href={item.href}
                                    variant="ghost"
                                    className="w-full justify-start px-4 py-3 rounded-lg mx-2"
                                    onClick={() => {
                                      setIsUserMenuOpen(false);
                                      if (item.label === 'Dashboard') {
                                        setIsDashboardOpen(true);
                                      }
                                    }}
                                  >
                                    <div className="flex items-center justify-between w-full">
                                      <div className="flex items-center space-x-3">
                                        <div className="text-gray-400 dark:text-gray-500">
                                          <item.icon className="h-4 w-4" />
                                        </div>
                                        <span className="font-medium">{item.label}</span>
                                      </div>
                                      {item.badge && (
                                        <span className="px-2 py-0.5 text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full">
                                          {item.badge}
                                        </span>
                                      )}
                                      <ChevronRight className="h-4 w-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                  </Button>
                                ))}
                              </div>
                            ))}
                          </div>

                          {/* Logout Button */}
                          <div className="p-4 border-t border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50">
                            <Button
                              onClick={handleLogout}
                              variant="primary"
                              gradient
                              fullWidth
                              icon={LogOut}
                              className="bg-linear-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800"
                            >
                              Se déconnecter
                            </Button>
                          </div>
                        </>
                      ) : (
                        <>
                          {/* Guest info */}
                          <div className="p-6 bg-linear-to-br from-orange-50 via-red-50 to-pink-50 dark:from-gray-800 dark:via-gray-800 dark:to-gray-800">
                            <div className="flex items-center space-x-3">
                              <div className="w-12 h-12 rounded-xl bg-linear-to-r from-orange-500 to-red-600 flex items-center justify-center">
                                <User className="h-6 w-6 text-white" />
                              </div>
                              <div>
                                <h3 className="font-semibold text-gray-900 dark:text-white">Invité</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                  Connectez-vous pour profiter de toutes les fonctionnalités
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Auth Buttons */}
                          <div className="p-6 space-y-3">
                            <Button
                              onClick={() => handleLogin(true)}
                              variant="primary"
                              gradient
                              fullWidth
                              icon={Zap}
                              className="bg-linear-to-r from-blue-500 to-cyan-500"
                            >
                              Essayer la version démo
                            </Button>

                            <div className="flex items-center space-x-3">
                              <Button
                                onClick={() => handleLogin()}
                                variant="primary"
                                gradient
                                className="flex-1 bg-linear-to-r from-orange-500 to-red-600"
                              >
                                Se connecter
                              </Button>
                              <Button
                                onClick={handleSignup}
                                variant="outline"
                                className="flex-1"
                              >
                                S'inscrire
                              </Button>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </Card>
                )}
              </div>

              {/* Mobile menu button */}
              <Button
                className="lg:hidden"
                variant="ghost"
                icon={isMenuOpen ? X : Menu}
                iconOnly
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              />
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="lg:hidden fixed inset-0 top-0 z-40 bg-white dark:bg-gray-900 animate-slide-down overflow-y-auto">
            <div className="min-h-screen">
              {/* Mobile Header */}
              <Card
                variant="elevated"
                className="sticky top-0 border-b border-gray-200 dark:border-gray-800 rounded-none"
                padding="lg"
              >
                <div className="flex items-center justify-between">
                  <Button
                    href="/"
                    variant="ghost"
                    className="flex items-center space-x-3 p-0"
                    onClick={closeAllMenus}
                  >
                    <div className="relative">
                      <div className="absolute inset-0 bg-linear-to-r from-orange-500 to-red-600 rounded-xl blur opacity-70" />
                      <div className="relative bg-linear-to-r from-orange-500 to-red-600 p-2 rounded-xl shadow-md">
                        <GraduationCap className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <div>
                      <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                        Concours<span className="text-orange-600 dark:text-orange-400">.ci</span>
                      </h1>
                    </div>
                  </Button>
                  <Button
                    variant="ghost"
                    icon={X}
                    iconOnly
                    onClick={closeAllMenus}
                  />
                </div>
              </Card>

              {/* Search Bar Mobile */}
              <div className="p-4 border-b border-gray-200 dark:border-gray-800">
                <Button
                  onClick={() => {
                    closeAllMenus();
                    setSearchModalOpen(true);
                  }}
                  variant="ghost"
                  className="w-full justify-start h-auto py-4 bg-gray-50 dark:bg-gray-800"
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-linear-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                        <Search className="h-5 w-5 text-white" />
                      </div>
                      <div className="text-left">
                        <div className="font-medium text-gray-900 dark:text-white">Rechercher</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          Concours, quiz, actualités...
                        </div>
                      </div>
                    </div>
                    <kbd className="px-2 py-1 text-xs font-mono text-gray-500 bg-gray-100 dark:bg-gray-700 rounded border border-gray-300 dark:border-gray-600">
                      ⌘K
                    </kbd>
                  </div>
                </Button>
              </div>

              {/* Navigation Mobile */}
              <div className="p-4 space-y-2">
                {navLinks.map((link) => (
                  <MobileNavItem key={link.name} link={link} />
                ))}
              </div>

              {/* Quick Actions avec Card */}
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Actions rapides</h3>
                <div className="grid grid-cols-2 gap-3">
                  <Card
                    variant="elevated"
                    hover
                    clickable
                    onClick={() => {
                      closeAllMenus();
                      toggleDashboard();
                    }}
                    className="p-3"
                  >
                    <div className="flex items-center space-x-3">
                      <BarChart3 className="h-5 w-5 text-indigo-600" />
                      <div className="text-left">
                        <div className="font-medium text-gray-900 dark:text-white">Dashboard</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">
                          {user ? 'Voir vos stats' : 'Connectez-vous'}
                        </div>
                      </div>
                    </div>
                  </Card>

                  <Card
                    variant="elevated"
                    hover
                    clickable
                    onClick={() => {
                      closeAllMenus();
                      router.push('/notifications');
                    }}
                    className="p-3"
                  >
                    <div className="flex items-center space-x-3">
                      <Bell className="h-5 w-5 text-orange-600" />
                      <div className="text-left">
                        <div className="font-medium text-gray-900 dark:text-white">Notifications</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">{notifications} nouvelles</div>
                      </div>
                    </div>
                  </Card>


                </div>
              </div>

              {/* User Section Mobile */}
              <div className="p-4 border-t border-gray-200 dark:border-gray-800 mt-4">
                {user ? (
                  <>
                    <Card
                      variant="elevated"
                      className="mb-4"
                      padding="sm"
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white ${user.avatarColor}`}>
                          <span className="font-bold">
                            {user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                          </span>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white">{user.name}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{user.email}</p>
                        </div>
                      </div>
                    </Card>
                    <Button
                      onClick={handleLogout}
                      variant="primary"
                      gradient
                      fullWidth
                      className="bg-linear-to-r from-red-500 to-pink-600"
                    >
                      Se déconnecter
                    </Button>
                  </>
                ) : (
                  <>
                    <Card
                      variant="elevated"
                      className="mb-4 text-center"
                      padding="lg"
                    >
                      <div className="w-16 h-16 bg-linear-to-r from-orange-500 to-red-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                        <User className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">Connectez-vous</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        Pour sauvegarder vos préférences
                      </p>
                    </Card>
                    <div className="space-y-3">
                      <Button
                        onClick={() => handleLogin(true)}
                        variant="primary"
                        gradient
                        fullWidth
                        icon={Zap}
                        className="bg-linear-to-r from-blue-500 to-cyan-500"
                      >
                        Version démo
                      </Button>
                      <div className="grid grid-cols-2 gap-3">
                        <Button
                          onClick={() => handleLogin()}
                          variant="primary"
                          gradient
                          className="bg-linear-to-r from-orange-500 to-red-600"
                        >
                          Connexion
                        </Button>
                        <Button
                          onClick={handleSignup}
                          variant="outline"
                          className="border-gray-300 dark:border-gray-700"
                        >
                          Inscription
                        </Button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </header>


      {/* Bouton retour en haut */}
      {showScrollTop && ('')
        
      }

      {/* Search Modal */}
      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        onSearch={handleSearch}
      />

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        mode={authMode}
        onSwitchMode={(mode: 'login' | 'signup') => setAuthMode(mode)}
      />

      {/* Espace pour le header fixe */}
      <div className="h-16 lg:h-20" />
    </>
  );
}