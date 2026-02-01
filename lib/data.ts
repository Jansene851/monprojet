// app/lib/data.ts

// Import des types
import type {
  Concours,
  Quiz,
  Question,
  UserQuizProgress,
  Category,
  Statistic,
  Niveau,
  Status,
  Difficulte,
  Popularite,
  QuizDifficulty,
  SearchFilters,
  PaginatedResult,
  QuizAttempt,
  User,
  Answer
} from './types';

export type {
  Concours,
  Quiz,
  Question,
  UserQuizProgress,
  Category,
  Statistic,
  Niveau,
  Status,
  Difficulte,
  Popularite,
  QuizDifficulty,
  SearchFilters,
  PaginatedResult,
  QuizAttempt,
  User,
  Answer
};

// Données des concours
export const concoursData: Concours[] = [
  {
    id: '1',
    title: "Concours d'entrée à l'ENA",
    institution: "École Nationale d'Administration",
    description: "Concours d'accès à la fonction publique de catégorie A",
    fullDescription: "Le concours d'entrée à l'ENA est un concours de catégorie A qui permet d'intégrer la fonction publique ivoirienne. Il s'adresse aux titulaires d'une licence ou d'un diplôme équivalent et offre une formation d'excellence en administration publique.",
    category: "Fonction publique",
    region: "Abidjan",
    niveau: "BAC+3",
    dateLimite: "2024-03-15",
    dateOuverture: "2024-01-15",
    dateEpreuves: "2024-04-15",
    dateResultats: "2024-06-15",
    inscriptionFee: 25000,
    participants: 1250,
    difficulte: "Élevée",
    popularite: "Très populaire",
    status: "Inscriptions ouvertes",
    accentColor: "from-blue-500 to-indigo-600",
    location: "Abidjan, Plateau",
    website: "https://www.ena.ci",
    contacts: {
      phone: "+225 27 20 21 22 23",
      email: "contact@ena.ci"
    },
    eligibility: [
      "Être de nationalité ivoirienne",
      "Être âgé de 18 à 35 ans",
      "Être titulaire d'une licence ou diplôme équivalent",
      "Jouir de ses droits civiques",
      "Avoir une bonne condition physique"
    ],
    documents: [
      "Photocopie de la carte nationale d'identité",
      "Photocopie du diplôme ou attestation de réussite",
      "Quatre photos d'identité récentes",
      "Certificat de visite médicale",
      "Quittance de paiement des frais de concours",
      "Curriculum vitae détaillé",
      "Lettre de motivation"
    ],
    program: [
      {
        nom: "Culture générale",
        description: "Questions sur l'histoire, la géographie et la culture ivoirienne",
        coefficient: 3
      },
      {
        nom: "Droit public",
        description: "Droit constitutionnel et administratif",
        coefficient: 2
      },
      {
        nom: "Économie",
        description: "Principes d'économie et finances publiques",
        coefficient: 2
      },
      {
        nom: "Langues",
        description: "Français et Anglais",
        coefficient: 1
      },
      {
        nom: "Épreuve orale",
        description: "Entretien avec le jury",
        coefficient: 2
      }
    ],
    stats: {
      places: 150,
      applicants: 4500,
      successRate: 3.3,
      lastYearApplicants: 4200
    }
  },
  {
    id: '2',
    title: "Concours Police Nationale",
    institution: "Ministère de l'Intérieur",
    description: "Recrutement d'officiers de police",
    fullDescription: "Le concours de la Police Nationale vise à recruter des officiers pour renforcer les effectifs de la police ivoirienne. Il comprend des épreuves écrites, physiques et un entretien.",
    category: "Recrutement",
    region: "Toute la Côte d'Ivoire",
    niveau: "BAC",
    dateLimite: "2024-04-30",
    dateOuverture: "2024-02-01",
    dateEpreuves: "2024-05-20",
    dateResultats: "2024-07-15",
    inscriptionFee: 15000,
    participants: 3200,
    difficulte: "Moyenne",
    popularite: "Populaire",
    status: "À venir",
    accentColor: "from-emerald-500 to-teal-600",
    location: "Centres régionaux",
    website: "https://www.police.ci",
    contacts: {
      phone: "+225 27 20 30 40 50",
      email: "recrutement@police.ci"
    },
    eligibility: [
      "Être de nationalité ivoirienne",
      "Être âgé de 18 à 28 ans",
      "Avoir au moins le BAC",
      "Mesurer au moins 1,70m pour les hommes et 1,65m pour les femmes",
      "Avoir une bonne condition physique"
    ],
    documents: [
      "Photocopie carte d'identité",
      "Photocopie du diplôme",
      "Certificat de nationalité",
      "Certificat médical",
      "Casier judiciaire",
      "4 photos d'identité"
    ],
    stats: {
      places: 500,
      applicants: 8500,
      successRate: 5.9,
      lastYearApplicants: 8000
    }
  },
  {
    id: '3',
    title: "Concours de Médecine",
    institution: "Université Félix Houphouët-Boigny",
    description: "Concours d'accès aux études médicales",
    fullDescription: "Concours national pour l'accès aux études de médecine, pharmacie et odontologie. Sélection rigoureuse des futurs professionnels de santé.",
    category: "Écoles",
    region: "Abidjan",
    niveau: "BAC",
    dateLimite: "2024-02-28",
    dateOuverture: "2024-01-10",
    dateEpreuves: "2024-03-15",
    dateResultats: "2024-04-30",
    inscriptionFee: 30000,
    participants: 2800,
    difficulte: "Très élevée",
    popularite: "Populaire",
    status: "En cours",
    accentColor: "from-purple-500 to-violet-600",
    location: "Cocody, Abidjan",
    website: "https://www.univ-fhb.edu.ci",
    contacts: {
      phone: "+225 27 22 44 55 66",
      email: "medecine@univ-fhb.ci"
    },
    eligibility: [
      "Être titulaire du BAC série scientifique",
      "Avoir validé la première année de médecine",
      "Être âgé de moins de 25 ans",
      "Avoir une moyenne générale supérieure à 12/20"
    ],
    documents: [
      "BAC scientifique",
      "Relevé de notes PACES",
      "Certificat de scolarité",
      "Photocopie carte d'identité",
      "4 photos d'identité"
    ],
    stats: {
      places: 300,
      applicants: 3200,
      successRate: 9.4,
      lastYearApplicants: 3000
    }
  },
  {
    id: '4',
    title: "Bourses d'Excellence",
    institution: "Ministère de l'Éducation",
    description: "Bourses pour études à l'étranger",
    fullDescription: "Programme de bourses d'excellence du gouvernement ivoirien pour poursuivre des études de master et doctorat dans les meilleures universités internationales.",
    category: "Bourses",
    region: "International",
    niveau: "BAC+5",
    dateLimite: "2024-05-15",
    dateOuverture: "2024-03-01",
    dateEpreuves: "2024-06-10",
    dateResultats: "2024-07-30",
    inscriptionFee: 0,
    participants: 850,
    difficulte: "Élevée",
    popularite: "Moyenne",
    status: "Inscriptions ouvertes",
    accentColor: "from-amber-500 to-orange-600",
    location: "Ambassades et consulats",
    website: "https://www.education.gouv.ci",
    contacts: {
      phone: "+225 27 20 30 10 20",
      email: "bourses@education.gouv.ci"
    },
    eligibility: [
      "Être ivoirien résident en Côte d'Ivoire",
      "Avoir un master avec mention Bien ou Très Bien",
      "Être âgé de moins de 35 ans",
      "Avoir une admission dans une université étrangère classée",
      "Maîtriser la langue d'enseignement"
    ],
    documents: [
      "Diplômes et relevés de notes",
      "Lettre d'admission université étrangère",
      "Projet d'études détaillé",
      "Lettres de recommandation",
      "CV académique",
      "Test de langue"
    ],
    stats: {
      places: 100,
      applicants: 1200,
      successRate: 8.3,
      lastYearApplicants: 1100
    }
  },
  {
    id: '5',
    title: "Concours Infirmiers",
    institution: "Ministère de la Santé",
    description: "Recrutement d'infirmiers d'État",
    fullDescription: "Concours de recrutement d'infirmiers d'État pour les centres de santé publics. Formation et poste garantis après réussite.",
    category: "Santé",
    region: "Toute la Côte d'Ivoire",
    niveau: "BAC+2",
    dateLimite: "2024-03-10",
    dateOuverture: "2024-01-20",
    dateEpreuves: "2024-04-05",
    dateResultats: "2024-05-20",
    inscriptionFee: 20000,
    participants: 2100,
    difficulte: "Moyenne",
    popularite: "Populaire",
    status: "Inscriptions ouvertes",
    accentColor: "from-rose-500 to-pink-600",
    location: "Centres régionaux de santé",
    website: "https://www.sante.gouv.ci",
    contacts: {
      phone: "+225 27 20 25 30 35",
      email: "infirmiers@sante.gouv.ci"
    },
    eligibility: [
      "Être titulaire du diplôme d'État d'infirmier",
      "Être âgé de 20 à 40 ans",
      "Avoir au moins 2 ans d'expérience",
      "Être en règle avec l'Ordre des infirmiers"
    ],
    documents: [
      "Diplôme d'infirmier",
      "Carte professionnelle",
      "Expériences professionnelles",
      "Certificat médical",
      "4 photos d'identité"
    ],
    stats: {
      places: 400,
      applicants: 2500,
      successRate: 16.0,
      lastYearApplicants: 2300
    }
  },
  {
    id: '6',
    title: "Concours Douanes",
    institution: "Direction Générale des Douanes",
    description: "Recrutement d'agents des douanes",
    fullDescription: "Concours de recrutement pour les services des douanes ivoiriennes. Postes variés dans les bureaux de douane à travers le pays.",
    category: "Fonction publique",
    region: "Abidjan",
    niveau: "BAC+2",
    dateLimite: "2024-04-05",
    dateOuverture: "2024-02-15",
    dateEpreuves: "2024-05-10",
    dateResultats: "2024-06-30",
    inscriptionFee: 20000,
    participants: 1800,
    difficulte: "Élevée",
    popularite: "Très populaire",
    status: "À venir",
    accentColor: "from-cyan-500 to-blue-600",
    location: "Port d'Abidjan",
    website: "https://www.douanes.ci",
    contacts: {
      phone: "+225 27 21 21 21 21",
      email: "recrutement@douanes.ci"
    },
    eligibility: [
      "Être de nationalité ivoirienne",
      "Avoir un diplôme technique (comptabilité, logistique, informatique)",
      "Être âgé de 18 à 32 ans",
      "Aucun casier judiciaire"
    ],
    documents: [
      "Diplôme et relevés",
      "Carte d'identité",
      "Certificat de nationalité",
      "Casier judiciaire",
      "Certificat médical"
    ],
    stats: {
      places: 200,
      applicants: 3000,
      successRate: 6.7,
      lastYearApplicants: 2800
    }
  },
  {
    id: '7',
    title: "Concours Magistrats",
    institution: "Ministère de la Justice",
    description: "Recrutement de magistrats",
    fullDescription: "Concours d'entrée à l'École de la Magistrature pour former les futurs juges et procureurs de la République.",
    category: "Fonction publique",
    region: "Abidjan",
    niveau: "BAC+5",
    dateLimite: "2024-03-25",
    dateOuverture: "2024-02-01",
    dateEpreuves: "2024-05-05",
    dateResultats: "2024-07-15",
    inscriptionFee: 35000,
    participants: 650,
    difficulte: "Très élevée",
    popularite: "Moyenne",
    status: "Inscriptions ouvertes",
    accentColor: "from-indigo-500 to-purple-600",
    location: "École de la Magistrature, Abidjan",
    website: "https://www.justice.gouv.ci",
    contacts: {
      phone: "+225 27 20 31 41 51",
      email: "magistrats@justice.gouv.ci"
    },
    eligibility: [
      "Être titulaire d'une maîtrise en droit",
      "Être âgé de 25 à 35 ans",
      "Avoir un casier judiciaire vierge",
      "Réussir les tests psychotechniques"
    ],
    documents: [
      "Maîtrise en droit",
      "Mémoire de recherche",
      "Lettres de recommandation",
      "CV détaillé",
      "4 photos d'identité"
    ],
    stats: {
      places: 50,
      applicants: 800,
      successRate: 6.3,
      lastYearApplicants: 750
    }
  },
  {
    id: '8',
    title: "Concours Enseignants",
    institution: "Ministère de l'Éducation Nationale",
    description: "Recrutement de professeurs du secondaire",
    fullDescription: "Concours de recrutement pour les postes d'enseignants dans les collèges et lycées publics de Côte d'Ivoire.",
    category: "Éducation",
    region: "Toute la Côte d'Ivoire",
    niveau: "BAC+3",
    dateLimite: "2024-04-20",
    dateOuverture: "2024-02-10",
    dateEpreuves: "2024-06-05",
    dateResultats: "2024-08-15",
    inscriptionFee: 15000,
    participants: 4200,
    difficulte: "Moyenne",
    popularite: "Populaire",
    status: "À venir",
    accentColor: "from-green-500 to-emerald-600",
    location: "Centres académiques régionaux",
    website: "https://www.education.gouv.ci",
    contacts: {
      phone: "+225 27 20 30 40 50",
      email: "enseignants@education.gouv.ci"
    },
    eligibility: [
      "Être titulaire d'une licence dans la matière concernée",
      "Avoir le CAPES ou diplôme équivalent",
      "Être âgé de 21 à 45 ans",
      "Avoir une bonne maîtrise pédagogique"
    ],
    documents: [
      "Diplôme de licence",
      "Diplôme pédagogique",
      "Relevés de notes",
      "Attestation de stage",
      "4 photos d'identité"
    ],
    stats: {
      places: 1200,
      applicants: 6500,
      successRate: 18.5,
      lastYearApplicants: 6000
    }
  }
];

