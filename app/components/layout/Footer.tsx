'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Linkedin,
  Send,
  ChevronUp,
  Heart,
  Shield,
  Award,
  Globe,
  Download,
  MessageSquare,
  Clock,
  Users,
  CheckCircle,
  HelpCircle,
  ArrowRight,
  Newspaper,
  BookOpen,
  Calendar,
  Bell,
  FileText,
  Menu,
  X,
  ChevronDown,
  ExternalLink,
  Wifi,
  WifiOff,
} from 'lucide-react';

// Static data that doesn't need to be recreated on every render
const quickLinks = [
  { label: 'Concours ouverts', href: '/concours?status=open', icon: <CheckCircle className="h-4 w-4" /> },
  { label: 'Concours à venir', href: '/concours?status=upcoming', icon: <Calendar className="h-4 w-4" /> },
  { label: 'Quiz gratuits', href: '/quiz', icon: <BookOpen className="h-4 w-4" /> },
  { label: 'Annales', href: '/ressources/annales', icon: <FileText className="h-4 w-4" /> },
  { label: 'Actualités', href: '/actualites', icon: <Newspaper className="h-4 w-4" /> },
  { label: 'Guide de préparation', href: '/ressources/guide', icon: <Award className="h-4 w-4" /> },
];

const concoursCategories = [
  { label: 'Fonction Publique', href: '/concours/category/fonction-publique', count: 24 },
  { label: 'Grandes Écoles', href: '/concours/category/grandes-ecoles', count: 18 },
  { label: 'Santé', href: '/concours/category/sante', count: 12 },
  { label: 'Sécurité', href: '/concours/category/securite', count: 8 },
  { label: 'Éducation', href: '/concours/category/education', count: 15 },
  { label: 'Autre', href: '/concours/category/autre', count: 7 },
];

const resources = [
  { label: 'Foire aux questions', href: '/faq', icon: <HelpCircle className="h-4 w-4" /> },
  { label: 'Blog & Conseils', href: '/blog', icon: <MessageSquare className="h-4 w-4" /> },
  { label: 'Témoignages', href: '/temoignages', icon: <Users className="h-4 w-4" /> },
  { label: 'Statistiques', href: '/statistiques', icon: <Clock className="h-4 w-4" /> },
  { label: 'Mentions légales', href: '/mentions-legales', icon: <Shield className="h-4 w-4" /> },
  { label: 'Politique de confidentialité', href: '/confidentialite', icon: <Shield className="h-4 w-4" /> },
];

const socialLinks = [
  { platform: 'Facebook', icon: <Facebook className="h-5 w-5" />, href: 'https://facebook.com', color: 'hover:bg-[#1877F2]', label: 'Suivez-nous sur Facebook' },
  { platform: 'Twitter', icon: <Twitter className="h-5 w-5" />, href: 'https://twitter.com', color: 'hover:bg-[#1DA1F2]', label: 'Suivez-nous sur Twitter' },
  { platform: 'Instagram', icon: <Instagram className="h-5 w-5" />, href: 'https://instagram.com', color: 'hover:bg-linear-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCAF45]', label: 'Suivez-nous sur Instagram' },
  { platform: 'YouTube', icon: <Youtube className="h-5 w-5" />, href: 'https://youtube.com', color: 'hover:bg-[#FF0000]', label: 'Abonnez-vous sur YouTube' },
  { platform: 'LinkedIn', icon: <Linkedin className="h-5 w-5" />, href: 'https://linkedin.com', color: 'hover:bg-[#0077B5]', label: 'Suivez-nous sur LinkedIn' },
];

const appStores = [
  { store: 'Google Play', icon: 'Google Play', href: '#', label: 'Télécharger sur Google Play' },
  { store: 'App Store', icon: 'App Store', href: '#', label: 'Télécharger sur App Store' },
];

const paymentMethods = [
  { name: 'Orange Money', color: 'bg-orange-500', icon: 'OM' },
  { name: 'MTN Mobile Money', color: 'bg-yellow-500', icon: 'MOMO' },
  { name: 'Visa', color: 'bg-blue-600', icon: 'Visa' },
  { name: 'Mastercard', color: 'bg-red-600', icon: 'MC' },
  { name: 'Wave', color: 'bg-green-500', icon: 'Wave' },
];


const seals = [
  {
    icon: Shield,
    label: 'Site officiel',
    gradient: 'bg-gradient-to-r from-orange-500 to-red-600',
  },
  {
    icon: Award,
    label: 'Certifié',
    gradient: 'bg-gradient-to-r from-blue-500 to-blue-600',
  },
  {
    icon: CheckCircle,
    label: 'Sécurisé',
    gradient: 'bg-gradient-to-r from-green-500 to-green-600',
  },
];

