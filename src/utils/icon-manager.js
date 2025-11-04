import * as LucideIcons from "lucide-react";

/**
 * Liefert eine Lucide Icon-Komponente anhand eines Namens.
 * Fällt auf Circle zurück, wenn das Icon nicht existiert.
 */
export function getIcon(name) {
  if (!name) {
    return LucideIcons.Circle;
  }

  const iconKey = Object.prototype.hasOwnProperty.call(LucideIcons, name)
    ? name
    : Object.keys(LucideIcons).find((key) => key.toLowerCase() === String(name).toLowerCase());

  return iconKey ? LucideIcons[iconKey] : LucideIcons.Circle;
}