// Données des questions pour chaque quiz
const questionsData: Record<string, Question[]> = {
  'q1': [
    {
      id: 'q1-1',
      text: "Quelle est la capitale administrative de la Côte d'Ivoire ?",
      type: 'single',
      options: [
        { id: 'a', text: "Abidjan", isCorrect: true },
        { id: 'b', text: "Yamoussoukro", isCorrect: false },
        { id: 'c', text: "Bouaké", isCorrect: false },
        { id: 'd', text: "San-Pédro", isCorrect: false }
      ],
      explanation: "Yamoussoukro est la capitale politique depuis 1983, mais Abidjan reste la capitale économique et administrative où se trouvent les principales institutions gouvernementales.",
      points: 2,
      category: "Géographie",
      difficulty: "Facile"
    },
    {
      id: 'q1-2',
      text: "Quels sont les trois pouvoirs de l'État selon la constitution ivoirienne ?",
      type: 'multiple',
      options: [
        { id: 'a', text: "Pouvoir exécutif", isCorrect: true },
        { id: 'b', text: "Pouvoir législatif", isCorrect: true },
        { id: 'c', text: "Pouvoir judiciaire", isCorrect: true },
        { id: 'd', text: "Pouvoir militaire", isCorrect: false }
      ],
      explanation: "La séparation des pouvoirs est un principe fondamental de la démocratie : exécutif (président et gouvernement), législatif (Parlement) et judiciaire (tribunaux).",
      points: 3,
      category: "Droit constitutionnel",
      difficulty: "Moyenne"
    },
    {
      id: 'q1-3',
      text: "En quelle année la Côte d'Ivoire a-t-elle obtenu son indépendance ?",
      type: 'single',
      options: [
        { id: 'a', text: "1958", isCorrect: false },
        { id: 'b', text: "1960", isCorrect: true },
        { id: 'c', text: "1962", isCorrect: false },
        { id: 'd', text: "1964", isCorrect: false }
      ],
      explanation: "La Côte d'Ivoire a obtenu son indépendance de la France le 7 août 1960 sous la présidence de Félix Houphouët-Boigny.",
      points: 1,
      category: "Histoire",
      difficulty: "Facile"
    },
    {
      id: 'q1-4',
      text: "Qui est le premier président de la République de Côte d'Ivoire ?",
      type: 'single',
      options: [
        { id: 'a', text: "Félix Houphouët-Boigny", isCorrect: true },
        { id: 'b', text: "Henri Konan Bédié", isCorrect: false },
        { id: 'c', text: "Laurent Gbagbo", isCorrect: false },
        { id: 'd', text: "Alassane Ouattara", isCorrect: false }
      ],
      explanation: "Félix Houphouët-Boigny a été le premier président de la Côte d'Ivoire de l'indépendance en 1960 jusqu'à sa mort en 1993.",
      points: 2,
      category: "Histoire",
      difficulty: "Moyenne"
    },
    {
      id: 'q1-5',
      text: "Quelle est la monnaie officielle de la Côte d'Ivoire ?",
      type: 'single',
      options: [
        { id: 'a', text: "Franc CFA (XOF)", isCorrect: true },
        { id: 'b', text: "Franc ivoirien", isCorrect: false },
        { id: 'c', text: "Dollar ouest-africain", isCorrect: false },
        { id: 'd', text: "Euro", isCorrect: false }
      ],
      explanation: "Le Franc CFA (XOF) est la monnaie commune de huit pays d'Afrique de l'Ouest membres de l'UEMOA.",
      points: 1,
      category: "Économie",
      difficulty: "Facile"
    },
    {
      id: 'q1-6',
      text: "Quels sont les principaux produits d'exportation de la Côte d'Ivoire ?",
      type: 'multiple',
      options: [
        { id: 'a', text: "Cacao", isCorrect: true },
        { id: 'b', text: "Café", isCorrect: true },
        { id: 'c', text: "Pétrole", isCorrect: true },
        { id: 'd', text: "Noix de cajou", isCorrect: true }
      ],
      explanation: "La Côte d'Ivoire est le premier producteur mondial de cacao (40% du marché), premier producteur de noix de cajou, et produit également du café, du pétrole, du caoutchouc et de l'huile de palme.",
      points: 4,
      category: "Économie",
      difficulty: "Moyenne"
    },
    {
      id: 'q1-7',
      text: "Quelle institution forme les hauts fonctionnaires en Côte d'Ivoire ?",
      type: 'single',
      options: [
        { id: 'a', text: "ENA (École Nationale d'Administration)", isCorrect: true },
        { id: 'b', text: "INP (Institut National Polytechnique)", isCorrect: false },
        { id: 'c', text: "ESATIC (École Supérieure Africaine des TIC)", isCorrect: false },
        { id: 'd', text: "ISTC (Institut des Sciences et Techniques de la Communication)", isCorrect: false }
      ],
      explanation: "L'École Nationale d'Administration (ENA) forme les cadres supérieurs de l'administration publique ivoirienne.",
      points: 2,
      category: "Institutions",
      difficulty: "Moyenne"
    },
    {
      id: 'q1-8',
      text: "Quel fleuve traverse la Côte d'Ivoire ?",
      type: 'multiple',
      options: [
        { id: 'a', text: "Bandama", isCorrect: true },
        { id: 'b', text: "Sassandra", isCorrect: true },
        { id: 'c', text: "Comoé", isCorrect: true },
        { id: 'd', text: "Niger", isCorrect: false }
      ],
      explanation: "Les trois principaux fleuves ivoiriens sont le Bandama (800 km), le Sassandra (650 km) et la Comoé (900 km). Le Niger ne traverse pas la Côte d'Ivoire.",
      points: 3,
      category: "Géographie",
      difficulty: "Moyenne"
    },
    {
      id: 'q1-9',
      text: "Quelle est la langue officielle de la Côte d'Ivoire ?",
      type: 'single',
      options: [
        { id: 'a', text: "Français", isCorrect: true },
        { id: 'b', text: "Dioula", isCorrect: false },
        { id: 'c', text: "Baoulé", isCorrect: false },
        { id: 'd', text: "Anglais", isCorrect: false }
      ],
      explanation: "Le français est la langue officielle, héritage de la période coloniale. Le dioula et le baoulé sont des langues nationales largement parlées.",
      points: 1,
      category: "Culture",
      difficulty: "Facile"
    },
    {
      id: 'q1-10',
      text: "Quels sont les pays frontaliers de la Côte d'Ivoire ?",
      type: 'multiple',
      options: [
        { id: 'a', text: "Ghana", isCorrect: true },
        { id: 'b', text: "Liberia", isCorrect: true },
        { id: 'c', text: "Guinée", isCorrect: true },
        { id: 'd', text: "Burkina Faso", isCorrect: true },
        { id: 'e', text: "Mali", isCorrect: true },
        { id: 'f', text: "Togo", isCorrect: false }
      ],
      explanation: "La Côte d'Ivoire partage ses frontières avec cinq pays : le Ghana à l'est, le Liberia et la Guinée à l'ouest, et le Mali et le Burkina Faso au nord.",
      points: 5,
      category: "Géographie",
      difficulty: "Difficile"
    }
  ],
  'q2': [
    {
      id: 'q2-1',
      text: "Quelle est la source principale du droit administratif en Côte d'Ivoire ?",
      type: 'single',
      options: [
        { id: 'a', text: "La Constitution", isCorrect: true },
        { id: 'b', text: "Le Code civil", isCorrect: false },
        { id: 'c', text: "Les coutumes locales", isCorrect: false },
        { id: 'd', text: "Le droit international", isCorrect: false }
      ],
      explanation: "La Constitution de 2016 est la norme suprême qui organise les pouvoirs publics et fixe les principes fondamentaux de l'administration.",
      points: 2,
      category: "Droit administratif",
      difficulty: "Moyenne"
    },
    {
      id: 'q2-2',
      text: "Qu'est-ce qu'un acte administratif unilatéral ?",
      type: 'single',
      options: [
        { id: 'a', text: "Une décision prise par l'administration sans accord du destinataire", isCorrect: true },
        { id: 'b', text: "Un contrat entre l'administration et un particulier", isCorrect: false },
        { id: 'c', text: "Une loi votée par le Parlement", isCorrect: false },
        { id: 'd', text: "Une décision de justice", isCorrect: false }
      ],
      explanation: "L'acte administratif unilatéral est une décision exécutoire prise par une autorité administrative, qui modifie l'ordonnancement juridique sans le consentement des destinataires.",
      points: 3,
      category: "Droit administratif",
      difficulty: "Difficile"
    },
    {
      id: 'q2-3',
      text: "Quels sont les principes de la fonction publique ivoirienne ?",
      type: 'multiple',
      options: [
        { id: 'a', text: "Égalité d'accès", isCorrect: true },
        { id: 'b', text: "Neutralité", isCorrect: true },
        { id: 'c', text: "Continuité du service public", isCorrect: true },
        { id: 'd', text: "Adaptabilité", isCorrect: true }
      ],
      explanation: "La fonction publique ivoirienne est régie par les principes d'égalité, de neutralité, de continuité et d'adaptabilité du service public.",
      points: 4,
      category: "Droit administratif",
      difficulty: "Moyenne"
    },
    {
      id: 'q2-4',
      text: "Quelle est la durée du mandat présidentiel en Côte d'Ivoire ?",
      type: 'single',
      options: [
        { id: 'a', text: "5 ans", isCorrect: true },
        { id: 'b', text: "6 ans", isCorrect: false },
        { id: 'c', text: "7 ans", isCorrect: false },
        { id: 'd', text: "4 ans", isCorrect: false }
      ],
      explanation: "Selon la Constitution de 2016, le président est élu pour un mandat de 5 ans, renouvelable une fois.",
      points: 2,
      category: "Droit constitutionnel",
      difficulty: "Facile"
    },
    {
      id: 'q2-5',
      text: "Quelle institution contrôle la constitutionnalité des lois en Côte d'Ivoire ?",
      type: 'single',
      options: [
        { id: 'a', text: "Le Conseil Constitutionnel", isCorrect: true },
        { id: 'b', text: "La Cour Suprême", isCorrect: false },
        { id: 'c', text: "L'Assemblée Nationale", isCorrect: false },
        { id: 'd', text: "Le Conseil d'État", isCorrect: false }
      ],
      explanation: "Le Conseil Constitutionnel veille au respect de la Constitution, contrôle la constitutionnalité des lois et des traités internationaux.",
      points: 3,
      category: "Institutions",
      difficulty: "Moyenne"
    }
  ],
  'q3': [
    {
      id: 'q3-1',
      text: "Qu'est-ce que le PIB ?",
      type: 'single',
      options: [
        { id: 'a', text: "Produit Intérieur Brut", isCorrect: true },
        { id: 'b', text: "Produit International Brut", isCorrect: false },
        { id: 'c', text: "Programme d'Investissement Budgetaire", isCorrect: false },
        { id: 'd', text: "Plan Intégré de Budget", isCorrect: false }
      ],
      explanation: "Le PIB mesure la valeur totale de la production de richesses (biens et services) réalisée à l'intérieur d'un pays pendant une période donnée.",
      points: 1,
      category: "Économie",
      difficulty: "Facile"
    },
    {
      id: 'q3-2',
      text: "Quels sont les instruments de la politique monétaire ?",
      type: 'multiple',
      options: [
        { id: 'a', text: "Taux d'intérêt directeur", isCorrect: true },
        { id: 'b', text: "Réserves obligatoires", isCorrect: true },
        { id: 'c', text: "Opérations d'open market", isCorrect: true },
        { id: 'd', text: "Contrôle des changes", isCorrect: false }
      ],
      explanation: "Les principales instruments sont les taux directeurs, les réserves obligatoires et les opérations d'open market. Le contrôle des changes est une mesure exceptionnelle.",
      points: 4,
      category: "Économie",
      difficulty: "Difficile"
    }
  ],
  'q4': [
    {
      id: 'q4-1',
      text: "Quelle est la suite logique : 2, 4, 8, 16, ... ?",
      type: 'single',
      options: [
        { id: 'a', text: "32", isCorrect: true },
        { id: 'b', text: "24", isCorrect: false },
        { id: 'c', text: "18", isCorrect: false },
        { id: 'd', text: "20", isCorrect: false }
      ],
      explanation: "Chaque nombre est multiplié par 2 : 2×2=4, 4×2=8, 8×2=16, donc 16×2=32.",
      points: 2,
      category: "Logique",
      difficulty: "Facile"
    },
    {
      id: 'q4-2',
      text: "Si tous les chats sont des mammifères et que Félix est un chat, alors :",
      type: 'single',
      options: [
        { id: 'a', text: "Félix est un mammifère", isCorrect: true },
        { id: 'b', text: "Tous les mammifères sont des chats", isCorrect: false },
        { id: 'c', text: "Félix n'est pas un mammifère", isCorrect: false },
        { id: 'd', text: "Aucune des réponses ci-dessus", isCorrect: false }
      ],
      explanation: "D'après le syllogisme aristotélicien : si A⊂B et x∈A, alors x∈B.",
      points: 3,
      category: "Logique",
      difficulty: "Moyenne"
    }
  ]
};