const contacts = [
  {
    icon: Mail,
    label: 'Email',
    value: 'contact@concours.ci',
    href: 'mailto:contact@concours.ci',
    ariaLabel: 'Envoyer un email à contact@concours.ci',
    gradient: 'bg-gradient-to-r from-orange-500 to-red-600',
    color: 'text-orange-500',
  },
  {
    icon: Phone,
    label: 'Téléphone',
    value: '+225 27 27 27 27 27',
    href: 'tel:+2252727272727',
    ariaLabel: 'Appeler le +225 27 27 27 27 27',
    gradient: 'bg-gradient-to-r from-blue-500 to-blue-600',
    color: 'text-blue-500',
  },
  {
    icon: MapPin,
    label: 'Adresse',
    href: "Plateau, Abidjan, Côte d'Ivoire",
    ariaLabel: 'Adresse',
    value: "Plateau, Abidjan, Côte d'Ivoire",
    gradient: 'bg-gradient-to-r from-green-500 to-green-600',
    color: 'text-green-500'
  },
];
const badges = [
  {
    icon: Shield,
    text: 'Informations officielles vérifiées',
    bgClass: 'bg-green-500/20',
    iconClass: 'text-green-500',
  },
  {
    icon: Users,
    text: '50 000+ candidats accompagnés',
    bgClass: 'bg-blue-500/20',
    iconClass: 'text-blue-500',
  },
  {
    icon: Award,
    text: '95% de satisfaction',
    bgClass: 'bg-yellow-500/20',
    iconClass: 'text-yellow-500',
  },
];





