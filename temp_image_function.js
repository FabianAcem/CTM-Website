// WordPress-kompatible Bildpfade - Für Netlify optimiert
export const getImagePath = (imageName) => {
  // Für Netlify/Vite - direkte Pfade verwenden
  if (imageName.includes('Schiffcontainer_open')) {
    return "/Schiffcontainer_open.png";
  } else {
    return "/Schiffcontainer.png";
  }
};

export default getImagePath;
