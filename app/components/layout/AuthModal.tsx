'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import {
    X,
    Mail,
    Lock,
    Eye,
    EyeOff,
    Check,
    AlertCircle,
    User,
    Phone,
    Sparkles,
    Shield,
    Zap
} from 'lucide-react';

// Custom Google Icon Component
const GoogleLogo = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.24.81-6z" fill="#FBBC05" />
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
);

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
    mode: 'login' | 'signup';
    onSwitchMode: (mode: 'login' | 'signup') => void;
}

export default function AuthModal({
    isOpen,
    onClose,
    mode = 'login',
    onSwitchMode
}: AuthModalProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [success, setSuccess] = useState(false);

    const modalRef = useRef<HTMLDivElement>(null);
    const emailInputRef = useRef<HTMLInputElement>(null);

    // Focus sur l'email à l'ouverture
    useEffect(() => {
        if (isOpen && emailInputRef.current) {
            setTimeout(() => {
                emailInputRef.current?.focus();
            }, 150);
        }
    }, [isOpen, mode]);

    // Gestion du scroll et fermeture
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                onClose();
            }
        }

        function handleKeyDown(e: KeyboardEvent) {
            if (e.key === 'Escape' && isOpen) onClose();
        }

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            document.addEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!email.trim()) {
            newErrors.email = 'L\'email est requis';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Format d\'email invalide';
        }

        if (!password) {
            newErrors.password = 'Le mot de passe est requis';
        } else if (password.length < 8) {
            newErrors.password = 'Minimum 8 caractères';
        }

        if (mode === 'signup') {
            if (!fullName.trim()) {
                newErrors.fullName = 'Le nom complet est requis';
            }
            if (password !== confirmPassword) {
                newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsLoading(true);
        setErrors({});

        try {
            await new Promise(resolve => setTimeout(resolve, 1200));
            
            setSuccess(true);
            setTimeout(() => {
                if (mode === 'login') {
                    onClose();
                } else {
                    onSwitchMode('login');
                }
                setSuccess(false);
                // Réinitialiser les champs
                setEmail('');
                setPassword('');
                setConfirmPassword('');
                setFullName('');
                setPhone('');
            }, 1800);
        } catch (error) {
            setErrors({ general: 'Une erreur est survenue. Veuillez réessayer.' });
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <>
            {/* Overlay avec animation */}
            <div 
                className="fixed inset-0 z-100 bg-linear-to-br from-black/70 via-black/50 to-black/30 backdrop-blur-md transition-opacity duration-300"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="fixed inset-0 z-101 flex items-center justify-center p-3 sm:p-4">
                <div
                    ref={modalRef}
                    className="relative w-full max-w-md bg-white dark:bg-gray-900 rounded-3xl shadow-2xl shadow-black/20 max-h-[95vh] overflow-hidden flex flex-col"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header avec gradient */}
                    <div className="relative p-6 pb-4 bg-linear-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 dark:from-blue-900/20 dark:via-purple-900/20 dark:to-pink-900/20">
                        {/* Effets de fond */}
                        <div className="absolute inset-0 overflow-hidden">
                            <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500/5 rounded-full blur-3xl"></div>
                            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-500/5 rounded-full blur-3xl"></div>
                        </div>

                        <div className="relative flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-linear-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                                    <Shield className="h-6 w-6 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
                                        {mode === 'login' ? 'Bienvenue' : 'Commencer'}
                                    </h2>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                        {mode === 'login'
                                            ? 'Connectez-vous à votre compte'
                                            : 'Créez votre compte gratuitement'}
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2.5 hover:bg-gray-100/80 dark:hover:bg-gray-800/80 rounded-xl transition-all duration-200 active:scale-95"
                                aria-label="Fermer"
                            >
                                <X className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                            </button>
                        </div>
                    </div>

                    {/* Form avec spacing optimisé */}
                    <div className="flex-1 overflow-y-auto">
                        <form onSubmit={handleSubmit} className="p-6">
                            {/* Messages d'état */}
                            {errors.general && (
                                <div className="mb-5 p-4 bg-linear-gradient-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/10 border-l-4 border-red-500 rounded-lg">
                                    <div className="flex items-center gap-2 text-red-700 dark:text-red-400">
                                        <AlertCircle className="h-5 w-5 shrink-0" />
                                        <span className="text-sm font-medium">{errors.general}</span>
                                    </div>
                                </div>
                            )}

                            {success && (
                                <div className="mb-5 p-4 bg-linear-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/10 border-l-4 border-green-500 rounded-lg">
                                    <div className="flex items-center gap-2 text-green-700 dark:text-green-400">
                                        <Check className="h-5 w-5 shrink-0" />
                                        <span className="text-sm font-medium">
                                            {mode === 'login'
                                                ? 'Connexion réussie ! Redirection...'
                                                : 'Compte créé avec succès !'}
                                        </span>
                                    </div>
                                </div>
                            )}

                            {/* Social Login - Design moderne */}
                            <div className="mb-7">
                                <div className="grid grid-cols-2 gap-3">
                                    <button
                                        type="button"
                                        className="flex items-center justify-center gap-3 p-3.5 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all duration-200 border border-gray-200 dark:border-gray-700 active:scale-[0.98]"
                                    >
                                        <GoogleLogo className="h-5 w-5" />
                                        <span className="font-medium text-sm text-gray-700 dark:text-gray-300">Google</span>
                                    </button>
                                    <button
                                        type="button"
                                        className="flex items-center justify-center gap-3 p-3.5 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all duration-200 border border-gray-200 dark:border-gray-700 active:scale-[0.98]"
                                    >
                                        <div className="w-5 h-5 flex items-center justify-center">
                                            <div className="w-5 h-5 bg-linear-to-br from-blue-500 to-blue-600 rounded flex items-center justify-center">
                                                <span className="text-xs font-bold text-white">f</span>
                                            </div>
                                        </div>
                                        <span className="font-medium text-sm text-gray-700 dark:text-gray-300">Facebook</span>
                                    </button>
                                </div>

                                <div className="relative my-6">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-gray-300/50 dark:border-gray-700/50"></div>
                                    </div>
                                    <div className="relative flex justify-center">
                                        <span className="px-3 bg-white dark:bg-gray-900 text-xs font-medium text-gray-500 dark:text-gray-400">
                                            Ou continuez avec email
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Form fields avec spacing amélioré */}
                            <div className="space-y-5">
                                {/* Full Name (signup only) */}
                                {mode === 'signup' && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2.5">
                                            <span className="flex items-center gap-2">
                                                <User className="h-4 w-4 text-gray-500" />
                                                Nom complet
                                            </span>
                                        </label>
                                        <input
                                            type="text"
                                            value={fullName}
                                            onChange={(e) => setFullName(e.target.value)}
                                            className={`w-full px-4 py-3.5 bg-gray-50/80 dark:bg-gray-800/80 border-2 ${
                                                errors.fullName 
                                                    ? 'border-red-300 dark:border-red-700 focus:border-red-500 dark:focus:border-red-500' 
                                                    : 'border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-500'
                                            } rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:text-white transition-all duration-200`}
                                            placeholder="John Doe"
                                        />
                                        {errors.fullName && (
                                            <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.fullName}</p>
                                        )}
                                    </div>
                                )}

                                {/* Email */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2.5">
                                        <span className="flex items-center gap-2">
                                            <Mail className="h-4 w-4 text-gray-500" />
                                            Adresse email
                                        </span>
                                    </label>
                                    <input
                                        ref={emailInputRef}
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className={`w-full px-4 py-3.5 bg-gray-50/80 dark:bg-gray-800/80 border-2 ${
                                            errors.email 
                                                ? 'border-red-300 dark:border-red-700 focus:border-red-500 dark:focus:border-red-500' 
                                                : 'border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-500'
                                        } rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:text-white transition-all duration-200`}
                                        placeholder="john@example.com"
                                    />
                                    {errors.email && (
                                        <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.email}</p>
                                    )}
                                </div>

                                {/* Password */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2.5">
                                        <span className="flex items-center gap-2">
                                            <Lock className="h-4 w-4 text-gray-500" />
                                            Mot de passe
                                        </span>
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className={`w-full px-4 pr-12 py-3.5 bg-gray-50/80 dark:bg-gray-800/80 border-2 ${
                                                errors.password 
                                                    ? 'border-red-300 dark:border-red-700 focus:border-red-500 dark:focus:border-red-500' 
                                                    : 'border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-500'
                                            } rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:text-white transition-all duration-200`}
                                            placeholder="••••••••"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors rounded-lg hover:bg-gray-100/50 dark:hover:bg-gray-700/50"
                                            aria-label={showPassword ? "Cacher le mot de passe" : "Montrer le mot de passe"}
                                        >
                                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                        </button>
                                    </div>
                                    {errors.password && (
                                        <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.password}</p>
                                    )}
                                </div>

                                {/* Confirm Password (signup only) */}
                                {mode === 'signup' && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2.5">
                                            Confirmer le mot de passe
                                        </label>
                                        <div className="relative">
                                            <input
                                                type={showConfirmPassword ? 'text' : 'password'}
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                className={`w-full px-4 pr-12 py-3.5 bg-gray-50/80 dark:bg-gray-800/80 border-2 ${
                                                    errors.confirmPassword 
                                                        ? 'border-red-300 dark:border-red-700 focus:border-red-500 dark:focus:border-red-500' 
                                                        : 'border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-500'
                                                } rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:text-white transition-all duration-200`}
                                                placeholder="••••••••"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors rounded-lg hover:bg-gray-100/50 dark:hover:bg-gray-700/50"
                                                aria-label={showConfirmPassword ? "Cacher le mot de passe" : "Montrer le mot de passe"}
                                            >
                                                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                            </button>
                                        </div>
                                        {errors.confirmPassword && (
                                            <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.confirmPassword}</p>
                                        )}
                                    </div>
                                )}

                                {/* Phone (signup only - optionnel) */}
                                {mode === 'signup' && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2.5">
                                            <span className="flex items-center gap-2">
                                                <Phone className="h-4 w-4 text-gray-500" />
                                                Téléphone <span className="text-xs text-gray-500">(optionnel)</span>
                                            </span>
                                        </label>
                                        <input
                                            type="tel"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            className="w-full px-4 py-3.5 bg-gray-50/80 dark:bg-gray-800/80 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-blue-500 dark:focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:text-white transition-all duration-200"
                                            placeholder="+225 00 00 00 00"
                                        />
                                    </div>
                                )}

                                {/* Remember Me & Forgot Password (login only) */}
                                {mode === 'login' && (
                                    <div className="flex items-center justify-between pt-2">
                                        <label className="flex items-center gap-2 cursor-pointer group">
                                            <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200 ${
                                                rememberMe 
                                                    ? 'bg-blue-600 border-blue-600' 
                                                    : 'bg-transparent border-gray-300 dark:border-gray-600 group-hover:border-blue-500'
                                            }`}>
                                                {rememberMe && <Check className="h-3 w-3 text-white" />}
                                            </div>
                                            <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                                                Se souvenir de moi
                                            </span>
                                        </label>
                                        <button
                                            type="button"
                                            className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                                        >
                                            Mot de passe oublié ?
                                        </button>
                                    </div>
                                )}

                                {/* Terms (signup only) */}
                                {mode === 'signup' && (
                                    <div className="pt-2">
                                        <label className="flex items-start gap-3 cursor-pointer group">
                                            <div className="w-5 h-5 mt-0.5 rounded border-2 flex items-center justify-center transition-all duration-200 border-gray-300 dark:border-gray-600 group-hover:border-blue-500">
                                                <Check className="h-3 w-3 text-white opacity-0" />
                                            </div>
                                            <span className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
                                                En créant un compte, j'accepte les{' '}
                                                <Link href="/terms" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors">
                                                    Conditions d'utilisation
                                                </Link>{' '}
                                                et la{' '}
                                                <Link href="/privacy" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors">
                                                    Politique de confidentialité
                                                </Link>
                                            </span>
                                        </label>
                                    </div>
                                )}

                                {/* Submit Button - Design premium */}
                                <div className="pt-2">
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full py-4 bg-linear-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] relative overflow-hidden group"
                                    >
                                        {/* Effet de fond animé */}
                                        <div className="absolute inset-0 bg-linear-gradient-to-r from-blue-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                        
                                        <div className="relative flex items-center justify-center gap-2">
                                            {isLoading ? (
                                                <>
                                                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                                                    <span>{mode === 'login' ? 'Connexion...' : 'Création...'}</span>
                                                </>
                                            ) : (
                                                <>
                                                    <Zap className="h-5 w-5" />
                                                    <span>{mode === 'login' ? 'Se connecter' : 'Créer mon compte'}</span>
                                                </>
                                            )}
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>

                    {/* Footer avec design amélioré */}
                    <div className="sticky bottom-0 bg-linear-gradient-to-t from-white/95 to-white dark:from-gray-900/95 dark:to-gray-900 border-t border-gray-200/50 dark:border-gray-800/50 backdrop-blur-sm p-6">
                        <div className="text-center">
                            <p className="text-gray-600 dark:text-gray-400 text-sm">
                                {mode === 'login' ? 'Nouveau sur Concours.ci ?' : 'Déjà un compte ?'}{' '}
                                <button
                                    type="button"
                                    onClick={() => onSwitchMode(mode === 'login' ? 'signup' : 'login')}
                                    className="font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors inline-flex items-center gap-1 group"
                                >
                                    {mode === 'login' ? 'S\'inscrire gratuitement' : 'Se connecter'}
                                    <Sparkles className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </button>
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-500 mt-3">
                                Sécurisé par des technologies avancées
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}