// Données des quiz
export const quizData: Quiz[] = [
  {
    id: 'q1',
    title: "Culture générale - ENA",
    description: "Testez vos connaissances en culture générale pour le concours ENA",
    concoursId: '1',
    questions: questionsData['q1']?.length || 10,
    duration: 45,
    difficulty: "Moyenne",
    category: "Culture générale",
    completed: 1250,
    averageScore: 72,
    topics: ["Histoire", "Géographie", "Culture ivoirienne", "Actualités"],
    tags: ["ENA", "Fonction publique", "Concours A"],
    featured: true,
    createdAt: "2024-01-01",
    updatedAt: "2024-01-15",
    instructions: "Ce quiz comporte 10 questions à choix multiples. Vous avez 45 minutes. Répondez avec précision !"
  },
  {
    id: 'q2',
    title: "Droit public et constitutionnel",
    description: "Questions sur le droit public et constitutionnel ivoirien",
    concoursId: '1',
    questions: questionsData['q2']?.length || 5,
    duration: 60,
    difficulty: "Difficile",
    category: "Droit",
    completed: 890,
    averageScore: 65,
    topics: ["Constitution", "Droit administratif", "Institutions", "Droits fondamentaux"],
    tags: ["Droit", "Constitution", "Administratif"],
    createdAt: "2024-01-02",
    updatedAt: "2024-01-16",
    instructions: "Quiz de niveau avancé en droit public. Attention aux questions à choix multiples.",
    featured: false
  },
  {
    id: 'q3',
    title: "Économie et finances publiques",
    description: "Quiz sur les principes économiques et les finances publiques",
    concoursId: '1',
    questions: questionsData['q3']?.length || 2,
    duration: 40,
    difficulty: "Moyenne",
    category: "Économie",
    completed: 1050,
    averageScore: 68,
    topics: ["Macroéconomie", "Finances publiques", "Budget", "Développement économique"],
    tags: ["Économie", "Finances", "Budget"],
    createdAt: "2024-01-03",
    updatedAt: "2024-01-17",
    instructions: "Questions sur les concepts économiques fondamentaux",
    featured: false
  },
  {
    id: 'q4',
    title: "Tests psychotechniques Police",
    description: "Entraînement aux tests psychotechniques pour la Police Nationale",
    concoursId: '2',
    questions: questionsData['q4']?.length || 2,
    duration: 50,
    difficulty: "Facile",
    category: "Psychotechnique",
    completed: 3200,
    averageScore: 78,
    topics: ["Logique", "Attention", "Mémoire", "Raisonnement"],
    tags: ["Police", "Psychotechnique", "Tests"],
    featured: true,
    createdAt: "2024-01-04",
    updatedAt: "2024-01-18",
    instructions: "Entraînez-vous aux tests de logique et de raisonnement"
  },
  // ... autres quiz existants
];
// Données de progression utilisateur
// Données de progression utilisateur
export const userQuizProgress: UserQuizProgress = {
  userId: 'user-123',
  completedQuizzes: ['q1', 'q2', 'q4'],
  attemptedQuizzes: [
    {
      id: 'att1',
      userId: 'user-123',
      quizId: 'q1',
      score: 85,
      totalQuestions: 25,
      correctAnswers: 21,
      timeSpent: 1800,
      answers: [],
      completedAt: '2024-01-20T14:30:00Z',
      startedAt: '2024-01-20T14:00:00Z'
    },
    {
      id: 'att2',
      userId: 'user-123',
      quizId: 'q2',
      score: 65,
      totalQuestions: 30,
      correctAnswers: 19,
      timeSpent: 2400,
      answers: [],
      completedAt: '2024-01-22T10:15:00Z',
      startedAt: '2024-01-22T09:35:00Z'
    },
    {
      id: 'att3',
      userId: 'user-123',
      quizId: 'q4',
      score: 78,
      totalQuestions: 40,
      correctAnswers: 31,
      timeSpent: 1500,
      answers: [],
      completedAt: '2024-01-25T16:45:00Z',
      startedAt: '2024-01-25T16:20:00Z'
    }
  ],
  averageScore: 76,
  totalTimeSpent: 5700,
  streak: 7,
  lastActive: '2024-01-25',
  level: 5,
  experience: 1250,
  nextLevelExperience: 2000,
  achievements: ['first-quiz', 'streak-7-days', 'quick-learner'],
  weakAreas: ['Droit constitutionnel', 'Mathématiques avancées', 'Anatomie'],
  strongAreas: ['Culture générale', 'Logique', 'Anglais'],
  recommendedQuizzes: ['q3', 'q6', 'q8', 'q9'],
  categoriesProgress: [
    { category: 'Culture générale', completed: 3, total: 5, averageScore: 80 },
    { category: 'Droit', completed: 1, total: 3, averageScore: 65 },
    { category: 'Psychotechnique', completed: 1, total: 2, averageScore: 78 },
    { category: 'Mathématiques', completed: 0, total: 4, averageScore: 0 }
  ],
  dailyGoals: { quizzes: 2, time: 30, streak: true },
  stats: {
    totalQuizzes: 12,
    totalQuestions: 300,
    correctAnswers: 225,
    accuracy: 75,
    averageTimePerQuestion: 45,
    bestScore: 95,
    bestScoreQuizId: 'q1',
    fastestCompletion: 900,
    fastestCompletionQuizId: 'q4'
  }
};


