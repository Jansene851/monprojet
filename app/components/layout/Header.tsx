"use client";

import { Award, BookOpen, Calendar, Home, MessageSquare, Menu as MenuIcon, Sparkles, ChevronRight, GraduationCap } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useRef, useState, useEffect, useCallback } from "react";

interface Utilisateur {
    id: string; // Identifiant de l'utilisateur
    nom: string; // Nom de l'utilisateur
    email: string; // Adresse e-mail de l'utilisateur
    role: 'étudiant' | 'premium' | 'admin'; // Rôle de l'utilisateur
    couleurAvatar: string; // Couleur de l'avatar de l'utilisateur
    membreDepuis: string; // Date à laquelle l'utilisateur est devenu membre
    notifications: number; // Nombre de notifications de l'utilisateur
    favoris: number; // Nombre de favoris de l'utilisateur
    inscrit: number; // Nombre de cours auxquels l'utilisateur est inscrit
}
interface Navigation {
    nom: string; // Nom de la navigation
    url: string; // URL de la navigation
    icon: React.ReactNode; // Icône de la navigation
    description: string; // Description de la navigation
    couleur: string; // Couleur de la navigation
    badge: string | null; // Nombre de notifications de la navigation
}

const navigation: Navigation[] = [
    {
        nom: 'Accueil',
        url: '/',
        icon: <Home className="w-4 h-4" />,
        description: 'Accueil',
        couleur: 'text-blue-500',
        badge: null,
    },
    {
        nom: 'Concours',
        url: '/concours',
        icon: <Award className="w-4 h-4" />,
        description: 'Concours',
        couleur: 'from-blue-500 to-cyan-500',
        badge: null,
    },
    {
        nom: 'Quiz',
        url: '/quiz',
        icon: <BookOpen className="w-4 h-4" />,
        description: 'Quiz',
        couleur: 'from-purple-500 to-pink-500',
        badge: "50+",
    },
    {
        nom: 'Actualités',
        url: '/actualites',
        icon: <MessageSquare className="w-4 h-4" />,
        description: 'Actualités',
        couleur: 'from-green-500 to-emerald-500',
        badge: "12",
    },
    {
        nom: 'Calendrier',
        url: '/calendrier',
        icon: <Calendar className="w-4 h-4" />,
        description: 'Calendrier',
        couleur: 'from-yellow-500 to-amber-500',
        badge: null,
    },
];

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isTop, setIsTop] = useState(true);
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [user, setUser] = useState<Utilisateur | null>(null);
    const [isHelpOpen, setIsHelpOpen] = useState(false);
    const [isLogoutOpen, setIsLogoutOpen] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);


    const pathname = usePathname();
    const router = useRouter();
    const userMenuRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const lastScrollY = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            setIsScrolled(currentScrollY > 0);
            setIsTop(currentScrollY === 0);
            lastScrollY.current = currentScrollY;
            const scrollProgress = (currentScrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
            setScrollProgress(scrollProgress);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);


    const closeAllMenus = useCallback(() => {
        setIsMenuOpen(false);
        setIsUserMenuOpen(false);
    }, []);

    return (
        <>
            <header ref={headerRef}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out 
                    ${isScrolled ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl shadow-lg shadow-gray-200/50 dark:shadow-gray-900/50 py-2' : 'bg-white dark:bg-gray-900 py-3'} 
                    ${isTop ? 'border-b border-gray-200 dark:border-gray-800' : ''}

            `}
            >
                <div className="absolute bottom-0 left-0 h-0.5 w-full bg-linear-to-r from-orange-500 via-red-500 to-pink-500 transition-all duration-300"
                    style={{
                        width: `${scrollProgress}%`
                    }}
                />
                {
                    isTop && (
                        <div className="animate-slide-down items-center">
                            <div className="bg-linear-to-r from-orange-500 via-red-500 to-pink-500 text-white">
                                <div className="container mx-auto px-4 py-2">
                                    <div className="flex items-center justify-between text-sm">
                                        <div className="flex items-center">
                                            <Sparkles className="w-4 h-4 mr-2 animate-pulse" />
                                            <span className="font-bold truncate">🎉 Nouveau : 15 concours ouverts cette semaine !</span>

                                        </div>
                                        <Link href="/concours" className="flex items-center font-medium hover:underline hover:underline-offset-2 transition-all whitespace-nowrap"
                                            prefetch>
                                            Voir maintenant

                                            <ChevronRight className="w-3 h-3 ml-1" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>


                    )
                }
                <div className="container mx-auto px-4 py-2 items-center justify-between">
                    <div className="flex items-center justify-between">
                        <Link href="/" className="flex items-center space-x-3 group"
                            aria-label="Accueil"
                            onClick={closeAllMenus}>
                            <div className=" relative">
                                <div className={`absolute inset-0 bg-linear-to-r from-orange-500 to-red-600 rounded-xl blur transition-all duration-300 ${isScrolled ? 'opacity-50 ' : 'opacity-70'}`}
                                />
                                <div className={`relative bg-linear-to-r from-orange-500 to-red-600 rounded-xl shadow-md transition-all duration-300 ${isScrolled ? 'p-2' : 'p-2.5'} `}>
                                    <GraduationCap className={`text-white transition-all duration-300 ${isScrolled ? 'w-6 h-6' : 'w-7 h-7'}`} />
                                </div>
                            </div>
                            <div className={` ${isScrolled ? 'hidden md:block' : 'hidden sm:block'} `}>
                                <h1 className={`text-gray-600  dark:text-gray-300 font-medium `}>Concours</h1>
                                {isScrolled && (
                                    <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">Votre succès commence ici</p>

                                )}
                            </div>
                        </Link>

                        <nav className="hidden lg:flex items-center space-x-1"
                        aria-label="Navigation principale">
                            {navigation.map((link) => (
                                <Link
                                    key={link.nom}
                                    href={link.url}
                                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${pathname === link.url
                                            ? 'bg-linear-to-r from-orange-500 to-red-600 text-white shadow-md'
                                            : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                                        }`}
                                    aria-current={pathname === link.url ? 'page' : undefined}
                                    prefetch
                                >
                                    {link.icon}
                                    <span className="font-medium">{link.nom}</span>
                                </Link>
                            ))}
                        </nav>


                    </div>
                </div>
            </header>
        </>
    );
}