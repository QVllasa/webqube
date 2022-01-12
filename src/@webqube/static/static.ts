import {IFaq, IFeature, ITier, IWork, ITeamMember, IMilestone} from "../models/models";

export const columnsKeys = ['Feature', 'Starter', 'Professional', 'Business']

export const featureComparison: IFeature[] = [
  {
    name: 'Mobile Responsive Design',
    starterOneTime: true,
    professionalOneTime: true,
    businessOneTime: true,
    starterMonthly: true,
    professionalMonthly: true,
    businessMonthly: true,
    custom: false,
  },
  {
    name: 'Google Analytics',
    starterOneTime: true,
    professionalOneTime: true,
    businessOneTime: true,
    starterMonthly: true,
    professionalMonthly: true,
    businessMonthly: true,
    custom: false,
  },
  {
    name: 'Domainverwaltung',
    starterOneTime: true,
    professionalOneTime: true,
    businessOneTime: true,
    starterMonthly: true,
    professionalMonthly: true,
    businessMonthly: true,
    custom: false,
  },
  {
    name: 'E-Mail Hosting und Einrichtung',
    starterOneTime: true,
    professionalOneTime: true,
    businessOneTime: true,
    starterMonthly: true,
    professionalMonthly: true,
    businessMonthly: true,
    custom: false,
    starterTextMonthly: 'Inklusive',
    professionalTextMonthly: 'Inklusive',
    businessTextMonthly: 'Inklusive',
    starterTextOneTime: 'Nur Einrichtung',
    professionalTextOneTime: 'Nur Einrichtung',
    businessTextOneTime: 'Nur Einrichtung'
  },
  {
    name: 'Content Management',
    starterOneTime: false,
    professionalOneTime: true,
    businessOneTime: true,
    starterMonthly: false,
    professionalMonthly: true,
    businessMonthly: true,
    custom: false
  },
  {
    name: 'Support',
    starterOneTime: true,
    professionalOneTime: true,
    businessOneTime: true,
    starterMonthly: true,
    professionalMonthly: true,
    businessMonthly: true,
    custom: true,
    starterTextOneTime: '5 Tage Antwortzeit',
    professionalTextOneTime: '3 Tage Antwortzeit',
    businessTextOneTime: '1 Tag Antwortzeit ',
    starterTextMonthly: '5 Tage Antwortzeit',
    professionalTextMonthly: '3 Tage Antwortzeit',
    businessTextMonthly: '1 Tag Antwortzeit '
  },
  {
    name: 'Refinements und Überarbeitungen',
    starterOneTime: true,
    professionalOneTime: true,
    businessOneTime: true,
    starterMonthly: true,
    professionalMonthly: true,
    businessMonthly: true,
    custom: true,
    starterTextOneTime: '3',
    professionalTextOneTime: '6',
    businessTextOneTime: '10',
    starterTextMonthly: '1',
    professionalTextMonthly: '4',
    businessTextMonthly: '6'
  },
  {
    name: 'Zugang zum Ticketsystem',
    starterOneTime: true,
    professionalOneTime: true,
    businessOneTime: true,
    starterMonthly: true,
    professionalMonthly: true,
    businessMonthly: true,
    custom: false
  },
  {
    name: 'Datenschutzgerecht',
    starterOneTime: true,
    professionalOneTime: true,
    businessOneTime: true,
    starterMonthly: true,
    professionalMonthly: true,
    businessMonthly: true,
    custom: false,
  },
  {
    name: 'Anzahl Seiten',
    starterOneTime: true,
    professionalOneTime: true,
    businessOneTime: true,
    starterMonthly: true,
    professionalMonthly: true,
    businessMonthly: true,
    custom: true,
    starterTextOneTime: '1 Seite 8 Sections',
    professionalTextOneTime: '15 Seiten',
    businessTextOneTime: '40 Seiten',
    starterTextMonthly: '1 Seite 8 Sections',
    professionalTextMonthly: '15 Seiten',
    businessTextMonthly: '40 Seiten'
  },
  {
    name: 'Suchmaschinenoptimiert',
    starterOneTime: true,
    professionalOneTime: true,
    businessOneTime: true,
    starterMonthly: true,
    professionalMonthly: true,
    businessMonthly: true,
    custom: false
  },
  {
    name: 'Webhosting',
    starterOneTime: true,
    professionalOneTime: true,
    businessOneTime: true,
    starterMonthly: true,
    professionalMonthly: true,
    businessMonthly: true,
    custom: true,
    starterTextOneTime: '6 Monate inkl.',
    professionalTextOneTime: '12 Monate inkl.',
    businessTextOneTime: '18 Monate inkl.',
    starterTextMonthly: 'Inklusive',
    professionalTextMonthly: 'Inklusive',
    businessTextMonthly: 'Inklusive'
  },
  {
    name: 'Sicherheitsupdates',
    starterOneTime: true,
    professionalOneTime: true,
    businessOneTime: true,
    starterMonthly: true,
    professionalMonthly: true,
    businessMonthly: true,
    custom: false,

  },
  {
    name: 'Optionale Regeltermine',
    starterOneTime: true,
    professionalOneTime: true,
    businessOneTime: true,
    starterMonthly: true,
    professionalMonthly: true,
    businessMonthly: true,
    custom: true,
    starterTextOneTime: 'bis zu 4 Termin',
    professionalTextOneTime: 'bis zu 12 Termine',
    businessTextOneTime: 'Unbegrenzt',
    starterTextMonthly: '1 Termin',
    professionalTextMonthly: '4 Termine',
    businessTextMonthly: 'Unbegrenzt'
  },
  {
    name: 'Cookie-Einstellungen',
    starterOneTime: false,
    professionalOneTime: false,
    businessOneTime: true,
    starterMonthly: false,
    professionalMonthly: false,
    businessMonthly: true,
    custom: false
  },
  {
    name: 'Cookie-Consent',
    starterOneTime: true,
    professionalOneTime: true,
    businessOneTime: true,
    starterMonthly: true,
    professionalMonthly: true,
    businessMonthly: true,
    custom: false
  },
  {
    name: 'Designvorschläge',
    starterOneTime: true,
    professionalOneTime: true,
    businessOneTime: true,
    starterMonthly: true,
    professionalMonthly: true,
    businessMonthly: true,
    custom: true,
    starterTextOneTime: '3 Designs',
    professionalTextOneTime: '5 Designs',
    businessTextOneTime: '5 Designs',
    starterTextMonthly: '1 Designs',
    professionalTextMonthly: '2 Designs',
    businessTextMonthly: '2 Designs'
  },
  {
    name: 'Textüberarbeitung',
    starterOneTime: true,
    professionalOneTime: true,
    businessOneTime: true,
    starterMonthly: true,
    professionalMonthly: true,
    businessMonthly: true,
    custom: false
  },
  {
    name: 'GO-Live in',
    starterOneTime: true,
    professionalOneTime: true,
    businessOneTime: true,
    starterMonthly: true,
    professionalMonthly: true,
    businessMonthly: true,
    custom: true,
    starterTextOneTime: '1 Monat',
    professionalTextOneTime: '3 Monate',
    businessTextOneTime: '3 Monate',
    starterTextMonthly: '1 Monat',
    professionalTextMonthly: '5 Monate',
    businessTextMonthly: '6 Monate'
  },
]