// Données utilisateur
export const userData: User = {
  id: 'user-123',
  email: 'etudiant@example.com',
  name: 'Jean Koffi',
  profileImage: '/avatars/user-123.jpg',
  role: 'student',
  preferences: {
    notifications: true,
    emailUpdates: true,
    region: 'Abidjan',
    categories: ['Fonction publique', 'Éducation'],
    difficulty: ['Moyenne', 'Difficile']
  },
  stats: {
    quizzesCompleted: 12,
    averageScore: 75,
    streak: 7,
    totalStudyTime: 45
  },
  createdAt: '2023-12-01T10:00:00Z',
  updatedAt: '2024-01-25T16:45:00Z'
}

// Catégories de concours
export const categoriesData: Category[] = [
  { 
    id: 'all', 
    label: 'Tous les concours', 
    count: 8,
    color: 'bg-gray-100 text-gray-800 border-gray-200',
    icon: 'BookOpen',
    description: 'Tous les concours disponibles'
  },
  { 
    id: 'fonction-publique', 
    label: 'Fonction publique', 
    count: 3,
    color: 'bg-blue-50 text-blue-700 border-blue-200',
    icon: 'Briefcase',
    description: 'Concours de la fonction publique'
  },
  { 
    id: 'ecoles', 
    label: 'Écoles', 
    count: 1,
    color: 'bg-purple-50 text-purple-700 border-purple-200',
    icon: 'GraduationCap',
    description: 'Concours des grandes écoles'
  },
  { 
    id: 'recrutement', 
    label: 'Recrutement', 
    count: 1,
    color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    icon: 'Users',
    description: 'Concours de recrutement'
  },
  { 
    id: 'bourses', 
    label: 'Bourses', 
    count: 1,
    color: 'bg-amber-50 text-amber-700 border-amber-200',
    icon: 'Award',
    description: 'Bourses d\'études'
  },
  { 
    id: 'sante', 
    label: 'Santé', 
    count: 1,
    color: 'bg-rose-50 text-rose-700 border-rose-200',
    icon: 'Star',
    description: 'Concours du secteur santé'
  },
  { 
    id: 'education', 
    label: 'Éducation', 
    count: 1,
    color: 'bg-green-50 text-green-700 border-green-200',
    icon: 'Book',
    description: 'Concours de l\'éducation nationale'
  }
];

