import { useMemo } from "react";

const FALLBACK_SECTIONS = {
  header: {
    logo_text: "CTM",
    logo_bg_color: "#FFD700",
    logo_text_color: "#101010",
    navigation: [
      { text: "Start", icon: "Home", href: "hero", isPrimary: false },
      { text: "Leistungen", icon: "Layers", href: "services", isPrimary: false },
      { text: "Über uns", icon: "Users", href: "about", isPrimary: false },
      { text: "Flotte", icon: "Truck", href: "fleet", isPrimary: false },
      { text: "Kontakt", icon: "Mail", href: "kontakt", isPrimary: true },
    ],
    nav_items: [
      { text: "Start", icon: "Home", target: "hero" },
      { text: "Leistungen", icon: "Layers", target: "services" },
      { text: "Über uns", icon: "Users", target: "about" },
      { text: "Flotte", icon: "Truck", target: "fleet" },
      { text: "Kontakt", icon: "Mail", target: "kontakt", isPrimary: true },
    ],
    colors: {
      primary: "#FFD700",
    },
    primary_color: "#FFD700",
    logo_icon: "Truck",
  },
  services: {
    title: "Unsere Leistungen",
    subtitle: "Containerlogistik für Importeure, Speditionen und Terminals",
    cta: {
      text: "Jetzt Angebot anfordern",
      href: "#kontakt",
    },
    items: [
      {
        title: "Seecontainer Transporte",
        description: "Disposition und Transport von 20' bis 45' Containern inklusive Zollabfertigung.",
        highlight: "Europaweit",
        icon: "Ship",
      },
      {
        title: "Terminal Handling",
        description: "Sicheres Handling an Binnen- und Seehäfen mit eigenem Terminalnetzwerk.",
        highlight: "24/7",
        icon: "Warehouse",
      },
      {
        title: "Express-Läufe",
        description: "Zeitsensible Projekte mit Doppelbesatzung und Dauerfahrgenehmigungen.",
        highlight: "Express",
        icon: "Timer",
      },
      {
        title: "Projektlogistik",
        description: "Schwerlast- und Spezialtransporte inklusive Begleitung und Genehmigungen.",
        highlight: "Heavy",
        icon: "PackageSearch",
      },
    ],
  },
  history: {
    title: "Unsere Geschichte",
    subtitle: "Über 25 Jahre Erfahrung im Containertransport",
    content: `
      <p>Seit den frühen 90ern sichern wir Containerläufe für Industrie und Handel. Angefangen mit zwei LKWs, heute ein
      leistungsstarker Fuhrpark mit digitalen Prozessen und direkter Dispo.</p>
      <p>Unser Versprechen: zuverlässige Transporte, transparente Kommunikation und feste Ansprechpartner.</p>
    `,
    timeline: [
      { year: "1998", title: "Gründung", description: "Start als Familienunternehmen in Mainz.", icon: "Flag" },
      { year: "2008", title: "Fuhrpark 25+", description: "Ausbau um Doppelstock-Chassis und Kühlcontainer.", icon: "TrendingUp" },
      { year: "2022", title: "Digital Suite", description: "Einführung von Live-Tracking & Kundenportal.", icon: "MonitorSmartphone" },
    ],
    stats: [
      { number: "28 t", label: "Max. Nutzlast" },
      { number: "45", label: "Sattelzüge" },
      { number: "12", label: "Länder" },
      { number: "99,2%", label: "Termintreue" },
    ],
    values: [
      { text: "Direkte Disposition ohne Callcenter" },
      { text: "Eigene Werkstatt & Standorte" },
      { text: "Transparente Preise ohne Zuschläge" },
    ],
  },
  fleet: {
    title: "Unsere Flotte",
    subtitle: "Von Standard- bis Spezialchassis – für jede Container-Aufgabe gerüstet",
    stats: [
      { icon: "Truck", label: "Fahrzeuge", target: 45, suffix: "+" },
      { icon: "Users", label: "Fahrer-Team", value: "58" },
      { icon: "Package", label: "TEU im Monat", value: "1.200" },
      { icon: "MapPin", label: "Terminals", value: "11" },
    ],
    vehicle_types: [
      {
        title: "Standard & High-Cube",
        features: ["20' / 40' / 45' Container", "Multi-Lock Twistlocks", "ADR Ausstattung"],
      },
      {
        title: "Kühl- und Tankcontainer",
        features: ["Dieselaggregate", "Temperaturüberwachung", "Spezial-Schlauchanschlüsse"],
      },
      {
        title: "Projektlogistik",
        features: ["Tiefbett- und Verlängerungsfahrzeuge", "Schwerlast bis 55 t", "BF3 Begleitservice"],
      },
    ],
    cta: {
      text: "Jetzt Transport anfragen",
      href: "#kontakt",
    },
  },
  contact: {
    title: "Jetzt Kontakt aufnehmen",
    subtitle: "Lassen Sie uns über Ihre Transportanforderungen sprechen. Wir erstellen Ihnen gerne ein maßgeschneidertes Angebot.",
    recipient: "info@ctm-mainz.de",
    cc: ["service@ctm-mainz.de"],
    info: {
      address: {
        label: "Adresse",
        lines: [
          "Container Transport Mainz GmbH",
          "Industriestraße 42",
          "55116 Mainz",
        ],
      },
      phones: [
        { label: "Telefon", number: "+49 (0) 6131 / 123 456" },
        { label: "Notfall", number: "+49 (0) 151 / 987 654" },
      ],
      emails: [
        { label: "E-Mail", address: "info@ctm-mainz.de" },
        { label: "Service", address: "service@ctm-mainz.de" },
      ],
    },
    officeHours: [
      { day: "Montag - Freitag", time: "6:00 - 18:00 Uhr" },
      { day: "Samstag", time: "8:00 - 14:00 Uhr" },
      { day: "Sonntag", time: "Geschlossen" },
    ],
    availability: {
      label: "24/7 Notdienst",
      status: "Verfügbar",
    },
    imprint: [
      {
        label: "Container Transport Mainz GmbH",
        value: "Geschäftsführer: Hans Müller · HRB 12345 · Amtsgericht Mainz",
      },
      {
        label: "USt-IdNr.",
        value: "DE123456789 · Steuer-Nr. 12/345/67890",
      },
      {
        label: "Versicherung",
        value: "Allianz Versicherung AG · Transportversicherung bis 5 Mio. EUR",
      },
    ],
    form: {
      submitLabel: "Anfrage senden",
      successTitle: "Danke für Ihre Nachricht!",
      successMessage: "Wir melden uns schnellstmöglich bei Ihnen.",
      errorTitle: "Versand fehlgeschlagen",
      errorMessage: "Bitte versuchen Sie es erneut oder rufen Sie uns direkt an.",
      privacyNotice: "Mit dem Absenden stimmen Sie der Verarbeitung Ihrer Daten gemäß unserer Datenschutzerklärung zu.",
    },
  },
};

export function useSection(sectionKey) {
  return useMemo(() => {
    if (sectionKey === "header") {
      return { sectionData: FALLBACK_SECTIONS.header, loading: false };
    }
    return FALLBACK_SECTIONS[sectionKey] || {};
  }, [sectionKey]);
}
