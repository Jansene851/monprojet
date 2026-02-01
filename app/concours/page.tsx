// app/concours/page.tsx
'use client';

import { useState, useMemo } from 'react';
import { Card } from '@/app/components/ui/Card';
import { Button } from '@/app/components/ui/Button';
import { 
  Search, 
  Filter, 
  Calendar, 
  Users, 
  TrendingUp, 
  BookOpen,
  GraduationCap,
  Briefcase,
  Award,
  ChevronRight,
  Clock,
  MapPin,
  Star,
  AlertCircle,
  Download,
  Share2,
  Bookmark,
  Mail,
  Bell,
  Target,
  ArrowRight,
  Eye,
  Edit,
  Heart
} from 'lucide-react';
import {
  getAllConcours,
  getConcoursStats,
  getConcoursCategories,
  searchConcours,
  formatDate,
  getStatusColor,
  getDifficultyColor,
  getPopularityColor,
  regionsData,
  type Niveau,
  type Status
} from '@/lib/data';

const niveauxData: Niveau[] = ['BAC', 'BAC+2', 'BAC+3', 'BAC+5', 'Master', 'Doctorat'];
const statutsData: Status[] = ['Inscriptions ouvertes', 'À venir', 'En cours', 'Terminé'];

export default function ConcoursPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'participants' | 'difficulte' | 'popularite'>('date');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    region: '',
    niveau: '' as Niveau | '',
    statut: '' as Status | '',
    type: ''
  });

  // Récupération des données
  const allConcours = useMemo(() => getAllConcours(), []);
  const stats = useMemo(() => getConcoursStats(), []);
  const categories = useMemo(() => getConcoursCategories(), []);

  // Filtrage et tri des concours
  const filteredConcours = useMemo(() => {
    let results = allConcours;
    
    // Filtre par catégorie
    if (selectedCategory !== 'all') {
      results = results.filter(concours => 
        concours.category.toLowerCase().includes(selectedCategory.toLowerCase())
      );
    }
    
    // Recherche textuelle
    if (searchQuery.trim()) {
      const searchTerm = searchQuery.toLowerCase();
      results = results.filter(concours => 
        concours.title.toLowerCase().includes(searchTerm) ||
        concours.institution.toLowerCase().includes(searchTerm) ||
        concours.description.toLowerCase().includes(searchTerm)
      );
    }
    
    // Filtres additionnels
    if (filters.region) {
      results = results.filter(concours => concours.region.includes(filters.region));
    }
    
    if (filters.niveau) {
      results = results.filter(concours => concours.niveau === filters.niveau);
    }
    
    if (filters.statut) {
      results = results.filter(concours => concours.status === filters.statut);
    }
    
    if (filters.type) {
      if (filters.type === 'gratuit') {
        results = results.filter(concours => concours.inscriptionFee === 0);
      } else if (filters.type === 'payant') {
        results = results.filter(concours => concours.inscriptionFee > 0);
      }
    }
    
    return results;
  }, [allConcours, selectedCategory, searchQuery, filters]);

  // Tri des concours
  const sortedConcours = useMemo(() => {
    const results = [...filteredConcours];
    
    switch (sortBy) {
      case 'date':
        return results.sort((a, b) => 
          new Date(a.dateLimite).getTime() - new Date(b.dateLimite).getTime()
        );
      case 'participants':
        return results.sort((a, b) => b.participants - a.participants);
      case 'difficulte':
        const difficultyOrder = ['Très élevée', 'Élevée', 'Moyenne'];
        return results.sort((a, b) => 
          difficultyOrder.indexOf(b.difficulte) - difficultyOrder.indexOf(a.difficulte)
        );
      case 'popularite':
        const popularityOrder = ['Très populaire', 'Populaire', 'Moyenne'];
        return results.sort((a, b) => 
          popularityOrder.indexOf(b.popularite) - popularityOrder.indexOf(a.popularite)
        );
      default:
        return results;
    }
  }, [filteredConcours, sortBy]);

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setFilters({
      region: '',
      niveau: '',
      statut: '',
      type: ''
    });
  };

  const getCategoryColor = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    return category?.color || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getLevelColor = (niveau: Niveau) => {
    const levelMap: Record<Niveau, string> = {
      'BAC': 'bg-sky-50 text-sky-700 border-sky-200',
      'BAC+2': 'bg-indigo-50 text-indigo-700 border-indigo-200',
      'BAC+3': 'bg-purple-50 text-purple-700 border-purple-200',
      'BAC+5': 'bg-pink-50 text-pink-700 border-pink-200',
      'Master': 'bg-rose-50 text-rose-700 border-rose-200',
      'Doctorat': 'bg-amber-50 text-amber-700 border-amber-200'
    };
    return levelMap[niveau] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  // Icônes pour les catégories
  const getCategoryIcon = (iconName: string) => {
    const iconMap: Record<string, React.ElementType> = {
      BookOpen: BookOpen,
      Briefcase: Briefcase,
      GraduationCap: GraduationCap,
      Users: Users,
      Award: Award,
      Star: Star
    };
    return iconMap[iconName] || BookOpen;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* En-tête */}
      <div className="bg-linear-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Concours en Côte d'Ivoire
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Trouvez et préparez les concours qui correspondent à votre parcours
            </p>
            
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="search"
                  placeholder="Rechercher un concours, une institution, une catégorie..."
                  className="w-full pl-12 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        {/* Cartes de statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card
              key={index}
              variant="elevated"
              padding="lg"
              hover
              className={`border-l-4 ${
                stat.color === 'orange' ? 'border-l-orange-500' :
                stat.color === 'blue' ? 'border-l-blue-500' :
                stat.color === 'green' ? 'border-l-green-500' :
                'border-l-purple-500'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  <p className={`text-sm mt-2 ${
                    stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change} ce mois
                  </p>
                </div>
                <div className={`p-3 rounded-lg ${
                  stat.color === 'orange' ? 'bg-orange-100 text-orange-600' :
                  stat.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                  stat.color === 'green' ? 'bg-green-100 text-green-600' :
                  'bg-purple-100 text-purple-600'
                }`}>
                  {stat.icon === 'Calendar' && <Calendar className="h-6 w-6" />}
                  {stat.icon === 'Users' && <Users className="h-6 w-6" />}
                  {stat.icon === 'TrendingUp' && <TrendingUp className="h-6 w-6" />}
                  {stat.icon === 'Award' && <Award className="h-6 w-6" />}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Catégories */}
        <Card
          variant="elevated"
          padding="lg"
          className="mb-8"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-4">Parcourir par catégorie</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {categories.map(category => {
              const IconComponent = getCategoryIcon(category.icon);
              return (
                <button
                  key={category.id}
                  className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all hover:scale-[1.02] ${
                    selectedCategory === category.id 
                      ? 'border-orange-500 bg-orange-50' 
                      : category.color + ' hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <IconComponent className="h-6 w-6 mb-2" />
                  <span className="text-sm font-medium text-center">{category.label}</span>
                  <span className="text-xs text-gray-500 mt-1">{category.count}</span>
                </button>
              );
            })}
          </div>
        </Card>

        {/* Barre d'outils */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Concours disponibles</h2>
            <p className="text-gray-600">{sortedConcours.length} concours trouvés</p>
          </div>
          
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              icon={Filter}
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
            >
              {showFilters ? 'Masquer filtres' : 'Plus de filtres'}
            </Button>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-700">Trier par :</span>
              <select 
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              >
                <option value="date">Date limite</option>
                <option value="participants">Participants</option>
                <option value="difficulte">Difficulté</option>
                <option value="popularite">Popularité</option>
              </select>
            </div>
          </div>
        </div>

        {/* Filtres avancés */}
        {showFilters && (
          <Card
            variant="elevated"
            padding="lg"
            className="mb-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Région</label>
                <select
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  value={filters.region}
                  onChange={(e) => setFilters({...filters, region: e.target.value})}
                >
                  <option value="">Toutes les régions</option>
                  {regionsData.map(region => (
                    <option key={region} value={region}>{region}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Niveau</label>
                <select
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  value={filters.niveau}
                  onChange={(e) => setFilters({...filters, niveau: e.target.value as Niveau})}
                >
                  <option value="">Tous les niveaux</option>
                  {niveauxData.map(niveau => (
                    <option key={niveau} value={niveau}>{niveau}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Statut</label>
                <select
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  value={filters.statut}
                  onChange={(e) => setFilters({...filters, statut: e.target.value as Status})}
                >
                  <option value="">Tous les statuts</option>
                  {statutsData.map(statut => (
                    <option key={statut} value={statut}>{statut}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Frais d'inscription</label>
                <select
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  value={filters.type}
                  onChange={(e) => setFilters({...filters, type: e.target.value})}
                >
                  <option value="">Tous</option>
                  <option value="gratuit">Gratuit</option>
                  <option value="payant">Payant</option>
                </select>
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <Button
                variant="outline"
                onClick={handleResetFilters}
              >
                Réinitialiser les filtres
              </Button>
            </div>
          </Card>
        )}

        {/* Liste des concours */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {sortedConcours.map(concours => (
            <Card
              key={concours.id}
              variant="elevated"
              hover
              clickable
              padding="lg"
              className="relative overflow-hidden group"
              onClick={() => window.location.href = `/concours/${concours.id}`}
            >
              {/* Accent color */}
              <div className={`absolute top-0 left-0 w-2 h-full ${concours.accentColor.replace('from-', 'bg-linear-to-b ')}`} />
              
              <div className="ml-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(concours.category.toLowerCase())}`}>
                        {concours.category}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getLevelColor(concours.niveau)}`}>
                        {concours.niveau}
                      </span>
                    </div>
                    
                    <h3 className="font-bold text-gray-900 text-lg mb-1 group-hover:text-orange-600">
                      {concours.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">{concours.description}</p>
                  </div>
                  
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      icon={Bookmark}
                      iconOnly
                      onClick={() => {
                        navigator.clipboard.writeText(`${window.location.origin}/concours/${concours.id}`);
                        alert("Lien copié !");
                      }}
                     
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      icon={Share2}
                      iconOnly
                      onClick={() => {
                        navigator.clipboard.writeText(`${window.location.origin}/concours/${concours.id}`);
                        alert("Lien copié !");
                      }}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-700">{concours.institution}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-700">{concours.region}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-700">
                      Jusqu'au {formatDate(concours.dateLimite)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-700">{concours.participants.toLocaleString()} participants</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                  <div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(concours.status)}`}>
                      {concours.status}
                    </span>
                    <div className="mt-2">
                      <span className="text-lg font-bold text-gray-900">
                        {concours.inscriptionFee > 0 ? `${concours.inscriptionFee.toLocaleString()} FCFA` : 'Gratuit'}
                      </span>
                      <span className="text-xs text-gray-500 ml-2">Frais d'inscription</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      icon={Download}
                      onClick={() => {
                        alert("Téléchargement du programme");
                      }}
                    >
                      Programme
                    </Button>
                    <Button
                      variant={concours.status === 'Inscriptions ouvertes' ? 'primary' : 'secondary'}
                      size="sm"
                      gradient={concours.status === 'Inscriptions ouvertes'}
                      onClick={() => {
                            
                        window.location.href = `/concours/${concours.id}`;
                      }}
                    >
                      {concours.status === 'Inscriptions ouvertes' ? "S'inscrire" : 'Plus d\'infos'}
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        <Card variant="ghost" padding="lg" className="mb-8">
          <div className="flex justify-center">
            <nav className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                Précédent
              </Button>
              <Button variant="primary" size="sm">
                1
              </Button>
              <Button variant="ghost" size="sm">
                2
              </Button>
              <Button variant="ghost" size="sm">
                3
              </Button>
              <span className="px-2 text-gray-400">...</span>
              <Button variant="ghost" size="sm">
                8
              </Button>
              <Button variant="outline" size="sm">
                Suivant
              </Button>
            </nav>
          </div>
        </Card>

        {/* Section d'aide */}
        <Card
          variant="gradient"
          padding="lg"
          className="mb-8 bg-linear-to-r from-blue-50 to-indigo-50 border border-blue-100"
        >
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-16 h-16 bg-linear-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-6">
              <Target className="h-8 w-8 text-white" />
            </div>
            
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Besoin d'aide pour choisir votre concours ?
            </h3>
            <p className="text-gray-600 mb-6">
              Notre outil d'orientation intelligent vous aide à trouver le concours qui correspond à votre profil.
              Obtenez des recommandations personnalisées en moins de 5 minutes.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="primary"
                size="lg"
                gradient
                icon={ChevronRight}
                iconPosition="right"
              >
                Faire le test d'orientation
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-orange-500 text-orange-600 hover:bg-orange-50"
              >
                Voir les conseils d'experts
              </Button>
            </div>
          </div>
        </Card>

        {/* Section newsletter */}
        <Card
          variant="elevated"
          padding="lg"
          className="border border-gray-200"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-linear-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <Bell className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Restez informé</h3>
                <p className="text-gray-600">Recevez des alertes pour les nouveaux concours</p>
              </div>
            </div>
            
            <div className="flex gap-3 flex-1 max-w-md">
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  placeholder="Votre adresse email"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
              <Button
                variant="success"
                gradient
                className="whitespace-nowrap"
              >
                S'abonner
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}