// Statistiques globales
export const statsData: Statistic[] = [
  {
    title: "Concours actifs",
    value: "8",
    change: "+2",
    icon: "Calendar",
    color: "blue",
    description: "Concours avec inscriptions ouvertes"
  },
  {
    title: "Participants total",
    value: "15.8K",
    change: "+8%",
    icon: "Users",
    color: "green",
    description: "Total des participants aux concours"
  },
  {
    title: "Taux de réussite",
    value: "9.2%",
    change: "+1.2%",
    icon: "TrendingUp",
    color: "purple",
    description: "Moyenne des taux de réussite"
  },
  {
    title: "Quiz disponibles",
    value: "12",
    change: "+3",
    icon: "Award",
    color: "orange",
    description: "Nombre total de quiz"
  }
];

// Régions disponibles
export const regionsData: string[] = [
  'Abidjan', 'Bouaké', 'Daloa', 'Korhogo', 'Man', 'San-Pédro', 
  'Toute la Côte d\'Ivoire', 'International'
];

// Niveaux disponibles
export const niveauxData: Niveau[] = ['BAC', 'BAC+2', 'BAC+3', 'BAC+5', 'Master', 'Doctorat'];

// Catégories de quiz
export const quizCategories: string[] = [
  'Tous',
  'Culture générale',
  'Droit',
  'Économie',
  'Mathématiques',
  'Psychotechnique',
  'Médecine',
  'Langues'
];

// Difficultés de quiz
export const quizDifficulties: QuizDifficulty[] = ['Facile', 'Moyenne', 'Difficile', 'Expert'];

// Status disponibles
export const statusesData: Status[] = ['Inscriptions ouvertes', 'À venir', 'En cours', 'Terminé'];

// Popularité disponible
export const populariteData: Popularite[] = ['Très populaire', 'Populaire', 'Moyenne'];

// Difficulté disponible
export const difficulteData: Difficulte[] = ['Très élevée', 'Élevée', 'Moyenne'];

export const getShuffledQuizQuestions = (
  quizId: string, 
  options: { shuffleQuestions: boolean; shuffleOptions: boolean; }
): Question[] => {
  const questions = questionsData[quizId] || [];
  if (questions.length === 0) return [];
  // Deep clone to avoid mutating original data
  let result = JSON.parse(JSON.stringify(questions)) as Question[];
  if (options.shuffleQuestions) {
    result = shuffleArray(result);
  }
  if (options.shuffleOptions) {
    result = result.map(q => ({
      ...q,
      options: shuffleArray(q.options)
    }));
  }
  return result;
};
/**
 * Vérifie si les options sélectionnées sont correctes pour une question donnée
 * @param question L'objet Question à vérifier
 * @param selectedOptions Les options sélectionnées par l'utilisateur (tableau d'IDs)
 * @returns Un objet { isCorrect: boolean } indiquant si la réponse est correcte
 */
export function checkAnswer(
  question: Question,
  selectedOptions: string[]
): { isCorrect: boolean } {
  if (!question || !question.options) {
    console.error('Question invalide ou sans options');
    return { isCorrect: false };
  }

  // Récupérer toutes les options correctes
  const correctOptions = question.options
    .filter(option => option.isCorrect)
    .map(option => option.id);

  // Si aucun option correcte n'est définie
  if (correctOptions.length === 0) {
    console.error('Aucune option correcte définie pour cette question');
    return { isCorrect: false };
  }

  // Pour les questions à choix unique
  if (question.type === 'single') {
    if (selectedOptions.length !== 1) {
      return { isCorrect: false };
    }
    
    // Vérifier si l'option sélectionnée est correcte
    const isCorrect = correctOptions.includes(selectedOptions[0]);
    return { isCorrect };
  }
  
  // Pour les questions à choix multiples
  if (question.type === 'multiple') {
    // Vérifier si toutes les bonnes réponses sont sélectionnées
    const allCorrectSelected = correctOptions.every(correctId => 
      selectedOptions.includes(correctId)
    );
    
    // Vérifier si seules les bonnes réponses sont sélectionnées (pas de mauvaises)
    const noIncorrectSelected = selectedOptions.every(selectedId =>
      correctOptions.includes(selectedId)
    );
    
    const isCorrect = allCorrectSelected && noIncorrectSelected;
    return { isCorrect };
  }
  
  // Pour les questions texte (si jamais implémentées)
  // Pour l'instant, retourner false
  return { isCorrect: false };
}
function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}


// ============================
// FONCTIONS UTILITAIRES
// ============================

/**
 * Récupère tous les concours
 */
export function getAllConcours(): Concours[] {
  return concoursData;
}

/**
 * Récupère un concours par son ID
 */
export function getConcoursById(id: string): Concours | undefined {
  return concoursData.find(concours => concours.id === id);
}

  

// Fonction pour obtenir les questions d'un quiz
export function getQuizQuestions(quizId: string): Question[] {
  return questionsData[quizId] || [];
}

/**
 * Récupère les concours similaires (même catégorie)
 */
export function getRelatedConcours(id: string, limit: number = 3): Concours[] {
  const concours = getConcoursById(id);
  if (!concours) return [];
  
  return concoursData
    .filter(c => c.id !== id && c.category === concours.category)
    .slice(0, limit);
}

/**
 * Récupère tous les quiz
 */
export function getAllQuizzes(): Quiz[] {
  return quizData;
}

/**
 * Récupère un quiz par son ID
 */
export function getQuizById(id: string): Quiz | undefined {
  return quizData.find(quiz => quiz.id === id);
}

/**
 * Récupère les quiz pour un concours
 */
export function getConcoursQuizzes(concoursId: string): Quiz[] {
  return quizData.filter(quiz => quiz.concoursId === concoursId);
}

/**
 * Récupère les quiz par catégorie
 */
export function getQuizzesByCategory(category: string): Quiz[] {
  if (category === 'Tous') return quizData;
  return quizData.filter(quiz => quiz.category === category);
}

/**
 * Récupère les quiz par difficulté
 */
export function getQuizzesByDifficulty(difficulty: string): Quiz[] {
  if (difficulty === 'Tous') return quizData;
  return quizData.filter(quiz => quiz.difficulty === difficulty);
}

