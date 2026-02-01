'use client';

// app/concours/[id]/page.tsx
import { notFound } from 'next/navigation';
import { Card } from '@/app/components/ui/Card';
import { Button } from '@/app/components/ui/Button';
import Breadcrumb from '@/app/components/layout/Breadcrumb';
import {
  getConcoursById,
  getRelatedConcours,
  getConcoursQuizzes,
  formatDate,
  getStatusColor,
  getDifficultyColor,
  getPopularityColor
} from '@/lib/data';
import {
  Calendar,
  Clock,
  Users,
  FileText,
  MapPin,
  Globe,
  Phone,
  Mail,
  Download,
  Share2,
  Bookmark,
  AlertCircle,
  ChevronRight,
  Target,
  BarChart3,
  Percent,
  Trophy,
  BookOpen,
  CheckCircle,
  ExternalLink,
  Bell,
  Award,
  Briefcase,
  GraduationCap,
  Star,
  Eye
} from 'lucide-react';

interface PageProps {
  params: Promise<{ id: string }>;
}

// Fonction pour obtenir l'icône par catégorie
const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'Fonction publique':
      return <Briefcase className="w-5 h-5" />;
    case 'Écoles':
      return <GraduationCap className="w-5 h-5" />;
    case 'Recrutement':
      return <Users className="w-5 h-5" />;
    case 'Bourses':
      return <Award className="w-5 h-5" />;
    case 'Santé':
      return <Star className="w-5 h-5" />;
    case 'Éducation':
      return <BookOpen className="w-5 h-5" />;
    default:
      return <Target className="w-5 h-5" />;
  }
};

