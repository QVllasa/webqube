import {IFaq, IFeature, IPlan, IWork, ITeamMember, IMilestone, IHosting} from "../models/models";

export const columnsKeys = ['Feature', 'Starter', 'Professional', 'Business']


//Starter
export const starterFeatures: IFeature[] =
  [
    {
      simpleAnalytics: {
        title: 'Einfach Analytikfunktion',
        value: true,
        order: 0
      },
    },
    {
      seo: {
        title: 'Suchmaschinenoptimiert',
        value: true,
        order: 1
      },
    },
    {
      cms: {
        title: 'Content-Management-System',
        value: false,
        order: 6
      }
    },
    {
      monthlyAppointments: {
        title: 'Rücksprachetermine pro Monat',
        value: '1',
        order: 9
      }
    },
    {
      revisions: {
        title: 'Überarbeitungsschleifen',
        value: '1',
        order: 10
      }
    },
    {
      imprintPage: {
        title: 'Impressum',
        value: true,
        order: 2
      }
    },
    {
      privacyPage: {
        title: 'Datenschutzerklärung',
        value: true,
        order: 3
      }
    },
    {
      privacySettings: {
        title: 'Datenschutzeinstellungen',
        value: false,
        order: 7
      }
    },
    {
      pageCount: {
        title: 'Seitenanzahl',
        value: '1',
        order: 11
      }
    },
    {
      securityUpdates: {
        title: 'Sicherheitsupdates',
        value: true,
        order: 12
      }
    },
    {
      contentAnalysis: {
        title: 'Content-Analyse',
        value: false,
        order: 5
      }
    },
    {
      projectDuration: {
        title: 'Projekt-Laufzeit',
        value: 'Unbegrenzt',
        order: 17
      }
    },
    {
      timeToMarket: {
        title: 'Zeit bis GO-Live',
        value: '1 Monat',
        order: 18
      }
    },
    {
      cmsAssets: {
        title: 'CMS Assets',
        value: '0',
        order: 13
      }
    },
    {
      forms: {
        title: 'Formen',
        value: '0',
        order: 14
      }
    },
    {
      eventPlanning: {
        title: 'Eventplanung',
        value: '0',
        order: 16
      }
    },
    {
      socialMedia: {
        title: 'Social Media',
        value: true,
        order: 4
      }
    },
    {
      advancedAnalytics: {
        title: 'Fortgeschrittene Analytik',
        value: false,
        order: 8
      }
    },
  ]

//Essential
export const essentialFeatures: IFeature[] =
  [
    {
      simpleAnalytics: {
        title: 'Einfach Analytikfunktion',
        value: true,
        order: 0
      },
    },

    {
      seo: {
        title: 'Suchmaschinenoptimiert',
        value: true,
        order: 1
      },
    },
    {
      cms: {
        title: 'Content-Management-System',
        value: true,
        order: 6
      }
    },
    {
      monthlyAppointments: {
        title: 'Rücksprachetermine pro Monat',
        value: '2',
        order: 9
      }
    },
    {
      revisions: {
        title: 'Überarbeitungsschleifen',
        value: '3',
        order: 10
      }
    },
    {
      imprintPage: {
        title: 'Impressum',
        value: true,
        order: 2
      }
    },
    {
      privacyPage: {
        title: 'Datenschutzerklärung',
        value: true,
        order: 3
      }
    },
    {
      privacySettings: {
        title: 'Datenschutzeinstellungen',
        value: false,
        order: 7
      }
    },
    {
      pageCount: {
        title: 'Seitenanzahl',
        value: '12',
        order: 11
      }
    },
    {
      securityUpdates: {
        title: 'Sicherheitsupdates',
        value: true,
        order: 12
      }
    },
    {
      contentAnalysis: {
        title: 'Content-Analyse',
        value: true,
        order: 5
      }
    },
    {
      projectDuration: {
        title: 'Projekt-Laufzeit',
        value: 'Unbegrenzt',
        order: 17
      }
    },
    {
      timeToMarket: {
        title: 'Zeit bis GO-Live',
        value: '3 Monate',
        order: 18
      }
    },
    {
      cmsAssets: {
        title: 'CMS Assets',
        value: '2',
        order: 13
      }
    },
    {
      forms: {
        title: 'Formen',
        value: '1',
        order: 14
      }
    },
    {
      eventPlanning: {
        title: 'Eventplanung',
        value: '0',
        order: 16
      }
    },
    {
      socialMedia: {
        title: 'Social Media',
        value: true,
        order: 4
      }
    },
    {
      advancedAnalytics: {
        title: 'Fortgeschrittene Analytik',
        value: false,
        order: 8
      }
    },
  ]