/**
 * Récupère les quiz populaires
 */
export function getPopularQuizzes(limit: number = 6): Quiz[] {
  return [...quizData]
    .sort((a, b) => b.completed - a.completed)
    .slice(0, limit);
}

/**
 * Récupère les quiz en vedette
 */
export function getFeaturedQuizzes(): Quiz[] {
  return quizData.filter(quiz => quiz.featured);
}

/**
 * Récupère les statistiques globales
 */
export function getConcoursStats(): Statistic[] {
  return statsData;
}

/**
 * Récupère toutes les catégories
 */
export function getConcoursCategories(): Category[] {
  return categoriesData;
}

/**
 * Récupère les catégories de quiz
 */
export function getQuizCategories(): string[] {
  return quizCategories;
}

/**
 * Récupère les difficultés de quiz
 */
export function getQuizDifficulties(): string[] {
  return ['Tous', ...quizDifficulties];
}

/**
 * Récupère la progression utilisateur
 */
export function getUserQuizProgress(): UserQuizProgress {
  return userQuizProgress;
}

/**
 * Récupère les statistiques des quiz
 */
export function getQuizStatistics() {
  const totalQuizzes = quizData.length;
  const totalQuestions = quizData.reduce((sum, quiz) => sum + quiz.questions, 0);
  const totalAttempts = quizData.reduce((sum, quiz) => sum + quiz.completed, 0);
  const averageScore = totalQuizzes > 0 
    ? quizData.reduce((sum, quiz) => sum + quiz.averageScore, 0) / totalQuizzes 
    : 0;

  const categories = Array.from(new Set(quizData.map(q => q.category))).map(category => {
    const categoryQuizzes = quizData.filter(q => q.category === category);
    const count = categoryQuizzes.length;
    const categoryAverageScore = count > 0 
      ? categoryQuizzes.reduce((sum, q) => sum + q.averageScore, 0) / count 
      : 0;

    return {
      name: category,
      count,
      averageScore: Math.round(categoryAverageScore)
    };
  });

  return {
    totalQuizzes,
    totalQuestions,
    totalAttempts,
    averageScore: Math.round(averageScore),
    categories
  };
}

/**
 * Recherche de concours
 */
export function searchConcours(query: string, filters?: {
  category?: string;
  region?: string;
  niveau?: string;
  status?: string;
  difficulty?: string;
  popularite?: string;
}): Concours[] {
  let results = concoursData;
  
  // Filtre par recherche textuelle
  if (query.trim()) {
    const searchTerm = query.toLowerCase();
    results = results.filter(concours => 
      concours.title.toLowerCase().includes(searchTerm) ||
      concours.institution.toLowerCase().includes(searchTerm) ||
      concours.description.toLowerCase().includes(searchTerm) ||
      (concours.fullDescription && concours.fullDescription.toLowerCase().includes(searchTerm)) ||
      (concours.tags && concours.tags.some(tag => tag.toLowerCase().includes(searchTerm)))
    );
  }
  
  // Filtres additionnels
  if (filters) {
    if (filters.category && filters.category !== 'all') {
      results = results.filter(concours => 
        concours.category.toLowerCase() === filters.category?.toLowerCase()
      );
    }
    
    if (filters.region) {
      results = results.filter(concours => 
        concours.region === filters.region
      );
    }
    
    if (filters.niveau) {
      results = results.filter(concours => 
        concours.niveau === filters.niveau
      );
    }
    
    if (filters.status) {
      results = results.filter(concours => 
        concours.status === filters.status
      );
    }
    
    if (filters.difficulty) {
      results = results.filter(concours => 
        concours.difficulte === filters.difficulty
      );
    }
    
    if (filters.popularite) {
      results = results.filter(concours => 
        concours.popularite === filters.popularite
      );
    }
  }
  
  return results;
}


/**
 * Recherche de quiz
 */
export function searchQuizzes(query: string, filters?: {
  category?: string;
  difficulty?: string;
  concoursId?: string;
}): Quiz[] {
  let results = quizData;

  if (query.trim()) {
    const searchTerm = query.toLowerCase();
    results = results.filter(quiz =>
      quiz.title.toLowerCase().includes(searchTerm) ||
      quiz.description.toLowerCase().includes(searchTerm) ||
      quiz.topics.some(topic => topic.toLowerCase().includes(searchTerm)) ||
      (quiz.tags && quiz.tags.some(tag => tag.toLowerCase().includes(searchTerm)))
    );
  }

  if (filters?.category && filters.category !== 'Tous') {
    results = results.filter(quiz => quiz.category === filters.category);
  }

  if (filters?.difficulty && filters.difficulty !== 'Tous') {
    results = results.filter(quiz => quiz.difficulty === filters.difficulty);
  }

  if (filters?.concoursId) {
    results = results.filter(quiz => quiz.concoursId === filters.concoursId);
  }

  return results;
}
/**
 * Récupère les concours par catégorie
 */
export function getConcoursByCategory(categoryId: string): Concours[] {
  if (categoryId === 'all') return concoursData;
  
  const category = categoriesData.find(c => c.id === categoryId);
  if (!category) return [];
  
  return concoursData.filter(concours => 
    concours.category.toLowerCase().includes(category.label.toLowerCase())
  );
}

/**
 * Récupère les concours par statut
 */
export function getConcoursByStatus(status: Status): Concours[] {
  return concoursData.filter(concours => concours.status === status);
}

/**
 * Récupère les concours à venir (date limite dans le futur)
 */
export function getUpcomingConcours(): Concours[] {
  const today = new Date().toISOString().split('T')[0]; // Format YYYY-MM-DD
  return concoursData
    .filter(concours => concours.dateLimite >= today)
    .sort((a, b) => 
      new Date(a.dateLimite).getTime() - new Date(b.dateLimite).getTime()
    );
}

/**
 * Récupère les concours urgents (moins de 7 jours)
 */
export function getUrgentConcours(): Concours[] {
  const today = new Date();
  return concoursData.filter(concours => {
    const deadline = new Date(concours.dateLimite);
    const diffTime = deadline.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7 && diffDays >= 0;
  });
}
/**
 * Récupère les concours populaires
 */
export function getPopularConcours(limit: number = 6): Concours[] {
  const popularityOrder = ['Très populaire', 'Populaire', 'Moyenne'];
  
  return [...concoursData]
    .filter(c => getDaysRemaining(c.dateLimite) >= 0) // Only upcoming or current
    .sort((a, b) => {
      const aIndex = popularityOrder.indexOf(a.popularite);
      const bIndex = popularityOrder.indexOf(b.popularite);
      return bIndex - aIndex; // Higher popularity first
    })
    .slice(0, limit);
}


/**
 * Récupère les tendances des concours
 */