export default async function ConcoursDetailPage({ params }: PageProps) {
  const { id } = await params;
  const concours = getConcoursById(id);

  if (!concours) {
    notFound();
  }

  const relatedConcours = getRelatedConcours(id);
  const quizzes = getConcoursQuizzes(id);

  // Calcul du taux de sélection
  const selectionRate = concours.stats.places && concours.stats.applicants 
    ? ((concours.stats.places / concours.stats.applicants) * 100).toFixed(1)
    : '0.0';

  return (
<div className="min-h-screen bg-gray-50 pt-16 sm:pt-20 lg:pt-24 px-4 sm:px-6 lg:px-8">

      {/* En-tête avec actions */}
      <div className="bg-linear-to-r from-blue-600 to-indigo-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row justify-between gap-8">
            <div className="text-white">
              <div className="flex items-center gap-4 mb-6">
                <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                  {concours.category}
                </span>
                <span className="flex items-center gap-1 text-sm opacity-90">
                  <Clock className="w-4 h-4" />
                  Mis à jour le {new Date().toLocaleDateString('fr-FR')}
                </span>
              </div>

              <h1 className="text-3xl lg:text-5xl font-bold mb-6">
                {concours.title}
              </h1>

              <div className="flex flex-wrap items-center gap-6 mb-8">
                <span className="flex items-center gap-2 text-lg">
                  <Trophy className="w-5 h-5" />
                  {concours.institution}
                </span>
                <span className="flex items-center gap-2 text-lg">
                  <MapPin className="w-5 h-5" />
                  {concours.location || concours.region || 'Côte d\'Ivoire'}
                </span>
              </div>

              <p className="text-xl text-blue-100 max-w-3xl">
                {concours.fullDescription || concours.description}
              </p>
            </div>

            {/* Actions rapides */}
            <Card
              variant="default"
              padding="lg"
              className="bg-white/10 backdrop-blur-sm border-white/20"
            >
              <div className="space-y-6">
                <div>
                  <h3 className="text-white text-lg font-semibold mb-4">Dates importantes</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center pb-3 border-b border-white/20">
                      <div>
                        <p className="text-white/90 text-sm">Date limite d'inscription</p>
                        <p className="text-white font-bold text-lg">{formatDate(concours.dateLimite)}</p>
                      </div>
                      <Calendar className="w-5 h-5 text-white/80" />
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-white/90 text-sm">Date des épreuves</p>
                        <p className="text-white font-bold text-lg">
                          {concours.dateEpreuves ? formatDate(concours.dateEpreuves) : 'À définir'}
                        </p>
                      </div>
                      <Target className="w-5 h-5 text-white/80" />
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="primary"
                    icon={Download}
                    iconOnly = {true}
                    iconPosition="left"
                    fullWidth
                    gradient
                  >
                    Télécharger PDF
                  </Button>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      icon={Share2}
                      iconOnly
                      className="text-white border-white/30 hover:bg-white/10"
                    />
                    <Button
                      variant="ghost"
                      icon={Bookmark}
                      iconOnly
                      className="text-white border-white/30 hover:bg-white/10"
                    />
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 -mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Colonne principale */}
          <div className="lg:col-span-2 space-y-8">
            {/* Section Éligibilité */}
            <Card
              variant="elevated"
              padding="lg"
              className="border-l-4 border-l-emerald-500"
            >
              <Card.Header
                icon={<AlertCircle className="h-6 w-6 text-emerald-600" />}
                title="Conditions d'éligibilité"
                subtitle="Vérifiez que vous remplissez toutes les conditions pour postuler"
              />
              
              <div className="space-y-4">
                {concours.eligibility.map((condition, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-emerald-500 mt-0.5 shrink-0" />
                    <span className="text-gray-700">{condition}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Section Documents */}
            <Card
              variant="elevated"
              padding="lg"
              className="border-l-4 border-l-blue-500"
            >
              <Card.Header
                icon={<FileText className="h-6 w-6 text-blue-600" />}
                title="Documents requis"
                subtitle="Préparez ces documents pour votre dossier de candidature"
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {concours.documents.map((doc, index) => (
                  <Card
                    key={index}
                    variant="ghost"
                    padding="sm"
                    hover
                    className="border border-gray-200"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <FileText className="h-5 w-5 text-blue-600" />
                      </div>
                      <span className="text-gray-700">{doc}</span>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>

            {/* Section Programme */}
            {concours.program && concours.program.length > 0 && (
              <Card
                variant="elevated"
                padding="lg"
                className="border-l-4 border-l-purple-500"
              >
                <Card.Header
                  icon={<BookOpen className="h-6 w-6 text-purple-600" />}
                  title="Programme des épreuves"
                  subtitle="Découvrez les matières et coefficients du concours"
                />
                
                <div className="space-y-4">
                  {concours.program.map((matiere, index) => (
                    <Card
                      key={index}
                      variant="ghost"
                      padding="lg"
                      className="border border-gray-200"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-bold text-gray-900 mb-2">{matiere.nom}</h4>
                          <p className="text-gray-600 text-sm">{matiere.description}</p>
                        </div>
                        {matiere.coefficient && (
                          <span className="px-3 py-1 bg-purple-100 text-purple-800 text-sm font-medium rounded-full">
                            Coefficient: {matiere.coefficient}
                          </span>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              </Card>
            )}

            {/* Section Quiz associés */}
            {quizzes.length > 0 && (
              <Card
                variant="elevated"
                padding="lg"
              >
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Quiz pour ce concours</h3>
                    <p className="text-gray-600">Entraînez-vous avec nos quiz spécialisés</p>
                  </div>
                  <Button
                    variant="outline"
                    icon={ExternalLink}
                    iconPosition="right"
                    href="/quiz"
                  >
                    Voir tous les quiz
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {quizzes.map((quiz) => (
                    <Card.Feature
                      key={quiz.id}
                      icon={<Target className="h-6 w-6" />}
                      title={quiz.title}
                      description={quiz.description}
                      gradient="from-orange-100 to-red-100"
                      iconColor="text-orange-600"
                    />
                  ))}
                </div>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Frais d'inscription */}
            <Card
              variant="elevated"
              padding="lg"
            >
              <Card.Header
                icon={<BarChart3 className="h-6 w-6 text-gray-600" />}
                title="Frais d'inscription"
              />
              
              <div className="text-center py-6">
                <div className="text-4xl font-bold text-gray-900 mb-2">
                  {concours.inscriptionFee > 0 ? `${concours.inscriptionFee.toLocaleString()} FCFA` : 'Gratuit'}
                </div>
                <p className="text-gray-600 mb-6">Payable en ligne ou à la banque</p>
                
                <Button
                  variant="primary"
                  fullWidth
                  gradient
                  size="lg"
                  className="mb-4"
                >
                  S'inscrire maintenant
                </Button>
                
                <Button
                  variant="outline"
                  fullWidth
                  icon={Bell}
                >
                  Recevoir des alertes
                </Button>
              </div>
            </Card>

            {/* Contacts */}
            <Card
              variant="elevated"
              padding="lg"
            >
              <Card.Header
                icon={<Users className="h-6 w-6 text-gray-600" />}
                title="Contacts & Informations"
              />
              
              <div className="space-y-4">
                {concours.contacts?.phone && (
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Phone className="h-5 w-5 text-gray-500" />
                    <a 
                      href={`tel:${concours.contacts.phone}`}
                      className="text-gray-700 hover:text-blue-600"
                    >
                      {concours.contacts.phone}
                    </a>
                  </div>
                )}
                
                {concours.contacts?.email && (
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Mail className="h-5 w-5 text-gray-500" />
                    <a 
                      href={`mailto:${concours.contacts.email}`}
                      className="text-gray-700 hover:text-blue-600"
                    >
                      {concours.contacts.email}
                    </a>
                  </div>
                )}
                
                {concours.website && (
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Globe className="h-5 w-5 text-gray-500" />
                    <a 
                      href={concours.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-700 hover:text-blue-600"
                    >
                      Site officiel
                    </a>
                  </div>
                )}
              </div>
            </Card>

            {/* Statistiques */}
            <Card
              variant="elevated"
              padding="lg"
              className="border-t-4 border-t-blue-500"
            >
              <Card.Header
                icon={<Percent className="h-6 w-6 text-blue-600" />}
                title="Statistiques du concours"
              />
              
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Places disponibles</span>
                    <span className="font-bold text-gray-900">{concours.stats.places}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-emerald-500 h-2 rounded-full"
                      style={{ width: '100%' }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Candidats attendus</span>
                    <span className="font-bold text-gray-900">
                      {concours.stats.applicants ? concours.stats.applicants.toLocaleString() : '0'}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ 
                        width: `${Math.min(100, concours.stats.applicants ? (concours.stats.applicants / 10000) * 100 : 0)}%` 
                      }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Taux de sélection</span>
                    <span className="font-bold text-gray-900">{selectionRate}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-purple-500 h-2 rounded-full"
                      style={{ width: `${Math.min(100, parseFloat(selectionRate))}%` }}
                    />
                  </div>
                </div>
              </div>
            </Card>

            {/* Timeline des dates */}
            <Card
              variant="elevated"
              padding="lg"
              className="border-t-4 border-t-orange-500"
            >
              <Card.Header
                icon={<Calendar className="h-6 w-6 text-orange-600" />}
                title="Calendrier du concours"
              />
              
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-gray-200">
                  <div>
                    <p className="text-sm text-gray-600">Ouverture des inscriptions</p>
                    <p className="font-semibold text-gray-900">
                      {concours.dateOuverture ? formatDate(concours.dateOuverture) : 'À définir'}
                    </p>
                  </div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                
                <div className="flex items-center justify-between pb-3 border-b border-gray-200">
                  <div>
                    <p className="text-sm text-gray-600">Clôture des inscriptions</p>
                    <p className="font-semibold text-gray-900">{formatDate(concours.dateLimite)}</p>
                  </div>
                  <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                </div>
                
                <div className="flex items-center justify-between pb-3 border-b border-gray-200">
                  <div>
                    <p className="text-sm text-gray-600">Épreuves écrites</p>
                    <p className="font-semibold text-gray-900">
                      {concours.dateEpreuves ? formatDate(concours.dateEpreuves) : 'À définir'}
                    </p>
                  </div>
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Publication des résultats</p>
                    <p className="font-semibold text-gray-900">
                      {concours.dateResultats ? formatDate(concours.dateResultats) : 'À définir'}
                    </p>
                  </div>
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Concours similaires */}
        {relatedConcours.length > 0 && (
          <Card
            variant="elevated"
            padding="lg"
            className="mt-8"
          >
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Concours similaires</h3>
                <p className="text-gray-600">Découvrez d'autres concours dans la même catégorie</p>
              </div>
              <Button
                variant="outline"
                icon={ChevronRight}
                iconPosition="right"
                href="/concours"
              >
                Voir tous les concours
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedConcours.map((related) => (
                <Card
                  key={related.id}
                  variant="elevated"
                  hover
                  clickable
                  className="group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        getStatusColor(related.status).includes('green') ? 'bg-green-100 text-green-800 border-green-200' :
                        getStatusColor(related.status).includes('amber') ? 'bg-amber-100 text-amber-800 border-amber-200' :
                        'bg-gray-100 text-gray-800 border-gray-200'
                      }`}>
                        {related.category}
                      </span>
                      <h4 className="font-bold text-gray-900 group-hover:text-blue-600 mt-2 mb-2">
                        {related.title}
                      </h4>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4">
                    {related.description}
                  </p>
                  
                  <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                    <div>
                      <div className="text-lg font-bold text-gray-900">
                        {related.inscriptionFee > 0 ? `${related.inscriptionFee.toLocaleString()} FCFA` : 'Gratuit'}
                      </div>
                      <div className="text-sm text-gray-500">Date limite: {formatDate(related.dateLimite)}</div>
                    </div>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      icon={Eye}
                      iconOnly
                      href={`/concours/${related.id}`}
                    />
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}