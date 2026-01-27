'use client';

import { useState, useEffect } from 'react';
import { 
  ChevronRight, 
  Award, 
  BookOpen, 
  Users, 
  Calendar,
  ArrowRight,
  Sparkles,
  Target,
  CheckCircle
} from 'lucide-react';
import Link from 'next/link';

export default function HeroSection() {
  const [currentConcoursIndex, setCurrentConcoursIndex] = useState(0);
  
  const featuredConcours = [
    { id: 1, title: 'Concours ENA 2024', deadline: '15 Mai 2024', candidates: 2500 },
    { id: 2, title: 'Concours Police Nationale', deadline: '30 Juin 2024', candidates: 1800 },
    { id: 3, title: 'Concours INFAS', deadline: '20 Juillet 2024', candidates: 1200 },
  ];

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
      setCurrentConcoursIndex((prev) => (prev + 1) % featuredConcours.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [featuredConcours.length]);

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
            <div className="inline-flex items-center px-4 py-2 bg-linear-to-r from-orange-100 to-red-100 rounded-full border border-orange-200">
              <Sparkles className="h-4 w-4 text-orange-600 mr-2" />
              <span className="text-sm font-medium text-orange-700">
                Plateforme officielle des concours en Côte d'Ivoire
              </span>
            </div>
            
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
              <Link
                href="/concours"
                className="group relative inline-flex items-center justify-center px-8 py-4 bg-linear-to-r from-orange-500 to-red-600 text-white font-semibold rounded-xl hover:shadow-2xl hover:shadow-orange-200 transition-all duration-300 transform hover:-translate-y-1"
              >
                <span>Explorer les concours</span>
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                <div className="absolute inset-0 rounded-xl border-2 border-white/20 group-hover:border-white/40 transition-colors"></div>
              </Link>
              
              <Link
                href="/quiz"
                className="group inline-flex items-center justify-center px-8 py-4 bg-white border-2 border-orange-500 text-orange-600 font-semibold rounded-xl hover:bg-orange-50 transition-all duration-300"
              >
                <Target className="mr-2 h-5 w-5" />
                <span>Commencer un quiz</span>
              </Link>
            </div>
            
            {/* Stats rapides */}
            <div className="flex flex-wrap gap-6 pt-6">
              <div className="flex items-center">
                <div className="mr-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">150+</p>
                  <p className="text-sm text-gray-600">Concours actifs</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="mr-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Users className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">50K+</p>
                  <p className="text-sm text-gray-600">Candidats</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Côté droit avec carte de concours en vedette */}
          <div className="relative">
            {/* Carte principale */}
            <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200 transform hover:scale-[1.02] transition-transform duration-300">
              <div className="absolute top-0 left-0 w-full h-2 bg-linear-to-r from-orange-500 to-red-600"></div>
              
              <div className="p-6">
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
                    {featuredConcours.map((_, index) => (
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
                      {featuredConcours[currentConcoursIndex].title}
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
                        <p className="font-medium">{featuredConcours[currentConcoursIndex].deadline}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <Users className="h-5 w-5 text-gray-400 mr-3" />
                      <div>
                        <p className="text-sm text-gray-500">Candidats inscrits</p>
                        <p className="font-medium">{featuredConcours[currentConcoursIndex].candidates.toLocaleString()}+</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <Link
                      href={`/concours/${featuredConcours[currentConcoursIndex].id}`}
                      className="w-full block text-center bg-linear-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 items-center justify-center group"
                    >
                      Voir les détails
                      <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Cartes flottantes */}
            <div className="absolute -bottom-6 -left-6 w-64 bg-white rounded-xl shadow-lg border border-gray-200 p-4 transform -rotate-3">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                  <BookOpen className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Quiz gratuits</p>
                  <p className="text-xs text-gray-500">500+ questions disponibles</p>
                </div>
              </div>
            </div>
            
            <div className="absolute -top-6 -right-6 w-64 bg-white rounded-xl shadow-lg border border-gray-200 p-4 transform rotate-3">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">95% de satisfaction</p>
                  <p className="text-xs text-gray-500">Basé sur les avis des utilisateurs</p>
                </div>
              </div>
            </div>
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
              <div
                key={index}
                className="bg-white rounded-xl p-6 border border-gray-200 hover:border-orange-300 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-linear-to-r from-orange-100 to-red-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <div className="text-orange-600">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {feature.description}
                </p>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <span className="inline-flex items-center text-sm text-orange-600 font-medium">
                    En savoir plus
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Bandeau de confiance */}
        <div className="mt-16 bg-linear-to-r from-gray-900 to-gray-800 rounded-2xl p-6 text-white">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0">
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
                  <span className="text-sm font-medium">{ministry}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}