//Premium
export const premiumFeatures: IFeature[] =
  [
    {
      simpleAnalytics: {
        title: 'Einfach Analytikfunktion',
        value: true,
        order: 0
      },
    },

    {
      seo: {
        title: 'Suchmaschinenoptimiert',
        value: true,
        order: 1
      },
    },
    {
      cms: {
        title: 'Content-Management-System',
        value: true,
        order: 6
      }
    },
    {
      monthlyAppointments: {
        title: 'Rücksprachetermine pro Monat',
        value: '4',
        order: 9
      }
    },
    {
      revisions: {
        title: 'Überarbeitungsschleifen',
        value: '3',
        order: 10
      }
    },
    {
      imprintPage: {
        title: 'Impressum',
        value: true,
        order: 2
      }
    },
    {
      privacyPage: {
        title: 'Datenschutzerklärung',
        value: true,
        order: 3
      }
    },
    {
      privacySettings: {
        title: 'Datenschutzeinstellungen',
        value: true,
        order: 7
      }
    },
    {
      pageCount: {
        title: 'Seitenanzahl',
        value: '40',
        order: 11
      }
    },
    {
      securityUpdates: {
        title: 'Sicherheitsupdates',
        value: true,
        order: 12
      }
    },
    {
      contentAnalysis: {
        title: 'Content-Analyse',
        value: true,
        order: 5
      }
    },
    {
      projectDuration: {
        title: 'Projekt-Laufzeit',
        value: 'Unbegrenzt',
        order: 17
      }
    },
    {
      timeToMarket: {
        title: 'Zeit bis GO-Live',
        value: '6 Monate',
        order: 18
      }
    },
    {
      cmsAssets: {
        title: 'CMS Assets',
        value: '6',
        order: 13
      }
    },
    {
      forms: {
        title: 'Formen',
        value: '2',
        order: 14
      }
    },
    {
      eventPlanning: {
        title: 'Eventplanung',
        value: '0',
        order: 16
      }
    },
    {
      socialMedia: {
        title: 'Social Media',
        value: true,
        order: 4
      }
    },
    {
      advancedAnalytics: {
        title: 'Fortgeschrittene Analytik',
        value: false,
        order: 8
      }
    },
  ]

//Unlimited
export const unlimitedFeatures: IFeature[] =
  [
    {
      simpleAnalytics: {
        title: 'Einfach Analytikfunktion',
        value: true,
        order: 0
      },
    },
    {
      seo: {
        title: 'Suchmaschinenoptimiert',
        value: true,
        order: 1
      },
    },
    {
      cms: {
        title: 'Content-Management-System',
        value: true,
        order: 6
      }
    },
    {
      monthlyAppointments: {
        title: 'Rücksprachetermine pro Monat',
        value: 'Unbegrenzt',
        order: 9
      }
    },
    {
      revisions: {
        title: 'Überarbeitungsschleifen',
        value: 'Unbegrenzt',
        order: 10
      }
    },
    {
      imprintPage: {
        title: 'Impressum',
        value: true,
        order: 2
      }
    },
    {
      privacyPage: {
        title: 'Datenschutzerklärung',
        value: true,
        order: 3
      }
    },
    {
      privacySettings: {
        title: 'Datenschutzeinstellungen',
        value: true,
        order: 7
      }
    },
    {
      pageCount: {
        title: 'Seitenanzahl',
        value: 'Unbegrenzt',
        order: 11
      }
    },
    {
      securityUpdates: {
        title: 'Sicherheitsupdates',
        value: true,
        order: 12
      }
    },
    {
      contentAnalysis: {
        title: 'Content-Analyse',
        value: true,
        order: 5
      }
    },
    {
      projectDuration: {
        title: 'Projekt-Laufzeit',
        value: '6 Monate',
        order: 17
      }
    },
    {
      timeToMarket: {
        title: 'Zeit bis GO-Live',
        value: '6 Monate',
        order: 18
      }
    },
    {
      cmsAssets: {
        title: 'CMS Assets',
        value: 'Unbegrenzt',
        order: 13
      }
    },
    {
      forms: {
        title: 'Formen',
        value: '5',
        order: 14
      }
    },
    {
      eventPlanning: {
        title: 'Eventplanung',
        value: '1',
        order: 16
      }
    },
    {
      socialMedia: {
        title: 'Social Media',
        value: true,
        order: 4
      }
    },
    {
      advancedAnalytics: {
        title: 'Fortgeschrittene Analytik',
        value: true,
        order: 8
      }
    },
  ]


