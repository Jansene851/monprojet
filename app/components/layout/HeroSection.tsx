// app/components/HeroSection.tsx
'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/app/components/ui/Card';
import { Button } from '@/app/components/ui/Button';
import { 
  ChevronRight, 
  Award, 
  BookOpen, 
  Users, 
  Calendar,
  ArrowRight,
  Sparkles,
  Target,
  CheckCircle} from 'lucide-react';
import { concoursData, getAllConcours } from '@/lib/data';

// Composant pour les statistiques
const StatCard = ({ value, label, icon: Icon, color }: {
  value: string;
  label: string;
  icon: React.ElementType;
  color: string;
}) => (
  <div className="flex items-center">
    <div className="mr-3">
      <div className={`w-10 h-10 ${color} rounded-lg flex items-center justify-center`}>
        <Icon className="h-5 w-5" />
      </div>
    </div>
    <div>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      <p className="text-sm text-gray-600">{label}</p>
    </div>
  </div>
);

// Composant pour les fonctionnalités
const FeatureCard = ({ icon, title, description }: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => (
  <Card
    variant="elevated"
    hover
    padding="lg"
    className="border border-gray-200 group"
  >
    <div className="w-12 h-12 bg-linear-to-r from-orange-100 to-red-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
      <div className="text-orange-600">
        {icon}
      </div>
    </div>
    <h3 className="text-lg font-semibold text-gray-900 mb-2">
      {title}
    </h3>
    <p className="text-gray-600 text-sm">
      {description}
    </p>
    <div className="mt-4 pt-4 border-t border-gray-100">
      <span className="inline-flex items-center text-sm text-orange-600 font-medium">
        En savoir plus
        <ChevronRight className="ml-1 h-4 w-4" />
      </span>
    </div>
  </Card>
);

export default function HeroSection() {
  const [currentConcoursIndex, setCurrentConcoursIndex] = useState(0);
  
 const concoursData = getAllConcours();

  const features = [
    {
      icon: <Award className="h-6 w-6" />,
      title: 'Informations fiables',
      description: 'Toutes les informations vérifiées et mises à jour régulièrement'
    },
    {
      icon: <BookOpen className="h-6 w-6" />,
      title: 'Ressources gratuites',
      description: 'Accédez à des annales, conseils et guides de préparation'
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: 'Communauté active',
      description: 'Échangez avec d\'autres candidats et des anciens lauréats'
    },
    {
      icon: <Calendar className="h-6 w-6" />,
      title: 'Calendrier intelligent',
      description: 'Ne manquez aucune date limite avec nos rappels personnalisés'
    }
  ];

  // Animation pour changer le concours en vedette
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentConcoursIndex((prev) => (prev + 1) % concoursData.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [concoursData.length]);

  return (
    <section className="relative overflow-hidden bg-linear-to-br from-orange-50 via-white to-red-50">
      {/* Arrière-plan décoratif */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-red-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
      
      <div className="relative container mx-auto px-4 py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Contenu principal */}
          <div className="space-y-8">
            <Card
              variant="ghost"
              className="inline-block border border-orange-200"
            >
              <div className="flex items-center px-4 py-2">
                <Sparkles className="h-4 w-4 text-orange-600 mr-2" />
                <span className="text-sm font-medium text-orange-700">
                  Plateforme officielle des concours en Côte d'Ivoire
                </span>
              </div>
            </Card>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Votre succès commence{' '}
              <span className="relative">
                <span className="relative z-10 bg-linear-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
                  ici
                </span>
                <span className="absolute bottom-2 left-0 w-full h-3 bg-orange-200/50 -rotate-1 z-0"></span>
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl leading-relaxed">
              Découvrez, préparez et réussissez tous les concours en Côte d'Ivoire. 
              Des informations fiables, des quiz interactifs et une communauté 
              pour vous accompagner vers la réussite.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                href="/concours"
                variant="primary"
                size="lg"
                gradient
                icon={ArrowRight}
                iconPosition="right"
                className="group transform hover:-translate-y-1"
              >
                Explorer les concours
              </Button>
              
              <Button
                href="/quiz"
                variant="outline"
                size="lg"
                className="border-orange-500 text-orange-600 hover:bg-orange-50"
                icon={Target}
              >
                Commencer un quiz
              </Button>
            </div>
            
            {/* Stats rapides */}
            <div className="flex flex-wrap gap-6 pt-6">
              <StatCard
                value="150+"
                label="Concours actifs"
                icon={CheckCircle}
                color="bg-green-100 text-green-600"
              />
              
              <StatCard
                value="50K+"
                label="Candidats"
                icon={Users}
                color="bg-blue-100 text-blue-600"
              />
            </div>
          </div>
          
          {/* Côté droit avec carte de concours en vedette */}
          <div className="relative">
            {/* Carte principale */}
            <Card
              variant="elevated"
              padding="lg"
              hover
              className="relative overflow-hidden border border-gray-200"
              accent="top"
              accentColor="bg-white"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-linear-to-r from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
                    <Award className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <span className="text-sm font-medium text-orange-600">En vedette</span>
                    <h3 className="text-xl font-bold text-gray-900">Concours du moment</h3>
                  </div>
                </div>
                <div className="flex space-x-1">
                  {concoursData.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentConcoursIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentConcoursIndex 
                          ? 'bg-orange-500 w-6' 
                          : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                      aria-label={`Voir concours ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
              
              {/* Contenu de la carte */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-bold text-gray-900">
                    {concoursData[currentConcoursIndex].title}
                  </h4>
                  <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                    Inscriptions ouvertes
                  </span>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Date limite</p>
                      <p className="font-medium">{concoursData[currentConcoursIndex].stats.places}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Users className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Candidats inscrits</p>
                      <p className="font-medium">{concoursData[currentConcoursIndex].status}+</p>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button
                    href={`/concours/${concoursData[currentConcoursIndex].id}`}
                    variant="primary"
                    gradient
                    fullWidth
                    icon={ChevronRight}
                    iconPosition="right"
                  >
                    Voir les détails
                  </Button>
                </div>
              </div>
            </Card>
            
            {/* Cartes flottantes */}
            <Card
              variant="elevated"
              padding="sm"
              className="absolute -bottom-6 -left-6 w-64 transform -rotate-3 border border-gray-200"
            >
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                  <BookOpen className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Quiz gratuits</p>
                  <p className="text-xs text-gray-500">500+ questions disponibles</p>
                </div>
              </div>
            </Card>
            
            <Card
              variant="elevated"
              padding="sm"
              className="absolute -top-6 -right-6 w-64 transform rotate-3 border border-gray-200"
            >
              <div className="flex items-center">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">95% de satisfaction</p>
                  <p className="text-xs text-gray-500">Basé sur les avis des utilisateurs</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
        
        {/* Features grid */}
        <div className="mt-20 pt-12 border-t border-gray-200">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Pourquoi choisir Concours.ci ?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Tout ce dont vous avez besoin pour réussir vos concours, réuni sur une seule plateforme
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>
        
        {/* Bandeau de confiance */}
        <Card
          variant="gradient"
          padding="lg"
          className="mt-16 bg-linear-to-r from-gray-900 to-gray-800 rounded-2xl p-6 text-white"
        >
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0 text-white">
              <h3 className="text-xl font-bold mb-2">
                Confiance et fiabilité
              </h3>
              <p className="text-gray-300">
                Partenaire officiel des institutions publiques ivoiriennes
              </p>
            </div>
            <div className="flex flex-wrap gap-6 items-center">
              {['MINEF', 'MENETFP', 'MINSANTE', 'DGDDI'].map((ministry, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <span className="font-bold text-white">{ministry.charAt(0)}</span>
                  </div>
                  <span className="text-sm font-medium text-white">{ministry}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>


    </section>
  );
}

// Version simplifiée pour utilisation dans des pages Serveurs
export function SimpleHeroSection() {
  return (
    <section className="relative overflow-hidden bg-linear-to-br from-orange-50 via-white to-red-50">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Votre succès commence ici
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Découvrez, préparez et réussissez tous les concours en Côte d'Ivoire
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/concours"
              className="bg-orange-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-600 transition"
            >
              Explorer les concours
            </a>
            <a
              href="/quiz"
              className="bg-white text-orange-500 border border-orange-500 px-6 py-3 rounded-lg font-medium hover:bg-orange-50 transition"
            >
              Commencer un quiz
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}