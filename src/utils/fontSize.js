const VARIANT_MAP = {
  display: {
    xs: "1.8rem",
    s: "2.1rem",
    m: "2.5rem",
    l: "2.9rem",
    xl: "3.3rem",
  },
  body: {
    xs: "0.85rem",
    s: "0.95rem",
    m: "1.05rem",
    l: "1.2rem",
    xl: "1.35rem",
  },
  detail: {
    xs: "0.7rem",
    s: "0.75rem",
    m: "0.82rem",
    l: "0.9rem",
    xl: "1rem",
  },
};

VARIANT_MAP.heading = VARIANT_MAP.display;
VARIANT_MAP.title = VARIANT_MAP.display;

const LEGACY_TOKEN_MAP = {
  "x-small": "0.75rem",
  "s_small": "0.875rem",
  "s_medium": "1rem",
  "s_large": "1.25rem",
  small: "1.8rem",
  medium: "2.2rem",
  large: "2.5rem",
  "x-large": "3rem",
};

const DIRECT_VALUE_PATTERN = /^-?\d*\.?\d+(px|rem|em|vh|vw|%)$/i;

const SAFE_KEYWORDS = new Set(["inherit", "initial", "unset", "auto"]);

export const FONT_SIZE_CHOICES = [
  { value: "xs", label: "Sehr klein" },
  { value: "s", label: "Klein" },
  { value: "m", label: "Mittel" },
  { value: "l", label: "Groß" },
  { value: "xl", label: "Sehr groß" },
];

export function resolveFontSize(option, variant = "body", fallback) {
  if (option == null || option === "") {
    return fallback;
  }

  const normalizedKey = String(option).trim().toLowerCase();
  const variantConfig = VARIANT_MAP[variant] || VARIANT_MAP.body;

  if (variantConfig[normalizedKey]) {
    return variantConfig[normalizedKey];
  }

  if (LEGACY_TOKEN_MAP[normalizedKey]) {
    return LEGACY_TOKEN_MAP[normalizedKey];
  }

  if (DIRECT_VALUE_PATTERN.test(normalizedKey) || SAFE_KEYWORDS.has(normalizedKey)) {
    return String(option).trim();
  }

  return fallback !== undefined ? fallback : variantConfig.m;
}

export function getFontSizeChoices() {
  return FONT_SIZE_CHOICES.map((choice) => ({ ...choice }));
}