export function getTrendingConcours(): { category: string; count: number; trend: number }[] {
  const categoryCounts = concoursData.reduce((acc, concours) => {
    acc[concours.category] = (acc[concours.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  return Object.entries(categoryCounts)
    .map(([category, count]) => ({
      category,
      count,
      trend: Math.floor(Math.random() * 20) + 5 // Simulation de tendance
    }))
    .sort((a, b) => b.count - a.count);
}

/**
 * Formate une date pour l'affichage
 */
export function formatDate(dateString: string, includeTime: boolean = false): string {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  };
  
  if (includeTime) {
    options.hour = '2-digit';
    options.minute = '2-digit';
  }
  
  return date.toLocaleDateString('fr-FR', options);
}

/**
 * Calcule les jours restants avant une date
 */
export function getDaysRemaining(dateString: string): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const targetDate = new Date(dateString);
  targetDate.setHours(0, 0, 0, 0);
  
  const diffTime = targetDate.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}


/**
 * Vérifie si un concours est urgent (moins de 7 jours restants)
 */
export function isConcoursUrgent(concours: Concours): boolean {
  return getDaysRemaining(concours.dateLimite) <= 7 && getDaysRemaining(concours.dateLimite) >= 0;
}

/**
 * Obtient la couleur de statut pour un concours
 */
export function getStatusColor(status: Status): string {
  switch (status) {
    case 'Inscriptions ouvertes': return 'bg-green-100 text-green-800 border-green-200';
    case 'À venir': return 'bg-amber-100 text-amber-800 border-amber-200';
    case 'En cours': return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'Terminé': return 'bg-gray-100 text-gray-800 border-gray-200';
    default: return 'bg-gray-100 text-gray-800 border-gray-200';
  }
}

/**
 * Obtient la couleur de difficulté pour les concours
 */
export function getDifficultyColor(difficulte: Difficulte): string {
  switch (difficulte) {
    case 'Très élevée': return 'bg-red-100 text-red-800 border-red-200';
    case 'Élevée': return 'bg-orange-100 text-orange-800 border-orange-200';
    case 'Moyenne': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    default: return 'bg-gray-100 text-gray-800 border-gray-200';
  }
}

/**
 * Obtient la couleur de popularité
 */
export function getPopularityColor(popularite: Popularite): string {
  switch (popularite) {
    case 'Très populaire': return 'bg-purple-100 text-purple-800 border-purple-200';
    case 'Populaire': return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'Moyenne': return 'bg-gray-100 text-gray-800 border-gray-200';
    default: return 'bg-gray-100 text-gray-800 border-gray-200';
  }
}

/**
 * Récupère les statistiques globales pour le dashboard
 */
export function getQuizDifficultyColor(difficulty: QuizDifficulty): string {
  switch (difficulty) {
    case 'Expert': return 'bg-red-100 text-red-800 border-red-200';
    case 'Difficile': return 'bg-orange-100 text-orange-800 border-orange-200';
    case 'Moyenne': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'Facile': return 'bg-green-100 text-green-800 border-green-200';
    default: return 'bg-gray-100 text-gray-800 border-gray-200';
  }
}

/**
 * Récupère les statistiques globales pour le dashboard
 */
export function getDashboardStats() {
  const urgentCount = getUrgentConcours().length;
  const openCount = concoursData.filter(c => c.status === 'Inscriptions ouvertes').length;
  const totalParticipants = concoursData.reduce((sum, c) => sum + c.participants, 0);
  const averageRate = concoursData.length > 0 
    ? concoursData.reduce((sum, c) => sum + c.stats.successRate, 0) / concoursData.length 
    : 0;
  const totalQuizzes = quizData.length;
  const quizParticipants = quizData.reduce((sum, q) => sum + q.completed, 0);

  return {
    urgentCount,
    openCount,
    totalParticipants,
    averageRate: Math.round(averageRate * 10) / 10,
    totalQuizzes,
    quizParticipants,
    totalConcours: concoursData.length,
    featuredQuizzes: quizData.filter(q => q.featured).length
  };
}

// Nouvelles fonctions pour les quiz
export function getQuizWithQuestions(quizId: string): (Omit<Quiz, 'questions'> & { questions: Question[] }) | undefined {
  const quiz = getQuizById(quizId);
  if (!quiz) return undefined;
  
  return {
    ...quiz,
    questions: getQuizQuestions(quizId)
  };
}

export function calculateQuizScore(answers: Answer[], questions: Question[]): {
  score: number;
  totalPoints: number;
  percentage: number;
  correctAnswers: number;
  detailedResults: Array<{
    questionId: string;
    correct: boolean;
    pointsEarned: number;
    correctOptions: string[];
  }>;
} {
  let totalPoints = 0;
  let earnedPoints = 0;
  let correctCount = 0;
  
  const detailedResults = questions.map(question => {
    totalPoints += question.points;
    
    const userAnswer = answers.find(a => a.questionId === question.id);
    const correctOptions = question.options.filter(opt => opt.isCorrect).map(opt => opt.id);
    
    let isCorrect = false;
    let pointsEarned = 0;
    
    if (userAnswer) {
      const userSelected = Array.isArray(userAnswer.selectedOptions) 
        ? userAnswer.selectedOptions 
        : [userAnswer.selectedOptions];
      
      const allCorrect = correctOptions.every(opt => userSelected.includes(opt));
      const noIncorrect = userSelected.every(opt => correctOptions.includes(opt));
      
      if (question.type === 'single') {
        isCorrect = allCorrect && userSelected.length === 1;
      } else {
        isCorrect = allCorrect && noIncorrect;
      }
      
      if (isCorrect) {
        pointsEarned = question.points;
        earnedPoints += question.points;
        correctCount++;
      }
    }
    
    return {
      questionId: question.id,
      correct: isCorrect,
      pointsEarned,
      correctOptions
    };
  });
  
  const percentage = totalPoints > 0 ? Math.round((earnedPoints / totalPoints) * 100) : 0;
  
  return {
    score: earnedPoints,
    totalPoints,
    percentage,
    correctAnswers: correctCount,
    detailedResults
  };
}

export function getRecommendedQuizzes(userId: string, limit: number = 4): Quiz[] {
  const userProgress = getUserQuizProgress();
  const completedIds = userProgress.completedQuizzes;
  
  // Recommander des quiz non complétés dans les catégories où l'utilisateur performe bien
  const strongCategories = userProgress.strongAreas || [];
  
  return quizData
    .filter(quiz => !completedIds.includes(quiz.id))
    .sort((a, b) => {
      // Priorité aux quiz dans les catégories fortes
      const aInStrong = strongCategories.some(cat => 
        a.category.toLowerCase().includes(cat.toLowerCase())
      );
      const bInStrong = strongCategories.some(cat => 
        b.category.toLowerCase().includes(cat.toLowerCase())
      );
      
      if (aInStrong && !bInStrong) return -1;
      if (!aInStrong && bInStrong) return 1;
      
      // Sinon par popularité
      return b.completed - a.completed;
    })
    .slice(0, limit);
}

export function getQuizAnalytics(quizId: string) {
  const quiz = getQuizById(quizId);
  if (!quiz) return null;
  
  const questions = getQuizQuestions(quizId);
  const totalAttempts = quiz.completed;
  
  // Simuler des données analytiques
  const questionStats = questions.map((q, index) => ({
    questionNumber: index + 1,
    difficulty: q.difficulty,
    correctRate: Math.floor(Math.random() * 30) + 60, // Simulation
    averageTime: Math.floor(Math.random() * 90) + 30 // Simulation en secondes
  }));
  
  const timeDistribution = [
    { range: "0-20 min", count: Math.floor(totalAttempts * 0.2) },
    { range: "20-40 min", count: Math.floor(totalAttempts * 0.5) },
    { range: "40-60 min", count: Math.floor(totalAttempts * 0.3) }
  ];
  
  const scoreDistribution = [
    { range: "0-40%", count: Math.floor(totalAttempts * 0.1) },
    { range: "40-60%", count: Math.floor(totalAttempts * 0.2) },
    { range: "60-80%", count: Math.floor(totalAttempts * 0.4) },
    { range: "80-100%", count: Math.floor(totalAttempts * 0.3) }
  ];
  
  return {
    quizId,
    totalAttempts,
    averageScore: quiz.averageScore,
    averageTime: Math.floor(quiz.duration * 0.7), // 70% du temps alloué
    questionStats,
    timeDistribution,
    scoreDistribution,
    completionRate: Math.floor((totalAttempts / 5000) * 100) // Simulation
  };
}

/**
 * Mise à jour de la progression du quiz
 */
export async function updateQuizProgress(
  quizId: string,
  score: number,
  timeSpent: number,
  answers: any[]
): Promise<UserQuizProgress> {
  // Simulation de mise à jour
  const updatedProgress = { ...userQuizProgress };
  
  if (!updatedProgress.completedQuizzes.includes(quizId)) {
    updatedProgress.completedQuizzes.push(quizId);
  }

  const existingAttempt = updatedProgress.attemptedQuizzes.find(a => a.quizId === quizId);
  const quiz = getQuizById(quizId);
  const totalQuestions = quiz?.questions || 0;
  
  if (existingAttempt) {
    // Update existing attempt if new score is higher
    if (score > existingAttempt.score) {
      existingAttempt.score = score;
      existingAttempt.correctAnswers = Math.floor((score / 100) * totalQuestions);
      existingAttempt.timeSpent = timeSpent;
      existingAttempt.answers = answers;
      existingAttempt.completedAt = new Date().toISOString();
    }
  } else {
    // Create new attempt
    updatedProgress.attemptedQuizzes.push({
      id: `att-${Date.now()}`,
      userId: updatedProgress.userId,
      quizId,
      score,
      totalQuestions,
      correctAnswers: Math.floor((score / 100) * totalQuestions),
      timeSpent,
      answers,
      completedAt: new Date().toISOString(),
      startedAt: new Date(Date.now() - timeSpent * 1000).toISOString()
    });
  }

  // Recalculer la moyenne
  const totalScore = updatedProgress.attemptedQuizzes.reduce((sum, a) => sum + a.score, 0);
  updatedProgress.averageScore = Math.round(totalScore / updatedProgress.attemptedQuizzes.length);

  updatedProgress.totalTimeSpent += timeSpent;
  
  // Mettre à jour la dernière activité
  updatedProgress.lastActive = new Date().toISOString().split('T')[0];
  
  // Augmenter l'expérience
  updatedProgress.experience += Math.floor(score * 10);
  
  // Vérifier si l'utilisateur passe au niveau supérieur
  if (updatedProgress.experience >= updatedProgress.nextLevelExperience) {
    updatedProgress.level += 1;
    updatedProgress.experience = updatedProgress.experience - updatedProgress.nextLevelExperience;
    updatedProgress.nextLevelExperience = Math.floor(updatedProgress.nextLevelExperience * 1.5);
  }

  return updatedProgress;
}
/**
 * Pagination générique
 */
export function paginate<T>(
  items: T[],
  page: number = 1,
  limit: number = 10
): PaginatedResult<T> {
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const total = items.length;
  
  return {
    data: items.slice(startIndex, endIndex),
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      hasNext: endIndex < total,
      hasPrevious: page > 1
    }
  };
}

/**
 * Recherche avancée avec pagination
 */
export function searchConcoursPaginated(
  query: string,
  filters?: SearchFilters,
  page: number = 1,
  limit: number = 10,
  sortBy: 'relevance' | 'date' | 'popularity' | 'successRate' | 'deadline' = 'relevance'
): PaginatedResult<Concours> {
  let results = concoursData;
  
  // Recherche textuelle
  if (query.trim()) {
    const searchTerm = query.toLowerCase();
    results = results.filter(concours => 
      concours.title.toLowerCase().includes(searchTerm) ||
      concours.institution.toLowerCase().includes(searchTerm) ||
      concours.description.toLowerCase().includes(searchTerm) ||
      (concours.fullDescription && concours.fullDescription.toLowerCase().includes(searchTerm)) ||
      (concours.tags && concours.tags.some(tag => tag.toLowerCase().includes(searchTerm)))
    );
  }
  
  // Filtres
  if (filters) {
    if (filters.categories?.length) {
      results = results.filter(c => filters.categories!.includes(c.category));
    }
    
    if (filters.regions?.length) {
      results = results.filter(c => filters.regions!.includes(c.region));
    }
    
    if (filters.niveaux?.length) {
      results = results.filter(c => filters.niveaux!.includes(c.niveau));
    }
    
    if (filters.statuses?.length) {
      results = results.filter(c => filters.statuses!.includes(c.status));
    }
    
    if (filters.difficulty?.length) {
      results = results.filter(c => filters.difficulty!.includes(c.difficulte));
    }
    
    if (filters.priceRange) {
      results = results.filter(c => {
        const fee = c.inscriptionFee;
        const min = filters.priceRange!.min ?? 0;
        const max = filters.priceRange!.max ?? Infinity;
        return fee >= min && fee <= max;
      });
    }
  }
  
  // Tri
  switch (sortBy) {
    case 'date':
      results.sort((a, b) => new Date(a.dateLimite).getTime() - new Date(b.dateLimite).getTime());
      break;
    case 'popularity':
      const popularityOrder = ['Très populaire', 'Populaire', 'Moyenne'];
      results.sort((a, b) => popularityOrder.indexOf(a.popularite) - popularityOrder.indexOf(b.popularite));
      break;
    case 'successRate':
      results.sort((a, b) => b.stats.successRate - a.stats.successRate);
      break;
    case 'deadline':
      results.sort((a, b) => {
        const daysA = getDaysRemaining(a.dateLimite);
        const daysB = getDaysRemaining(b.dateLimite);
        return daysA - daysB;
      });
      break;
  }
  
  return paginate(results, page, limit);
}

/**
 * Validation des données du concours
 */
export function validateConcours(concours: Partial<Concours>): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (!concours.title?.trim()) errors.push('Le titre est requis');
  if (!concours.institution?.trim()) errors.push('L\'institution est requise');
  if (concours.inscriptionFee !== undefined && concours.inscriptionFee < 0) errors.push('Les frais d\'inscription ne peuvent pas être négatifs');
  if (!concours.dateLimite) errors.push('La date limite est requise');
  if (concours.dateLimite) {
    const deadline = new Date(concours.dateLimite);
    if (isNaN(deadline.getTime())) {
      errors.push('La date limite n\'est pas une date valide');
    } else if (deadline < new Date()) {
      errors.push('La date limite doit être dans le futur');
    }
  }
  
  if (concours.stats?.places && concours.stats.places <= 0) {
    errors.push('Le nombre de places doit être positif');
  }
  
  if (concours.stats?.successRate && (concours.stats.successRate < 0 || concours.stats.successRate > 100)) {
    errors.push('Le taux de réussite doit être entre 0 et 100');
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
}
/**
 * Récupère les régions uniques depuis les concours
 */
export function getUniqueRegions(): string[] {
  return Array.from(new Set(concoursData.map(c => c.region))).sort();
}

/**
 * Récupère les catégories uniques depuis les concours
 */
export function getUniqueCategories(): string[] {
  return Array.from(new Set(concoursData.map(c => c.category))).sort();
}

/**
 * Récupère les niveaux uniques depuis les concours
 */
export function getUniqueNiveaux(): string[] {
  return Array.from(new Set(concoursData.map(c => c.niveau))).sort();
}

/**
 * Formate un montant en franc CFA
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'XOF'
  }).format(amount);
}

/**
 * Formate une durée en minutes en format lisible
 */
export function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  
  if (hours > 0) {
    return `${hours}h${mins > 0 ? ` ${mins}min` : ''}`;
  }
  return `${mins}min`;
}

