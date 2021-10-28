import {IFaq, IFeature, IPriceCard, IProject, ITeamMember} from "./models";

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
]

export const priceCards: IPriceCard[] = [
  {
    monthlyPrice: 79,
    fixPrice: 899,
    features: ['Eine Landingpage mit 8 Sections', 'Suchmaschinenoptimiert', 'Analytikfunktionen', '1 Refinements', 'Webhosting'],
    description: 'Eine starke Landingpage, die gewaltigen Eindruck hinterlässt.',
    plan: 'Starter',
    mostSelected: false
  },
  {
    monthlyPrice: 149,
    fixPrice: 3899,
    features: ['15 individuelle Seiten', 'Blog-Funktionen und User-Management', 'Fortgeschrittene Analysen', 'Mit Content Management', '4 Refinements', 'E-Mail Einrichtung'],
    description: 'Bereit für Marketing Kampagnen',
    plan: 'Professional',
    mostSelected: true
  },
  {
    monthlyPrice: 349,
    fixPrice: 7899,
    features: ['40 individuelle Seiten', 'Schnelle Reaktionszeiten', 'Webhosting', 'E-Mail Einrichtung und Hosting', '6 Refinements'],
    description: 'Ein Plan der gemeinsam grenzenlos mit deinem Business wächst.',
    plan: 'Business',
    mostSelected: false
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
    twitter:'https://twitter.com/qvllasa92',
    linkedin:'https://www.linkedin.com/in/qendrim-vllasa/'
  },
  {
    name: 'Dominim Vllasa',
    role: 'Co-Founder',
    description: 'Nulla quam felis, enim faucibus proin velit, ornare id pretium. Augue ultrices sed arcu condimentum vestibulum suspendisse. Volutpat eu faucibus vivamus eget bibendum cras.',
    twitter:'/',
    linkedin:'/'
  }
]

export const projects: IProject[] =[
  {
    id: '1',
    name: 'newboxes',
    link: 'https://newboxes.com',
    year: '2021',
    img:'',
  },
  {
    id: '2',
    name: 'webqube',
    link: 'https://webqube.de',
    year: '2021',
    img:'',
  },
  {
    id: '3',
    name: 'Heat & Power',
    link: 'https://hp-heizungsbau.de',
    year: '2020',
    img:'',
  },
  {
    id: '4',
    name: 'Homepage',
    link: 'https://qendrimvllasa.com',
    year: '2019',
    img:'',
  },

]
