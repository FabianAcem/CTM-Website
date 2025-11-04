import { useEffect, useState, useRef } from 'react';

/**
 * Hook für Intersection Observer basierte Animationen
 * @param {Object} options - Intersection Observer Optionen
 * @returns {[ref, isVisible]} - Ref für Element und Sichtbarkeitsstatus
 */
export function useScrollAnimation(options = {}) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.1,
        rootMargin: '-50px 0px',
        ...options,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  return [ref, isVisible];
}

/**
 * Hook für gestaffelte Animationen (z.B. für Listen)
 * @param {number} itemCount - Anzahl der Items
 * @param {number} delay - Verzögerung zwischen Items in ms
 * @returns {[ref, visibleItems]} - Ref für Container und Array der sichtbaren Items
 */
export function useStaggeredAnimation(itemCount, delay = 150) {
  const [isVisible, setIsVisible] = useState(false);
  const [visibleItems, setVisibleItems] = useState([]);
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1, rootMargin: '-50px 0px' }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      // Items gestaffelt sichtbar machen
      for (let i = 0; i < itemCount; i++) {
        setTimeout(() => {
          setVisibleItems(prev => [...prev, i]);
        }, i * delay);
      }
    } else {
      // Reset wenn nicht mehr sichtbar
      setVisibleItems([]);
    }
  }, [isVisible, itemCount, delay]);

  return [ref, visibleItems];
}

/**
 * Scroll-to-Element Funktion mit smooth behavior
 * @param {string} elementId - ID des Ziel-Elements
 * @param {number} offset - Offset in Pixeln (für feste Header etc.)
 */
export function scrollToElement(elementId, offset = 80) {
  const element = document.getElementById(elementId);
  if (element) {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
}

/**
 * Animationsklassen für fade-in Effekte
 */
export const fadeInClasses = {
  hidden: "opacity-0 translate-y-8",
  visible: "opacity-100 translate-y-0",
  transition: "transition-all duration-700 ease-out"
};

/**
 * Animationsklassen für slide-in Effekte
 */
export const slideInClasses = {
  fromLeft: {
    hidden: "opacity-0 -translate-x-8",
    visible: "opacity-100 translate-x-0",
    transition: "transition-all duration-700 ease-out"
  },
  fromRight: {
    hidden: "opacity-0 translate-x-8", 
    visible: "opacity-100 translate-x-0",
    transition: "transition-all duration-700 ease-out"
  }
};