export const Tiers: ITier[] = [
  {
    id: '1',
    monthlyPrice: 79,
    fixPrice: 899,
    features: ['Eine Landingpage mit 8 Sections', 'Suchmaschinenoptimiert', 'Analytikfunktionen', '1 Refinements', 'Webhosting'],
    description: 'Eine starke Landingpage, die gewaltigen Eindruck hinterlässt.',
    plan: 'Starter',
    icon: '🛫',
    mostSelected: false
  },
  {
    id: '2',
    monthlyPrice: 149,
    fixPrice: 3899,
    features: ['15 individuelle Seiten', 'Blog-Funktionen und User-Management', 'Fortgeschrittene Analysen', 'Mit Content Management', '4 Refinements', 'E-Mail Einrichtung'],
    description: 'Bereit für Marketing Kampagnen',
    plan: 'Professional',
    mostSelected: true,
    icon: '🛫',
  },
  {
    id: '3',
    monthlyPrice: 349,
    fixPrice: 7899,
    features: ['40 individuelle Seiten', 'Schnelle Reaktionszeiten', 'Webhosting', 'E-Mail Einrichtung und Hosting', '6 Refinements'],
    description: 'Ein Plan der gemeinsam grenzenlos mit deinem Business wächst.',
    plan: 'Business',
    mostSelected: false,
    icon: '🛫',
  }
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
    id:'1',
    paid: false,
    order: 1,
    label: '1. Design und Content',
    description: 'In dieser Phase haben wir bereits genug ' +
      'Input von dir erhalten, um uns selbständig an ' +
      'Designvorschlägen zu machen und uns ' +
      'deinen Content genauer anzuschauen bzw. zu überarbeiten',
    state: 'waiting',
    icon: 'design_services',
    icon_classes:['bg-teal-50 text-teal-700']
  },
  {
    id:'2',
    paid: false,
    order: 2,
    label: '2. Entwicklung und Konfiguration',
    description: 'In dieser Phase entwickeln ' +
      'wir die Konzepte, setzen den Server ' +
      'auf und lassen dich erstmals deine Webseite online sehen.',
    state: 'waiting',
    icon: 'code',
    icon_classes:['bg-blue-50 text-blue-700']
  },
  {
    id:'3',
    paid: false,
    order: 3,
    label: '3. Überarbeitung, Abschluss und GO-Live',
    description: 'In dieser Phase machen ' +
      'wir den Feinschliff und gehen ' +
      'gemeinsam mit dir Online!',
    state: 'waiting',
    icon: 'important_devices',
    icon_classes:['bg-purple-50 text-purple-700']
  },
]
