'use client';

import { useState, useEffect, useCallback } from 'react';
import {
    TrendingUp,
    Target,
    Award,
    BookOpen,
    Calendar,
    Clock,
    Users,
    Star,
    Trophy,
    BarChart3,
    PieChart,
    FileText,
    CheckCircle,
    AlertCircle,
    ChevronRight,
    Download,
    Filter,
    MoreVertical,
    Plus,
    Eye,
    Bookmark,
    Share2,
    Zap,
    Bell,
    TrendingDown,
    CalendarDays,
    GraduationCap,
    Shield,
    Medal,
    Crown,
    Sparkles
} from 'lucide-react';
import { Card } from '@/app/components/ui/Card';
import { Button } from '@/app/components/ui/Button';
import DashboardSidebar from '@/app/components/dashbord/Sidebar';

// Types
interface User {
    id: string;
    name: string;
    email: string;
    role: 'student' | 'premium' | 'admin';
    avatarColor: string;
    level: number;
    points: number;
    nextLevelPoints: number;
    memberSince: string;
}

interface DashboardStats {
    concours: number;
    quiz: number;
    progress: number;
    resources: number;
    streak: number;
    studyHours: number;
    user: User | null;
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

export default function DashboardPage() {
    const [activeTab, setActiveTab] = useState('overview');
    const [searchQuery, setSearchQuery] = useState('');
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    // Mock data
    const userData: User = {
        id: '1',
        name: 'Koffi Traoré',
        email: 'koffi.traore@example.com',
        role: 'premium',
        avatarColor: 'from-blue-500 to-cyan-500',
        level: 3,
        points: 450,
        nextLevelPoints: 600,
        memberSince: '2024-01-15'
    };

    const stats: DashboardStats = {
        concours: 12,
        quiz: 24,
        progress: 68,
        resources: 18,
        streak: 7,
        studyHours: 45,
        user: null
    };

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
        },
        {
            id: 3,
            title: 'INFAS',
            institution: 'Institut National de Formation Sanitaire',
            deadline: '20 Juillet 2024',
            status: 'upcoming',
            progress: 0,
            daysLeft: 120,
            category: 'Santé',
            priority: 'low'
        },
        {
            id: 4,
            title: 'Douanes 2024',
            institution: 'Direction Générale des Douanes',
            deadline: '10 Août 2024',
            status: 'completed',
            progress: 100,
            daysLeft: -15,
            category: 'Finances',
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
        },
        {
            id: 3,
            title: 'Français - Grammaire Avancée',
            category: 'Français',
            score: 0,
            totalQuestions: 25,
            status: 'not-started',
            timeSpent: 0,
            lastAttempt: 'Jamais',
            improvement: 0
        },
        {
            id: 4,
            title: 'Droit Administratif',
            category: 'Droit',
            score: 45,
            totalQuestions: 30,
            status: 'in-progress',
            timeSpent: 60,
            lastAttempt: 'En cours',
            improvement: -8
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
            icon: <AlertCircle className="h-4 w-4" />,
            color: 'bg-orange-100 text-orange-600'
        },
        {
            id: 3,
            type: 'achievement',
            title: 'Nouveau badge débloqué',
            description: 'Vous avez obtenu le badge "Quiz Master"',
            time: 'Il y a 3 jours',
            read: true,
            icon: <Medal className="h-4 w-4" />,
            color: 'bg-yellow-100 text-yellow-600'
        },
        {
            id: 4,
            type: 'resource',
            title: 'Nouvelle ressource disponible',
            description: 'Fiches de révision "Droit Constitutionnel"',
            time: 'Il y a 1 semaine',
            read: true,
            icon: <FileText className="h-4 w-4" />,
            color: 'bg-green-100 text-green-600'
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

    const categoryDistribution = [
        { name: 'Administration', value: 35, color: 'bg-orange-500', count: 4 },
        { name: 'Sécurité', value: 25, color: 'bg-blue-500', count: 3 },
        { name: 'Santé', value: 20, color: 'bg-green-500', count: 2 },
        { name: 'Finances', value: 15, color: 'bg-purple-500', count: 2 },
        { name: 'Autres', value: 5, color: 'bg-gray-500', count: 1 }
    ];

    // Initialize user
    useEffect(() => {
        const timer = setTimeout(() => {
            setUser(userData);
            setLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    const statCards = [
        {
            title: 'Concours suivis',
            value: stats.concours.toString(),
            change: +2,
            icon: <Award className="h-5 w-5" />,
            color: 'orange' as const,
            description: `${upcomingConcours.filter(c => c.status === 'registered').length} inscriptions actives`
        },
        {
            title: 'Quiz complétés',
            value: stats.quiz.toString(),
            change: +8,
            icon: <Target className="h-5 w-5" />,
            color: 'blue' as const,
            description: `${recentQuizzes.filter(q => q.status === 'completed').length} avec score > 70%`
        },
        {
            title: 'Progression',
            value: `${stats.progress}%`,
            change: +12,
            icon: <TrendingUp className="h-5 w-5" />,
            color: 'green' as const,
            description: `Objectif mensuel: 80%`
        },
        {
            title: 'Série active',
            value: `${stats.streak} jours`,
            change: +3,
            icon: <Zap className="h-5 w-5" />,
            color: 'purple' as const,
            description: 'Continuez pour débloquer des récompenses'
        }
    ];

    const handleSearch = useCallback((query: string) => {
        setSearchQuery(query);
        // Ici vous pourriez filtrer les données ou faire un appel API
    }, []);

    const handleNotificationClick = useCallback(() => {
        // Marquer toutes les notifications comme lues
        console.log('Notifications cliquées');
    }, []);

    const toggleSidebar = useCallback(() => {
        setSidebarCollapsed(!sidebarCollapsed);
    }, [sidebarCollapsed]);

    if (loading) {
        return (
            <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
                <div className="flex items-center justify-center min-h-screen">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
                </div>
            </div>
        );
    }

    return (
<div className="min-h-screen pt-16 bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
            <DashboardSidebar 
                activeTab={activeTab}
                onTabChange={setActiveTab}
                collapsed={sidebarCollapsed}
                onToggle={toggleSidebar}
                user={user}
            />

            <div className={`transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64'}`}>
                

                <main className="p-4 md:p-6">
                     {/* Progress bar */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm">
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-3">
                                    <div className="relative">
                                        <div className="w-12 h-12 bg-linear-to-r from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
                                            <Trophy className="h-6 w-6 text-white" />
                                        </div>
                                        <div className="absolute -top-1 -right-1 bg-linear-to-r from-blue-500 to-cyan-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                                            {user?.level}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-sm font-medium text-gray-600 dark:text-gray-400">Niveau {user?.level}</div>
                                        <div className="text-lg font-bold text-gray-900 dark:text-white">
                                            {user?.points} / {user?.nextLevelPoints} points
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-sm font-medium text-gray-600 dark:text-gray-400">Prochaine récompense</div>
                                    <div className="text-lg font-bold text-gray-900 dark:text-white">
                                        {user && user.nextLevelPoints - user.points} points
                                    </div>
                                </div>
                            </div>

                            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-linear-to-r from-orange-500 to-red-500 rounded-full transition-all duration-1000"
                                    style={{
                                        width: user ? `${(user.points / user.nextLevelPoints) * 100}%` : '0%'
                                    }}
                                />
                            </div>

                            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2">
                                <span>Niveau {user?.level}</span>
                                <span>Niveau {user ? user.level + 1 : 1}</span>
                            </div>
                        </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                        {statCards.map((stat, index) => (
                            <Card
                                key={index}
                                variant="elevated"
                                hover
                                className="relative overflow-hidden"
                            >
                                <div className="flex items-start justify-between">
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{stat.title}</p>
                                        <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{stat.value}</p>
                                        <div className="flex items-center gap-1">
                                            {stat.change >= 0 ? (
                                                <TrendingUp className="h-4 w-4 text-green-500" />
                                            ) : (
                                                <TrendingDown className="h-4 w-4 text-red-500" />
                                            )}
                                            <span className={`text-sm font-medium ${stat.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                                {stat.change >= 0 ? '+' : ''}{stat.change}%
                                            </span>
                                        </div>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">{stat.description}</p>
                                    </div>

                                    <div className={`p-3 rounded-xl ${stat.color === 'orange' ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-600' :
                                            stat.color === 'blue' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600' :
                                                stat.color === 'green' ? 'bg-green-100 dark:bg-green-900/30 text-green-600' :
                                                    'bg-purple-100 dark:bg-purple-900/30 text-purple-600'
                                        }`}>
                                        {stat.icon}
                                    </div>
                                </div>

                                {/* Mini graph */}
                                <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                                    <div className="flex items-end h-8 gap-1">
                                        {[40, 65, 80, 75, 90, stat.change + 80].map((height, i) => (
                                            <div
                                                key={i}
                                                className={`flex-1 rounded-t ${stat.color === 'orange' ? 'bg-orange-500' :
                                                        stat.color === 'blue' ? 'bg-blue-500' :
                                                            stat.color === 'green' ? 'bg-green-500' :
                                                                'bg-purple-500'
                                                    } ${i === 5 ? 'opacity-100' : 'opacity-40'}`}
                                                style={{ height: `${height}%` }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>

                    {/* Main Content Grid */}
                    <div className="grid lg:grid-cols-3 gap-6 mb-8">
                        {/* Progress Chart */}
                        <Card variant="elevated" className="lg:col-span-2">
                            <Card.Header
                                title="Progression hebdomadaire"
                                subtitle="Votre évolution cette semaine"
                                action={
                                    <div className="flex items-center gap-2">
                                        <Button variant="ghost" size="sm" icon={Download} iconOnly />
                                        <Button variant="ghost" size="sm" icon={MoreVertical} iconOnly />
                                    </div>
                                }
                            />

                            <div className="space-y-6">
                                {/* Graph */}
                                <div className="h-64">
                                    <div className="flex items-end h-48 gap-2">
                                        {weeklyProgress.map((item, index) => (
                                            <div key={index} className="flex-1 flex flex-col items-center">
                                                <div
                                                    className="w-full bg-linear-to-t from-orange-500 to-red-500 rounded-t-lg transition-all hover:opacity-80 cursor-pointer group relative"
                                                    style={{ height: `${item.value}%` }}
                                                >
                                                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                                        {item.value}% le {item.day}
                                                    </div>
                                                </div>
                                                <span className="text-xs text-gray-500 dark:text-gray-400 mt-2">{item.day}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="flex justify-between mt-4 text-sm">
                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center gap-2">
                                                <div className="w-3 h-3 bg-linear-to-r from-orange-500 to-red-500 rounded"></div>
                                                <span className="text-gray-600 dark:text-gray-400">Progression</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="w-3 h-3 bg-linear-to-r from-blue-500 to-cyan-500 rounded"></div>
                                                <span className="text-gray-600 dark:text-gray-400">Objectif</span>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-gray-600 dark:text-gray-400">Moyenne: </span>
                                            <span className="font-semibold text-gray-900 dark:text-white">75%</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Goals */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 bg-linear-to-br from-orange-50 to-red-50 dark:from-gray-800 dark:to-gray-800 rounded-xl">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Objectif mensuel</span>
                                            <span className="text-sm font-bold text-orange-600">80%</span>
                                        </div>
                                        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-linear-to-r from-orange-500 to-red-500 rounded-full transition-all duration-500"
                                                style={{ width: '80%' }}
                                            />
                                        </div>
                                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                                            {stats.studyHours}h d'étude ce mois
                                        </div>
                                    </div>

                                    <div className="p-4 bg-linear-to-br from-blue-50 to-cyan-50 dark:from-gray-800 dark:to-gray-800 rounded-xl">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Quiz complétés</span>
                                            <span className="text-sm font-bold text-blue-600">{recentQuizzes.filter(q => q.status === 'completed').length}</span>
                                        </div>
                                        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-linear-to-r from-blue-500 to-cyan-500 rounded-full transition-all duration-500"
                                                style={{ width: '75%' }}
                                            />
                                        </div>
                                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                                            Moyenne: {Math.round(recentQuizzes.filter(q => q.status === 'completed').reduce((acc, q) => acc + q.score, 0) / recentQuizzes.filter(q => q.status === 'completed').length)}%
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>

                        {/* Recent Activities */}
                        <Card variant="elevated">
                            <Card.Header
                                title="Activités récentes"
                                subtitle="Vos dernières actions"
                                action={
                                    <Button variant="ghost" size="sm" href="/activities">
                                        Tout voir
                                    </Button>
                                }
                            />

                            <div className="space-y-4 max-h-[500px] overflow-y-auto">
                                {activities.map((activity) => (
                                    <div
                                        key={activity.id}
                                        className={`p-3 rounded-lg border transition-all hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer group ${activity.read
                                                ? 'border-gray-200 dark:border-gray-800'
                                                : 'border-orange-200 dark:border-orange-800 bg-orange-50/50 dark:bg-orange-900/20'
                                            }`}
                                    >
                                        <div className="flex items-start gap-3">
                                            <div className={`p-2 rounded-lg ${activity.color} ${!activity.read ? 'animate-pulse' : ''}`}>
                                                {activity.icon}
                                            </div>

                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center justify-between mb-1">
                                                    <h4 className="font-medium text-gray-900 dark:text-white truncate">{activity.title}</h4>
                                                    {!activity.read && (
                                                        <div className="w-2 h-2 bg-orange-500 rounded-full shrink-0 ml-2" />
                                                    )}
                                                </div>
                                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1 line-clamp-2">{activity.description}</p>
                                                <div className="flex items-center justify-between">
                                                    <span className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</span>
                                                    <ChevronRight className="h-4 w-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-800">
                                <Button
                                    variant="ghost"
                                    fullWidth
                                    className="text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300"
                                    onClick={() => {
                                        // Marquer toutes les activités comme lues
                                        console.log('Mark all as read');
                                    }}
                                >
                                    Tout marquer comme lu
                                </Button>
                            </div>
                        </Card>
                    </div>

                    {/* Bottom Grid */}
                    <div className="grid lg:grid-cols-2 gap-6">
                        {/* My Concours */}
                        <Card variant="elevated">
                            <Card.Header
                                title="Mes concours"
                                subtitle="Suivi de vos concours"
                                action={
                                    <div className="flex items-center gap-2">
                                        <Button variant="ghost" size="sm" icon={Filter} iconOnly />
                                        <Button variant="ghost" size="sm" href="/concours">
                                            Voir tout
                                        </Button>
                                    </div>
                                }
                            />

                            <div className="space-y-4">
                                {upcomingConcours.map((concours) => (
                                    <div
                                        key={concours.id}
                                        className="p-4 border border-gray-200 dark:border-gray-800 rounded-xl hover:border-orange-300 dark:hover:border-orange-700 transition-all group"
                                    >
                                        <div className="flex items-start justify-between mb-3">
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <h4 className="font-semibold text-gray-900 dark:text-white truncate">{concours.title}</h4>
                                                    <span className={`px-2 py-0.5 text-xs rounded-full shrink-0 ${concours.status === 'registered' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400' :
                                                            concours.status === 'pending' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400' :
                                                                concours.status === 'completed' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400' :
                                                                    'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-400'
                                                        }`}>
                                                        {concours.status === 'registered' ? 'Inscrit' :
                                                            concours.status === 'pending' ? 'En préparation' :
                                                                concours.status === 'completed' ? 'Terminé' : 'À venir'}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-gray-600 dark:text-gray-400 truncate">{concours.institution}</p>
                                            </div>

                                            <div className="flex items-center gap-1 ml-2">
                                                <Button variant="ghost" size="sm" icon={Eye} iconOnly />
                                                <Button variant="ghost" size="sm" icon={MoreVertical} iconOnly />
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <div>
                                                <div className="flex justify-between text-sm mb-1">
                                                    <span className="text-gray-600 dark:text-gray-400">Progression</span>
                                                    <span className="font-medium text-gray-900 dark:text-white">{concours.progress}%</span>
                                                </div>
                                                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                                    <div
                                                        className={`h-full rounded-full transition-all duration-500 ${concours.status === 'completed' ? 'bg-linear-to-r from-blue-500 to-cyan-500' :
                                                                'bg-linear-to-r from-orange-500 to-red-500'
                                                            }`}
                                                        style={{ width: `${concours.progress}%` }}
                                                    />
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between text-sm">
                                                <div className="flex items-center gap-4">
                                                    <div className="flex items-center gap-1">
                                                        <Calendar className="h-4 w-4 text-gray-400" />
                                                        <span className="text-gray-600 dark:text-gray-400">{concours.deadline}</span>
                                                    </div>
                                                    <div className={`px-2 py-1 rounded text-xs font-medium ${concours.daysLeft > 30 ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400' :
                                                            concours.daysLeft > 0 ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400' :
                                                                'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-400'
                                                        }`}>
                                                        {concours.daysLeft > 0 ? `${concours.daysLeft} jours` : 'Terminé'}
                                                    </div>
                                                </div>

                                                <Button
                                                    href={`/concours/${concours.id}`}
                                                    variant="outline"
                                                    size="sm"
                                                    icon={ChevronRight}
                                                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                                                >
                                                    Détails
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-800">
                                <Button
                                    href="/concours/add"
                                    variant="outline"
                                    fullWidth
                                    icon={Plus}
                                    className="text-orange-600 dark:text-orange-400 border-orange-300 dark:border-orange-700 hover:bg-orange-50 dark:hover:bg-orange-900/20"
                                >
                                    Ajouter un concours à suivre
                                </Button>
                            </div>
                        </Card>

                        {/* My Quizzes */}
                        <Card variant="elevated">
                            <Card.Header
                                title="Mes quiz récents"
                                subtitle="Performance et progression"
                                action={
                                    <Button variant="ghost" size="sm" href="/quiz">
                                        Voir tout
                                    </Button>
                                }
                            />

                            <div className="space-y-4">
                                {recentQuizzes.map((quiz) => (
                                    <div
                                        key={quiz.id}
                                        className="p-4 border border-gray-200 dark:border-gray-800 rounded-xl hover:border-blue-300 dark:hover:border-blue-700 transition-all group"
                                    >
                                        <div className="flex items-start justify-between mb-3">
                                            <div className="flex-1 min-w-0">
                                                <h4 className="font-semibold text-gray-900 dark:text-white mb-1 truncate">{quiz.title}</h4>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-sm text-gray-600 dark:text-gray-400">{quiz.category}</span>
                                                    <span className={`px-2 py-0.5 text-xs rounded-full shrink-0 ${quiz.status === 'completed' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400' :
                                                            quiz.status === 'in-progress' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400' :
                                                                'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-400'
                                                        }`}>
                                                        {quiz.status === 'completed' ? 'Terminé' :
                                                            quiz.status === 'in-progress' ? 'En cours' : 'Non commencé'}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="text-right ml-2">
                                                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                                                    {quiz.score}%
                                                </div>
                                                <div className="text-xs text-gray-500 dark:text-gray-400">
                                                    {quiz.totalQuestions} questions
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            {/* Score bar */}
                                            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full rounded-full transition-all duration-500 ${quiz.score >= 80 ? 'bg-linear-to-r from-green-500 to-emerald-500' :
                                                            quiz.score >= 60 ? 'bg-linear-to-r from-blue-500 to-cyan-500' :
                                                                'bg-linear-to-r from-orange-500 to-red-500'
                                                        }`}
                                                    style={{ width: `${quiz.score}%` }}
                                                />
                                            </div>

                                            <div className="flex items-center justify-between text-sm">
                                                <div className="flex items-center gap-4">
                                                    <div className="flex items-center gap-1">
                                                        <Clock className="h-4 w-4 text-gray-400" />
                                                        <span className="text-gray-600 dark:text-gray-400">{quiz.timeSpent} min</span>
                                                    </div>
                                                    <div className="text-gray-500 dark:text-gray-400 text-xs">
                                                        {quiz.lastAttempt}
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-2">
                                                    {quiz.improvement !== 0 && (
                                                        <span className={`text-xs ${quiz.improvement > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                                            {quiz.improvement > 0 ? '+' : ''}{quiz.improvement}%
                                                        </span>
                                                    )}
                                                    <Button
                                                        href={`/quiz/${quiz.id}`}
                                                        variant={quiz.status === 'completed' ? 'outline' : 'primary'}
                                                        size="sm"
                                                        className={`${quiz.status === 'completed' ? '' :
                                                                'bg-linear-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600'
                                                            }`}
                                                    >
                                                        {quiz.status === 'completed' ? 'Revoir' :
                                                            quiz.status === 'in-progress' ? 'Continuer' : 'Commencer'}
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-800">
                                <div className="grid grid-cols-2 gap-3">
                                    <Button
                                        href="/quiz/recommended"
                                        variant="outline"
                                        className="border-blue-300 dark:border-blue-700 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                                    >
                                        Quiz recommandés
                                    </Button>
                                    <Button
                                        href="/quiz/start"
                                        variant="primary"
                                        gradient
                                        icon={Target}
                                    >
                                        Nouveau quiz
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Category Distribution & Quick Actions */}
                    <div className="grid lg:grid-cols-3 gap-6 mt-6">
                        {/* Category Distribution */}
                        <Card variant="elevated" className="lg:col-span-2">
                            <Card.Header
                                title="Distribution par catégorie"
                                subtitle="Répartition de vos concours suivis"
                                action={
                                    <Button variant="ghost" size="sm" icon={BarChart3} iconOnly />
                                }
                            />

                            <div className="grid md:grid-cols-2 gap-8">
                                {/* Chart */}
                                <div className="relative h-64 flex items-center justify-center">
                                    <div className="relative w-48 h-48">
                                        {categoryDistribution.map((cat, index, array) => {
                                            const total = array.reduce((sum, item) => sum + item.value, 0);
                                            const percentage = (cat.value / total) * 360;
                                            const startAngle = array.slice(0, index).reduce((sum, item) => sum + (item.value / total) * 360, 0);

                                            return (
                                                <div
                                                    key={cat.name}
                                                    className="absolute inset-0"
                                                    style={{
                                                        clipPath: `polygon(50% 50%, 
                              ${50 + 50 * Math.cos((startAngle - 90) * Math.PI / 180)}% 
                              ${50 + 50 * Math.sin((startAngle - 90) * Math.PI / 180)}%, 
                              ${50 + 50 * Math.cos((startAngle + percentage - 90) * Math.PI / 180)}% 
                              ${50 + 50 * Math.sin((startAngle + percentage - 90) * Math.PI / 180)}%)`
                                                    }}
                                                >
                                                    <div className={`w-full h-full ${cat.color} opacity-90`} />
                                                </div>
                                            );
                                        })}

                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="text-center">
                                                <div className="text-3xl font-bold text-gray-900 dark:text-white">100%</div>
                                                <div className="text-sm text-gray-600 dark:text-gray-400">Total</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Legend */}
                                <div className="space-y-4">
                                    {categoryDistribution.map((cat) => (
                                        <div key={cat.name} className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-4 h-4 ${cat.color} rounded-full`} />
                                                <div>
                                                    <div className="font-medium text-gray-900 dark:text-white">{cat.name}</div>
                                                    <div className="text-sm text-gray-600 dark:text-gray-400">{cat.value}% • {cat.count} concours</div>
                                                </div>
                                            </div>

                                            <ChevronRight className="h-4 w-4 text-gray-400" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Card>

                        {/* Quick Actions */}
                        <Card variant="elevated">
                            <Card.Header
                                title="Actions rapides"
                                subtitle="Accès direct aux outils"
                            />

                            <div className="space-y-3">
                                <Button
                                    href="/calendrier"
                                    variant="outline"
                                    className="w-full justify-start"
                                    icon={Calendar}
                                >
                                    Voir le calendrier
                                </Button>

                                <Button
                                    href="/ressources"
                                    variant="outline"
                                    className="w-full justify-start"
                                    icon={FileText}
                                >
                                    Ressources
                                </Button>

                                <Button
                                    href="/statistiques"
                                    variant="outline"
                                    className="w-full justify-start"
                                    icon={BarChart3}
                                >
                                    Statistiques détaillées
                                </Button>

                                <Button
                                    href="/progression"
                                    variant="primary"
                                    gradient
                                    className="w-full justify-start"
                                    icon={TrendingUp}
                                >
                                    Progression complète
                                </Button>

                                <Button
                                    href="/communaute"
                                    variant="outline"
                                    className="w-full justify-start"
                                    icon={Users}
                                >
                                    Communauté
                                </Button>
                            </div>

                            {/* Daily Tip */}
                            <div className="mt-6 p-4 bg-linear-to-r from-orange-50 to-red-50 dark:from-gray-800 dark:to-gray-800 rounded-xl">
                                <div className="flex items-center gap-3">
                                    <Sparkles className="h-6 w-6 text-orange-500" />
                                    <div>
                                        <h4 className="font-semibold text-gray-900 dark:text-white">Conseil du jour</h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                            Concentrez-vous sur 1-2 concours à la fois pour maximiser vos chances
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                </main>
            </div>
        </div>
    );
}