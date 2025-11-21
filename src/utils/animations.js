import { useEffect, useState, useRef } from 'react';

/**
 * Hook für Intersection Observer basierte Animationen
 * @param {Object} options - Intersection Observer Optionen
 * @returns {[ref, isVisible]} - Ref für Element und Sichtbarkeitsstatus
 */
export function useScrollAnimation({ threshold = 0.1, rootMargin = '-50px 0px', root = null } = {}) {
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
        threshold,
        rootMargin,
        root,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, root]);

  return [ref, isVisible];
}

/**
 * Hook für gestaffelte Animationen (z.B. für Listen)
 * @param {number} itemCount - Anzahl der Items
 * @param {number} delay - Verzögerung zwischen Items in ms
 * @returns {[ref, visibleItems]} - Ref für Container und Array der sichtbaren Items
 */
export function useStaggeredAnimation(itemCount, delay = 150, options = {}) {
  const {
    rootMargin = '-50px 0px',
    threshold = 0.1,
    once = false,
    startDelay = 0
  } = options;

  const [visibleItems, setVisibleItems] = useState([]);
  const [triggerId, setTriggerId] = useState(0);
  const ref = useRef(null);
  const timersRef = useRef([]);

  const clearTimers = () => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  };

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTriggerId(prev => prev + 1);
        } else if (!once) {
          clearTimers();
          setVisibleItems([]);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      clearTimers();
      observer.disconnect();
    };
  }, [threshold, rootMargin, once]);

  useEffect(() => {
    clearTimers();

    if (!itemCount || triggerId === 0) {
      setVisibleItems([]);
      return () => clearTimers();
    }

    for (let i = 0; i < itemCount; i++) {
      const timer = setTimeout(() => {
        setVisibleItems(prev => (prev.includes(i) ? prev : [...prev, i]));
      }, startDelay + i * delay);
      timersRef.current.push(timer);
    }

    return () => clearTimers();
  }, [triggerId, itemCount, delay, startDelay]);

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