export const COLORS = {
  BLACK: "#000000",
  YELLOW: "#FFD700",
  ROAD: "#2e2e2e",
};
export const COMPANY = "Container Transport Mainz";
export const SLOGAN = "Ihre Ladung, unsere Verpflichtung.";

// Icon mapping für string-basierte Icons
import { 
  Truck, Package, Clock, Shield, Globe, Users, Calendar, MapPin,
  MessageCircle, ArrowRight, Star, Award, TrendingUp, Zap,
  Home, Mail, Phone, Target, Container, Route
} from 'lucide-react';

export const iconMap = {
  Truck, Package, Clock, Shield, Globe, Users, Calendar, MapPin,
  MessageCircle, ArrowRight, Star, Award, TrendingUp, Zap,
  Home, Mail, Phone, Target, Container, Route
};

// Standalone React App Data
export const STANDALONE_DATA = {
  hero: {
    badge: {
      text: "Spedition · Containerlogistik",
      icon: "Target",
      visible: true
    },
    headline: {
      part1: "Container",
      part2: "Transport", 
      part3: "Mainz"
    },
    subtext: "Zuverlässige Containertransporte mit über 25 Jahren Erfahrung. Sicher, effizient und transparent.",
    buttons: {
      primary: {
        text: "Kontakt aufnehmen",
        icon: "MessageCircle",
        href: "#contact",
        visible: true
      },
      secondary: {
        text: "Unsere Leistungen", 
        icon: "ArrowRight",
        href: "#services",
        visible: true
      }
    },
    serviceCards: [
      {
        icon: "Truck",
        title: "Effiziente Transporte",
        description: "Pünktlich & zuverlässig",
        visible: true
      },
      {
        icon: "Shield",
        title: "Maximale Sicherheit", 
        description: "Vollversichert bis 5 Mio. EUR",
        visible: true
      },
      {
        icon: "Globe",
        title: "Weltweit vernetzt",
        description: "International und regional flexibel", 
        visible: true
      }
    ],
    stats: [
      { 
        number: "25+", 
        label: "Jahre Erfahrung",
        icon: "Calendar",
        visible: true
      },
      { 
        number: "1000+", 
        label: "Zufriedene Kunden",
        icon: "Users",
        visible: true
      },
      { 
        number: "5000+", 
        label: "Container transportiert",
        icon: "Package",
        visible: true
      }
    ]
  },
  
  services: {
    title: "Unsere Leistungen",
    subtitle: "Professionelle Containertransporte für alle Ihre Anforderungen",
    features: [
      {
        icon: "Package",
        title: "Sichere Verpackung",
        description: "Professionelle Sicherung Ihrer wertvollen Güter für jeden Transport",
        highlight: "Zertifizierte Verpackung",
        visible: true
      },
      {
        icon: "Clock",
        title: "Pünktliche Lieferung", 
        description: "Zuverlässige Termine & transparente Kommunikation während des gesamten Transports",
        highlight: "99.2% Pünktlichkeit",
        visible: true
      },
      {
        icon: "Globe",
        title: "Globale Kapazitäten",
        description: "Weltweites Netzwerk mit lokalen Partnern für nahtlose Transportlösungen",
        highlight: "Über 50 Länder",
        visible: true
      },
      {
        icon: "Shield", 
        title: "Vollversichert",
        description: "Umfassender Schutz mit bis zu 5 Mio. EUR Transportversicherung",
        highlight: "Bis 5 Mio. EUR",
        visible: true
      }
    ],
    cta: {
      text: "Jetzt Angebot anfordern",
      href: "#contact",
      icon: "ArrowRight",
      visible: true
    },
    containerInfo: {
      image: {
        closed: "/src/assets/Schiffcontainer.png",
        open: "/src/assets/Schiffcontainer_open.png"
      },
      stats: [
        { value: "28t", label: "Nutzlast", icon: "Package" },
        { value: "24/7", label: "Tracking", icon: "MapPin" },
        { value: "99.2%", label: "Pünktlich", icon: "Clock" },
        { value: "5 Mio", label: "EUR Vers.", icon: "Shield" }
      ]
    }
  },
  
  fleet: {
    title: "Unsere Flotte",
    subtitle: "Moderne, umweltfreundliche Fahrzeugflotte für alle Transportbedürfnisse",
    stats: [
      {
        value: "15.000+",
        target: 15000,
        suffix: "+",
        label: "Tonnen transportiert",
        sublabel: "pro Jahr",
        icon: "Package",
        visible: true
      },
      {
        value: "500+", 
        target: 500,
        suffix: "+",
        label: "Zufriedene Kunden",
        sublabel: "seit 1998",
        icon: "Users",
        visible: true
      },
      {
        value: "45",
        target: 45,
        label: "Moderne Fahrzeuge",
        sublabel: "Euro 6 Standard", 
        icon: "Truck",
        visible: true
      },
      {
        value: "200+",
        target: 200,
        suffix: "+",
        label: "Europäische Routen",
        sublabel: "täglich bedient",
        icon: "MapPin",
        visible: true
      }
    ],
    vehicleTypes: [
      {
        title: "Standard Container",
        features: [
          "20ft & 40ft Container",
          "Maximale Nutzlast: 28 Tonnen",
          "GPS-Tracking inklusive",
          "Temperaturüberwachung"
        ],
        visible: true
      },
      {
        title: "Spezialfahrzeuge",
        features: [
          "Kühlcontainer (-25°C bis +25°C)",
          "Gefahrguttransport (ADR)",
          "Schwerlasttransporte bis 40t", 
          "Überbreite Ladungen"
        ],
        visible: true
      },
      {
        title: "Service & Sicherheit", 
        features: [
          "24/7 Verfügbarkeit",
          "Live-Tracking & Updates",
          "Vollversicherung bis 5 Mio. EUR",
          "Qualifizierte Fahrer"
        ],
        visible: true
      }
    ],
    cta: {
      text: "Jetzt Transport anfragen",
      href: "#contact",
      icon: "ArrowRight",
      visible: true
    }
  },
  
  history: {
    title: "Unsere Geschichte",
    subtitle: "Über 25 Jahre Erfahrung – vom Familienunternehmen zum Marktführer",
    content: `
      <p>Seit über <strong class="text-gradient">25 Jahren</strong> führend im Containertransport. 
      Was als kleines Familienunternehmen begann, ist heute einer der führenden Spediteure in der Region.</p>
      <p>Heute transportieren wir <strong class="text-gradient">über 15.000 Tonnen</strong> jährlich 
      mit einem Team von <strong class="text-white">50+ Experten</strong>, die täglich für 
      sichere Transporte sorgen.</p>
    `,
    timeline: [
      {
        year: "1998",
        title: "Gründung",
        description: "Start als Familienunternehmen", 
        icon: "Calendar",
        visible: true
      },
      {
        year: "2010",
        title: "Expansion",
        description: "Europaweit tätig",
        icon: "Globe",
        visible: true
      },
      {
        year: "2025",
        title: "Marktführer",
        description: "Über 5000 Container",
        icon: "Award",
        visible: true
      }
    ],
    values: [
      {
        text: "Zuverlässigkeit und pünktliche Lieferung",
        visible: true
      },
      {
        text: "Maximale Sicherheit durch Vollversicherung", 
        visible: true
      },
      {
        text: "Persönliche Betreuung und Beratung",
        visible: true
      },
      {
        text: "Umweltbewusste Logistiklösungen",
        visible: true
      },
      {
        text: "Kontinuierliche Innovation und Digitalisierung",
        visible: true
      }
    ],
    stats: [
      {
        number: "25+",
        label: "Jahre Erfahrung",
        icon: "Calendar",
        visible: true
      },
      {
        number: "1000+",
        label: "Zufriedene Kunden",
        icon: "Users", 
        visible: true
      },
      {
        number: "5000+",
        label: "Container transportiert",
        icon: "Package",
        visible: true
      },
      {
        number: "50+",
        label: "Mitarbeiter",
        icon: "Users",
        visible: true
      }
    ]
  },
  
  contact: {
    heading: {
      prefix: "Jetzt",
      highlight: "Kontakt",
      suffix: "aufnehmen"
    },
    title: "Kontakt aufnehmen",
    subtitle:
      "Lassen Sie uns über Ihre Transportbedürfnisse sprechen. Wir erstellen Ihnen gerne ein maßgeschneidertes Angebot.",
    form: {
      badge: "Angebot anfordern",
      title: "Angebot anfordern",
      submitText: "Anfrage senden",
      fields: [
        { label: "Name", placeholder: "Ihr Name", required: true },
        { label: "Unternehmen", placeholder: "Ihr Unternehmen" },
        { label: "E-Mail", placeholder: "ihre@email.de", required: true },
        { label: "Telefon", placeholder: "06131 123456" },
        { label: "Nachricht", placeholder: "Beschreiben Sie Ihre Transportanforderungen..." }
      ]
    },
    contactDetails: {
      title: "Kontaktdaten",
      address: {
        label: "Adresse",
        value: "Container Transport Mainz GmbH\nIndustriestraße 42\n55116 Mainz"
      },
      phone: {
        label: "Telefon",
        numbers: [
          { label: "Telefon", value: "+49 (0) 6131 / 123 456" },
          { label: "Notfall", value: "+49 (0) 151 / 987 654" }
        ]
      },
      email: {
        label: "E-Mail",
        addresses: ["info@ctm-mainz.de", "service@ctm-mainz.de"]
      }
    },
    openingHours: {
      title: "Öffnungszeiten",
      schedule: [
        { day: "Montag - Freitag", time: "6:00 - 18:00 Uhr" },
        { day: "Samstag", time: "8:00 - 14:00 Uhr" },
        { day: "Sonntag", time: "Geschlossen" }
      ],
      emergency: {
        label: "24/7 Notdienst",
        status: "Verfügbar"
      }
    },
    imprint: {
      title: "Impressum",
      company: "Container Transport Mainz GmbH",
      management: "Geschäftsführer: Hans Müller · HRB 12345 · Amtsgericht Mainz",
      tax: "USt-IdNr.: DE123456789 · Steuer-Nr.: 12/345/67890",
      insurance: "Versicherung: Allianz Versicherung AG · Transportversicherung bis 5 Mio. EUR"
    }
  }
};