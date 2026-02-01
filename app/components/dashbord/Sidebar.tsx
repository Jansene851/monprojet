'use client';

import {
  BarChart3,
  Award,
  Target,
  BookOpen,
  Calendar,
  TrendingUp,
  Users,
  Settings,
  HelpCircle,
  LogOut,
  ChevronDown,
  Trophy,
  ChevronLeft,
  ChevronRight,
  Zap,
  Crown
} from 'lucide-react';
import { Button } from '@/app/components/ui/Button';
import { cn } from '@/lib/types';

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

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  collapsed?: boolean;
  onToggle?: () => void;
  user?: User | null;
}

export default function Sidebar({
  activeTab,
  onTabChange,
  collapsed = false,
  onToggle,
  user
}: SidebarProps) {
  const menuItems = [
    { id: 'overview', label: 'Vue d\'ensemble', icon: BarChart3 },
    { id: 'concours', label: 'Mes concours', icon: Award, badge: 12 },
    { id: 'quiz', label: 'Mes quiz', icon: Target, badge: 24 },
    { id: 'resources', label: 'Ressources', icon: BookOpen },
    { id: 'calendar', label: 'Calendrier', icon: Calendar },
    { id: 'stats', label: 'Statistiques', icon: TrendingUp },
    { id: 'community', label: 'Communauté', icon: Users },
    { id: 'settings', label: 'Paramètres', icon: Settings }
  ];

  const userProgress = user ? (user.points / user.nextLevelPoints) * 100 : 75;
  const userInitials = user?.name ? user.name.split(' ').map(n => n[0]).join('') : 'KT';

  return (
    <aside className={cn(
      "fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] transition-all duration-300",
      "bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800",
      collapsed ? "w-20" : "w-64"
    )}>
      <div className="h-full px-4 py-6 overflow-y-auto overflow-x-hidden">
        {/* Navigation */}
        <nav className="space-y-1 mb-8">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group",
                "hover:bg-gray-100 dark:hover:bg-gray-800",
                activeTab === item.id
                  ? "bg-linear-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 text-orange-600 dark:text-orange-400 border border-orange-200 dark:border-orange-800"
                  : "text-gray-700 dark:text-gray-300"
              )}
              title={collapsed ? item.label : undefined}
            >
              <item.icon className="h-5 w-5 shrink-0" />

              {!collapsed && (
                <div className="flex-1 flex items-center justify-between">
                  <span className="font-medium truncate">{item.label}</span>
                  {item.badge && (
                    <span className="px-2 py-0.5 text-xs bg-orange-500 text-white rounded-full min-w-6 flex justify-center">
                      {item.badge}
                    </span>
                  )}
                </div>
              )}
            </button>
          ))}
        </nav>

        {/* Progression */}
        {!collapsed && (
          <div className="mb-8 p-3 bg-linear-to-br from-orange-50 to-red-50 dark:from-gray-800 dark:to-gray-800 rounded-xl border border-orange-200 dark:border-orange-800">
            <div className="flex items-center gap-2 mb-3">
              <Trophy className="h-5 w-5 text-orange-600 dark:text-orange-400" />
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-900 dark:text-white">Niveau {user?.level || 3}</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  {user?.points || 450}/{user?.nextLevelPoints || 600} points
                </div>
              </div>
              {user?.role === 'premium' && (
                <Crown className="h-5 w-5 text-yellow-500" />
              )}
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Progression</span>
                <span className="font-medium text-gray-900 dark:text-white">{Math.round(userProgress)}%</span>
              </div>
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-linear-to-r from-orange-500 to-red-500 rounded-full transition-all duration-500"
                  style={{ width: `${userProgress}%` }}
                />
              </div>
            </div>

            <Button
              variant="primary"
              gradient
              fullWidth
              size="sm"
              className="mt-3"
            >
              Voir les récompenses
            </Button>
          </div>
        )}

        {/* Menu utilisateur */}
        <div className="border-t border-gray-200 dark:border-gray-800 pt-6">
          <div className={cn("px-2", collapsed && "flex justify-center")}>
            <button className={cn(
              "flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 w-full",
              collapsed && "justify-center"
            )}>
              <div className="relative">
                <div className={cn(
                  "bg-linear-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center text-white text-sm font-semibold",
                  collapsed ? "w-8 h-8" : "w-10 h-10"
                )}>
                  {userInitials}
                </div>
                {user?.role === 'premium' && (
                  <div className="absolute -bottom-1 -right-1 h-5 w-5 bg-linear-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
                    <Crown className="h-3 w-3 text-white" />
                  </div>
                )}
              </div>

              {!collapsed && (
                <div className="flex-1 text-left overflow-hidden">
                  <div className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {user?.name || 'Koffi Traoré'}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    {user?.role === 'premium' ? 'Premium' : 'Étudiant'}
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    <Zap className="h-3 w-3 text-orange-500" />
                    <span className="text-xs text-gray-600 dark:text-gray-400">
                      {user?.points || 450} points
                    </span>
                  </div>
                </div>
              )}

              {!collapsed && <ChevronDown className="h-4 w-4 text-gray-400 shrink-0" />}
            </button>
          </div>

          {!collapsed && (
            <div className="mt-3 space-y-1 px-2">
              <button className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 w-full">
                <HelpCircle className="h-4 w-4" />
                <span className="text-sm">Aide & Support</span>
              </button>

              <button className="flex items-center gap-3 px-3 py-2 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 w-full">
                <LogOut className="h-4 w-4" />
                <span className="text-sm">Déconnexion</span>
              </button>
            </div>
          )}
        </div>

        {/* Bouton de réduction */}
        <button
          onClick={onToggle}
          className="absolute -right-3 top-1/2 w-6 h-6 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-shadow"
        >
          <ChevronDown className={cn(
            "h-4 w-4 text-gray-600 dark:text-gray-400 transition-transform",
            collapsed ? "rotate-90" : "-rotate-90"
          )} />
        </button>
      </div>
    </aside>
  );
}