export default function Footer() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState('fr');
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [showSupportTooltip, setShowSupportTooltip] = useState(false);

  // Check scroll position for back to top button
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Check online status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    setIsOnline(navigator.onLine);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const toggleAccordion = useCallback((section: string) => {
    setActiveAccordion(prev => prev === section ? null : section);
  }, []);

  const handleNewsletterSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !validateEmail(email)) return;
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Newsletter subscription:', email);
      setIsSubscribed(true);
      setEmail('');
      
      setTimeout(() => setIsSubscribed(false), 3000);
    } catch (error) {
      console.error('Subscription failed:', error);
    }
  }, [email]);

  const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleLanguageChange = useCallback((langCode: string) => {
    setSelectedLanguage(langCode);
    setShowLanguageDropdown(false);
    // Here you would typically update the application language
    console.log('Language changed to:', langCode);
  }, []);

  return (
    <footer className="bg-linear-to-b from-gray-900 to-gray-950 text-gray-300 relative">
      {/* Back to top button - appears when scrolled */}
      {isScrolled && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-24 right-6 z-40 w-12 h-12 bg-linear-to-r from-orange-500 to-red-600 rounded-full shadow-2xl flex items-center justify-center hover:shadow-orange-500/30 hover:scale-110 transition-all duration-300 group"
          aria-label="Retour en haut"
        >
          <ChevronUp className="h-6 w-6 text-white" />
          <span className="absolute right-14 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Retour en haut
          </span>
        </button>
      )}

      {/* Top section */}
      <div className="border-b border-gray-800 bg-linear-to-r from-gray-900 to-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold text-white mb-1">
                📢 Restez informé des nouveaux concours
              </h3>
              <p className="text-gray-400 text-sm">
                {isOnline ? (
                  <span className="flex items-center gap-1">
                    <Wifi className="h-3 w-3 text-green-500" />
                    Connecté • Recevez des alertes en temps réel
                  </span>
                ) : (
                  <span className="flex items-center gap-1">
                    <WifiOff className="h-3 w-3 text-yellow-500" />
                    Hors ligne • Les alertes seront envoyées lors de la reconnexion
                  </span>
                )}
              </p>
            </div>
            
            <button
              onClick={() => window.location.href = '/alertes'}
              className="px-6 py-3 bg-linear-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 rounded-lg font-medium text-white hover:shadow-lg hover:scale-105 transition-all flex items-center gap-2"
              aria-label="Configurer les alertes par email"
            >
              <Bell className="h-5 w-5" />
              <span className="hidden sm:inline">Configurer les alertes</span>
              <span className="sm:hidden">Alertes</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Logo et description */}
          <div className="lg:col-span-3">
            <Link href="/" className="inline-block mb-6 group" aria-label="Accueil Concours.ci">
              <div className="flex items-center space-x-3">
                <div className="bg-linear-to-r from-orange-500 to-red-600 p-2 rounded-xl group-hover:scale-105 transition-transform">
                  <Award className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white group-hover:text-orange-400 transition-colors">
                    Concours<span className="text-orange-500">.ci</span>
                  </h2>
                  <p className="text-sm text-gray-400">Votre succès commence ici</p>
                </div>
              </div>
            </Link>
            
            <p className="text-gray-400 mb-6 leading-relaxed">
              La plateforme de référence pour tous les concours en Côte d'Ivoire. 
              Informations fiables, préparation efficace et communauté active.
            </p>
            
            {/* Badges de confiance */}
            <div className="space-y-3 mb-6">
              {badges.map((badge, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className={`w-6 h-6 ${badge.bgClass} rounded-full flex items-center justify-center`}>
                    <badge.icon className={`h-3 w-3 ${badge.iconClass}`} />
                  </div>
                  <span className="text-sm">{badge.text}</span>
                </div>
              ))}
            </div>

            {/* Newsletter mobile */}
            <div className="lg:hidden mb-8">
              <NewsletterForm
                email={email}
                setEmail={setEmail}
                onSubmit={handleNewsletterSubmit}
                isSubscribed={isSubscribed}
                validateEmail={validateEmail}
              />
            </div>
          </div>

          {/* Liens rapides */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-semibold text-white mb-6 pb-2 border-b border-gray-800">
              Navigation
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="flex items-center space-x-2 text-gray-400 hover:text-orange-400 transition-colors group py-1"
                    aria-label={`Accéder à ${link.label}`}
                  >
                    <span className="text-orange-500 opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowRight className="h-3 w-3" />
                    </span>
                    <span className="group-hover:underline">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Catégories */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-semibold text-white mb-6 pb-2 border-b border-gray-800">
              Catégories
            </h3>
            <ul className="space-y-3">
              {concoursCategories.map((category) => (
                <li key={category.label}>
                  <Link
                    href={category.href}
                    className="flex items-center justify-between text-gray-400 hover:text-orange-400 transition-colors group py-1"
                    aria-label={`Voir les concours de ${category.label}`}
                  >
                    <span className="group-hover:underline">{category.label}</span>
                    <span className="bg-gray-800 text-gray-400 text-xs px-2 py-1 rounded group-hover:bg-orange-500 group-hover:text-white transition-colors">
                      {category.count}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Ressources */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-semibold text-white mb-6 pb-2 border-b border-gray-800">
              Ressources
            </h3>
            <ul className="space-y-3">
              {resources.map((resource) => (
                <li key={resource.label}>
                  <Link
                    href={resource.href}
                    className="flex items-center space-x-2 text-gray-400 hover:text-orange-400 transition-colors group py-1"
                    aria-label={`Accéder à ${resource.label}`}
                  >
                    <span className="text-orange-500">
                      {resource.icon}
                    </span>
                    <span className="group-hover:underline">{resource.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter et contact (desktop) */}
          <div className="lg:col-span-3 hidden lg:block">
            <NewsletterForm
              email={email}
              setEmail={setEmail}
              onSubmit={handleNewsletterSubmit}
              isSubscribed={isSubscribed}
              validateEmail={validateEmail}
            />

            {/* Contact info */}
            <ContactInfo />
          </div>
        </div>

        {/* Mobile accordion for contact */}
        <div className="lg:hidden mt-8">
          <MobileAccordion
            activeAccordion={activeAccordion}
            toggleAccordion={toggleAccordion}
          />
        </div>
      </div>

      {/* Bottom section */}
      <div className="border-t border-gray-800 bg-gray-900/50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Social links */}
            <SocialLinks />

            {/* Payment methods */}
            <PaymentMethods />


          </div>

          {/* Download apps */}
          <DownloadAppsSection />

          {/* Copyright */}
          <CopyrightSection />

          {/* Government seals */}
          <GovernmentSeals />
        </div>
      </div>

      {/* Floating support button */}
      <FloatingSupportButton
        showTooltip={showSupportTooltip}
        setShowTooltip={setShowSupportTooltip}
      />
    </footer>
  );
}

// Sub-components for better organization

function NewsletterForm({
  email,
  setEmail,
  onSubmit,
  isSubscribed,
  validateEmail,
}: {
  email: string;
  setEmail: (email: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isSubscribed: boolean;
  validateEmail: (email: string) => boolean;
}) {
  const [isValid, setIsValid] = useState(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    if (value) setIsValid(validateEmail(value));
  };

  return (
    <div className="bg-linear-to-r from-gray-800 to-gray-900 rounded-xl p-6 mb-8">
      <div className="flex items-center mb-3">
        <Send className="h-5 w-5 text-orange-500 mr-2" />
        <h3 className="text-lg font-semibold text-white">
          Newsletter
        </h3>
      </div>
      <p className="text-gray-400 text-sm mb-4">
        Recevez les dernières actualités sur les concours directement dans votre boîte mail
      </p>
      <form onSubmit={onSubmit} className="space-y-3" noValidate>
        <div className="relative">
          <input
            type="email"
            value={email}
            onChange={handleChange}
            placeholder="Votre adresse email"
            className={`w-full px-4 py-3 bg-gray-800 border ${isValid ? 'border-gray-700' : 'border-red-500'} rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500`}
            required
            aria-invalid={!isValid}
            aria-describedby={!isValid ? "email-error" : undefined}
          />
          {!isValid && email && (
            <p id="email-error" className="text-red-400 text-xs mt-1">
              Veuillez entrer une adresse email valide
            </p>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-linear-to-r from-orange-500 to-red-600 px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
          aria-label="S'abonner à la newsletter"
        >
          <Send className="h-5 w-5" />
          S'abonner
        </button>
        {isSubscribed && (
          <p className="text-green-400 text-sm text-center animate-pulse" role="alert">
            ✓ Merci pour votre inscription !
          </p>
        )}
      </form>
      <p className="text-gray-500 text-xs mt-3">
        En vous abonnant, vous acceptez notre politique de confidentialité.
      </p>
    </div>
  );
}

function ContactInfo() {
  return (
    <div className="space-y-4">
      <h4 className="text-lg font-semibold text-white mb-4">Contact</h4>
      <div className="space-y-4">
{contacts.map((contact, index) => (
          <div key={index} className="flex items-center space-x-3">
            <div className={`w-10 h-10 ${contact.gradient} rounded-lg flex items-center justify-center shrink-0`}>
              <contact.icon className="h-5 w-5 text-white" />
            </div>
            <div>
            <p className="text-sm text-gray-400">{contact.label}</p>
            <a 
              href={contact.href} 
              className="text-white hover:text-orange-400 transition-colors"
              aria-label={`Envoyer un email à ${contact.href}`}
            >
              {contact.href}
            </a>
          </div>
        </div>
        ))}

        
       
      </div>
    </div>
  );
}

function MobileAccordion({
  activeAccordion,
  toggleAccordion,
}: {
  activeAccordion: string | null;
  toggleAccordion: (section: string) => void;
}) {
  return (
    <div className="border border-gray-800 rounded-xl overflow-hidden">
      <button
        onClick={() => toggleAccordion('contact')}
        className="w-full px-6 py-4 flex items-center justify-between bg-gray-800/50 hover:bg-gray-800 transition-colors"
        aria-expanded={activeAccordion === 'contact'}
        aria-controls="contact-content"
      >
        <span className="font-semibold text-white flex items-center gap-2">
          <Phone className="h-5 w-5 text-orange-500" />
          Informations de contact
        </span>
        <ChevronDown 
          className={`h-5 w-5 text-gray-400 transition-transform duration-300 ${activeAccordion === 'contact' ? 'rotate-180' : ''}`}
        />
      </button>
      
      {activeAccordion === 'contact' && (
        <div id="contact-content" className="px-6 py-4 space-y-4 bg-gray-800/30">
          {contacts.map((contact) => (
            <div key={contact.label} className="flex items-center space-x-3">
              <contact.icon className={`h-5 w-5 ${contact.color} shrink-0`} />
              <a 
                href={contact.href} 
                className="text-white hover:text-orange-400 transition-colors"
                aria-label={`Envoyer un email à ${contact.href}`}
              >
                {contact.href}
              </a>
            </div>
          ))}
          
  
  

        </div>
      )}
    </div>
  );
}

function SocialLinks() {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-4">
      <span className="text-gray-400 whitespace-nowrap">Suivez-nous :</span>
      <div className="flex gap-2">
        {socialLinks.map((social) => (
          <a
            key={social.platform}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-white ${social.color} transition-all hover:scale-110`}
            aria-label={social.label}
            title={social.platform}
          >
            {social.icon}
          </a>
        ))}
      </div>
    </div>
  );
}

function PaymentMethods() {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-4">
      <span className="text-gray-400 whitespace-nowrap">Paiements acceptés :</span>
      <div className="flex gap-2 flex-wrap justify-center">
        {paymentMethods.map((method) => (
          <div
            key={method.name}
            className={`px-3 py-1 ${method.color} text-white text-xs font-medium rounded-lg flex items-center gap-1`}
            title={method.name}
            aria-label={`Accepte ${method.name}`}
          >
            <span className="font-bold">{method.icon}</span>
            <span className="hidden sm:inline">{method.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function DownloadAppsSection() {
  return (
    <div className="mt-8 pt-8 border-t border-gray-800">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <h4 className="text-white font-semibold mb-2">📱 Téléchargez notre application</h4>
          <p className="text-gray-400 text-sm max-w-md">
            Recevez des notifications push pour ne manquer aucun concours et préparez-vous partout
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          {appStores.map((store) => (
            <a
              key={store.store}
              href={store.href}
              className="px-6 py-3 bg-linear-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 rounded-lg flex items-center space-x-2 transition-all hover:scale-105 hover:shadow-lg"
              aria-label={store.label}
            >
              <Download className="h-5 w-5" />
              <span className="font-medium">{store.store}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

function CopyrightSection() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="mt-8 pt-8 border-t border-gray-800">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-center md:text-left">
          <p className="text-gray-400">
            © {currentYear} Concours.ci - Tous droits réservés.
            Made with <Heart className="inline h-4 w-4 text-red-500 animate-pulse" /> en Côte d'Ivoire
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/conditions-generales" className="text-gray-400 hover:text-orange-400 text-sm transition-colors">
            Conditions générales
          </Link>
          <Link href="/confidentialite" className="text-gray-400 hover:text-orange-400 text-sm transition-colors">
            Confidentialité
          </Link>
          <Link href="/cookies" className="text-gray-400 hover:text-orange-400 text-sm transition-colors">
            Cookies
          </Link>
          <Link href="/plandusite" className="text-gray-400 hover:text-orange-400 text-sm transition-colors">
            Plan du site
          </Link>
          <Link href="/accessibilite" className="text-gray-400 hover:text-orange-400 text-sm transition-colors">
            Accessibilité
          </Link>
        </div>
      </div>
    </div>
  );
}

function GovernmentSeals() {
  return (
    <div className="mt-8 flex flex-wrap justify-center gap-8">
      {seals.map((seal, index) => (
        <div key={index} className="text-center group">
          <div className={`w-16 h-16 ${seal.gradient} rounded-full flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform`}>
            <seal.icon className="h-8 w-8 text-white" />
          </div>
          <p className="text-xs text-gray-400 group-hover:text-white transition-colors">{seal.label}</p>
        </div>
      ))}
    </div>
  );
}
      
     
 

function FloatingSupportButton({
  showTooltip,
  setShowTooltip,
}: {
  showTooltip: boolean;
  setShowTooltip: (show: boolean) => void;
}) {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="relative">
        <button
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          onFocus={() => setShowTooltip(true)}
          onBlur={() => setShowTooltip(false)}
          className="w-14 h-14 bg-linear-to-r from-orange-500 to-red-600 rounded-full shadow-2xl flex items-center justify-center text-white hover:scale-110 transition-transform ring-2 ring-orange-500/30"
          aria-label="Support et assistance"
          aria-expanded={showTooltip}
        >
          <MessageSquare className="h-6 w-6" />
        </button>
        
        {/* Tooltip */}
        <div 
          className={`absolute bottom-full right-0 mb-3 w-64 bg-gray-900 rounded-xl p-4 shadow-2xl transition-all duration-300 ${showTooltip ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-2'}`}
          role="tooltip"
        >
          <div className="text-center">
            <h4 className="font-semibold text-white mb-2">Besoin d'aide ?</h4>
            <p className="text-gray-400 text-sm mb-3">
              Notre équipe est disponible pour vous aider
            </p>
            <div className="space-y-2">
              <a
                href="tel:+2252727272727"
                className="block bg-linear-to-r from-orange-500 to-red-600 text-white py-2 rounded-lg hover:opacity-90 transition-opacity font-medium"
                aria-label="Appeler l'assistance téléphonique"
              >
                Appeler maintenant
              </a>
              <a
                href="https://wa.me/2252727272727"
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors font-medium"
                aria-label="Ouvrir WhatsApp pour contacter le support"
              >
                WhatsApp
              </a>
              <Link
                href="/faq"
                className="block border border-gray-700 text-gray-300 py-2 rounded-lg hover:bg-gray-800 transition-colors text-sm"
                aria-label="Consulter la foire aux questions"
              >
                FAQ
              </Link>
            </div>
          </div>
          {/* Flèche */}
          <div className="absolute top-full right-6 -mt-1 border-8 border-transparent border-t-gray-900"></div>
        </div>
      </div>
    </div>
  );
}