export const faqs: IFaq[] = [
  {
    question: 'Was versteht man unter einem Refinement?',
    answer: 'Ein Refinement eine Überarbeitungsschleife bestimmter Bereiche der Webseite.'
  },
  {
    question: 'Zählen Impressum und Datenschutz als eigene Seite?',
    answer: 'Nein, jedes Projekt wird von Haus aus immer mit Impressum und Datenschutz geliefert.'
  },
  {
    question: 'Wie lange geht ein Regeltermin?',
    answer: 'Ein Regeltermin geht meist nicht länger als eine Stunde. Hier besprechen wir den aktuellen Stand und die nächsten Schritte sowie bestimmte Anforderungen.'
  },
  {
    question: 'Gibt es eine Geld-Zurück-Garantie?',
    answer: 'Ja, es gibt bis 14 Tage nach Projektstart die Möglichkeit das Projekt zurückzuziehen. Du erhältst den vollen Betrag zurück.'
  },
  {
    question: 'Wie halten wir Regeltermine ab?',
    answer: 'Das hängt auch von deiner Präferenz ab. In aller Regel verwenden wir hierfür aber Google Meet.'
  },
  {
    question: 'Was passiert nach Abschluss bei einmaliger Zahlung?',
    answer: 'Das kannst du selbst entscheiden. Wir können deine Webseite gegen Gebühr für dich hosten oder dir helfen einen Hoster auszusuchen.'
  },
]

export const team: ITeamMember[] = [
  {
    name: 'Qendrim Vllasa',
    role: 'Co-Founder',
    description: 'Ich liebe es Dinge zu erschaffen und zu kreieren. Um meiner Fantasie keine Grenzen zu setzen, habe ich mich dem Coding gewidmet und lasse dadurch Kreativität, Faszination und Spaß an logischen Problemen verschmelzen.',
    twitter: 'https://twitter.com/qvllasa92',
    linkedin: 'https://www.linkedin.com/in/qendrim-vllasa/'
  },
  {
    name: 'Dominim Vllasa',
    role: 'Co-Founder',
    description: 'Meine Leidenschaft ist es Lösungsorientierte Wege für Probleme zu finden. Im Bereich der Softwareentwicklung sehe ich das Potenzial mein Hobby zum Beruf zu machen, wodurch es in meinem Job nie langweilig wird!',
    twitter: '/',
    linkedin: '/'
  }
]

export const projects: IWork[] = [
  {
    id: '1',
    title: 'newboxes',
    subtitle: 'Webseite mit Contentmanagement-System',
    description: 'Es wurde eine vollständige webbasierte Unternehmenspräsenz aufgebaut, welche die Kompetenzen und Geschäftsfelder wiederspiegelt.',
    technologies: 'Die Webseite wurde mit dem Code-Editor Webflow entwickelt. Darüber hinaus wurden manuelle Ergänzungen und Anpassungen mit Javascript, CSS und HTML gemacht.',
    features: 'Die Webseite verfügt über ein CMS, so dass neben Blog-Einträgen und Blog-Seiten auch Kategorien, FAQs und andere Bereiche der Seite sehr nutzerfreundlich vom Nutzer manuell angepasst werden können.',
    seo: 100,
    performance: 93,
    accessibility: 94,
    link: 'https://newboxes.com',
    year: '2021',
    img: 'assets/img/projects/newboxes.png',
    featured: true,
  },
  {
    id: '2',
    title: 'webqube',
    subtitle: 'Cloudbasierte serverless Webseite mit CMS',
    description: 'Die erste offizielle Unternehmenspräsenz für unseren Service.',
    technologies: 'Die Webseite wurde mit dem Javascript-Framework Angular entwickelt und wird auf Google Firebase gehostet.',
    features: 'Die Architektur hinter der Webseite wird als Serverless bezeichnet. Es gibt also kein eigenes Backend. Alle Funktionen werden in der Google Cloud ausgeführt. Content-Anpassungen werden mit Google Firestore verwaltet.',
    seo: 100,
    performance: 93,
    accessibility: 94,
    link: 'https://webqube.de',
    year: '2021',
    img: 'assets/img/projects/webqube.png',
    featured: false,
  },
  {
    id: '3',
    title: 'Heat & Power',
    subtitle: 'Cloudbasierte serverless Webseite mit CMS',
    description: 'Die erste offizielle Unternehmenspräsenz für unseren Service.',
    technologies: 'Die Webseite wurde mit dem Javascript-Framework Angular entwickelt und wird auf Google Firebase gehostet.',
    features: 'Die Architektur hinter der Webseite wird als Serverless bezeichnet. Es gibt also kein eigenes Backend. Alle Funktionen werden in der Google Cloud ausgeführt. Content-Anpassungen werden mit Google Firestore verwaltet.',
    seo: 97,
    performance: 93,
    accessibility: 95,
    link: 'https://hp-heizungsbau.de',
    year: '2020',
    img: 'assets/img/projects/hp-heizungsbau.png',
    featured: false,
  },
  {
    id: '4',
    title: 'Homepage',
    subtitle: 'Die persönliche Homepage von Co-Founder Qendrim.',
    description: 'Ohne den Fokus auf SEO zu legen, stellt er hier seine Skills und seine Erfahrung vor.',
    technologies: 'Die Webseite wird in Docker Container in der Cloud gehostet basiert im Backend auf der Symfony API Platform inkl. CMS und im Frontend auf Angular.',
    features: 'Bis auf ein paar nette Animationen und ein einfaches CMS bietet die Webseite keine besonderen Features, da sie rein als persönlicher Blog fungiert.',
    seo: 91,
    performance: 97,
    accessibility: 95,
    link: 'https://qendrimvllasa.com',
    year: '2019',
    img: 'assets/img/projects/homepage.png',
    featured: false
  },
]