/**
 * Récupère les concours triés par proximité de la date limite
 */
export function getConcoursByDeadline(): Concours[] {
  return [...concoursData]
    .filter(c => getDaysRemaining(c.dateLimite) >= 0)
    .sort((a, b) => getDaysRemaining(a.dateLimite) - getDaysRemaining(b.dateLimite));
}

// Export par défaut avec toutes les fonctions et données
export default {
  // Données
  concoursData,
  quizData,
  userQuizProgress,
  userData,
  categoriesData,
  statsData,
  regionsData,
  niveauxData,
  quizCategories,
  quizDifficulties,
  statusesData,
  populariteData,
  difficulteData,
  
  // Fonctions
  getAllConcours,
  getConcoursById,
  getRelatedConcours,
  getConcoursQuizzes,
  getAllQuizzes,
  getQuizById,
  getQuizzesByCategory,
  getQuizzesByDifficulty,
  getPopularQuizzes,
  getFeaturedQuizzes,
  getConcoursStats,
  getConcoursCategories,
  getQuizCategories,
  getQuizDifficulties,
  getUserQuizProgress,
  getQuizStatistics,
  searchConcours,
  searchQuizzes,
  getConcoursByCategory,
  getConcoursByStatus,
  getUpcomingConcours,
  getUrgentConcours,
  getPopularConcours,
  getTrendingConcours,
  formatDate,
  getDaysRemaining,
  isConcoursUrgent,
  getStatusColor,
  getDifficultyColor,
  getPopularityColor,
  getQuizDifficultyColor,
  getDashboardStats,
  updateQuizProgress,
  paginate,
  searchConcoursPaginated,
  validateConcours,
  getUniqueRegions,
  getUniqueCategories,
  getUniqueNiveaux,
  formatCurrency,
  formatDuration,
  getConcoursByDeadline,
  
  // Nouvelles fonctions pour les quiz
  getQuizQuestions,
  getQuizWithQuestions,
  calculateQuizScore,
  getRecommendedQuizzes,
  getQuizAnalytics
};