export const Milestones: IMilestone[] = [
  {
    order: 1,
    label: '1. Design und Content',
    description: 'In dieser Phase haben wir bereits genug Input von dir erhalten, um uns selbständig an Designvorschlägen zu machen und uns deinen Content genauer anzuschauen bzw. zu überarbeiten',
    icon: 'design_services',
    icon_classes: 'bg-teal-50 text-teal-700'
  },
  {
    order: 2,
    label: '2. Entwicklung und Konfiguration',
    description: 'In dieser Phase entwickeln wir die Konzepte, setzen den Server auf und lassen dich erstmals deine Webseite online sehen.',
    icon: 'code',
    icon_classes: 'bg-blue-50 text-blue-700'
  },
  {
    order: 3,
    label: '3. Überarbeitung, Abschluss und GO-Live',
    description: 'In dieser Phase machen wir den Feinschliff und gehen gemeinsam mit dir Online!',
    icon: 'important_devices',
    icon_classes: 'bg-purple-50 text-purple-700'
  },
]

export const Tiers: IPlan[] =
  [
    {
      description: 'Eine starke Landingpage, die gewaltigen Eindruck hinterlässt.',
      allFeatures: starterFeatures,
      features: ['1 Seite inkl. Design', '7 Sections', '1 Überarbeitungsschleife'],
      icon: '✈️',
      label: 'Starter',
      price: 900,
      order: 0,
    },
    {
      description: 'Ideal für aufstrebende Start-Ups im Wachstum für mehr Reichweite.',
      allFeatures: essentialFeatures,
      features: ['12 Seiten inkl. Design', 'Je Seite 7 Sections', '3 Überarbeitungsschleifen', 'Content-Management-System', '2 CMS-Asset'],
      icon: '✈️',
      label: 'Essentials',
      price: 4800,
      order: 1
    },
    {
      description: 'Ideal wenn du erstklassigen Content liefern möchtest.',
      allFeatures: premiumFeatures,
      features: ['40 Seiten inkl. Design', 'Je Seite 7 Sections', '3 Überarbeitungsschleifen', 'Content-Management-System', '6 CMS-Assets'],
      icon: '✈️',
      label: 'Premium',
      price: 10000,
      order: 2
    },
    {
      description: 'Lässt keine Wünsche offen während dein Business wächst.',
      allFeatures: unlimitedFeatures,
      features: ['Unbegrenzte Seitenanzahl', 'Unbegrenzte Anzahl Sections', 'Unbegrenzt viele Überarbeitungsschleifen', 'Content-Management-System', 'Unbegrenzt viele CMS-Assets'],
      icon: '✈️',
      label: 'Unlimited',
      price: 25000,
      order: 3
    }
  ]

export const Hostings: IHosting[] =
  [
    {
      features: ['1x Wunsch-Domain', '2GB RAM', '40GB SSD Speicher', '2 vCPUs', '20TB Bandbreite'],
      icon: '✈️',
      label: 'S-Hosting',
      price: 15,
      order: 0,
    },
    {
      features: ['1x Wunsch-Domain', '4GB RAM', '80GB SSD Speicher', '3 vCPUs', '20TB Bandbreite'],
      icon: '✈️',
      label: 'M-Hosting',
      price: 25,
      order: 1,
    },
    {
      features: ['1x Wunsch-Domain', '8GB RAM', '160GB SSD Speicher', '4 vCPUs', '20TB Bandbreite'],
      icon: '✈️',
      label: 'L-Hosting',
      price: 30,
      order: 2,
    },
  ]
