import { useState, useEffect } from "react";

// ====================================================================
// 1. KONFIGURATION (MUSS ANGEPASST WERDEN!)
// ====================================================================

// Die URL Ihrer Local WordPress Installation (z.B. http://localhost:8888)
const WP_BASE_URL = 'http://ctm-landing.local'; 

// Die ID Ihrer Landingpage in WordPress (z.B. aus der URL post=123)
const PAGE_ID = 2; // *** ANGEPASST AUF KORREKTE PAGE ID ***

// Der Custom Endpoint, der die strukturierten Sektionsdaten liefert
const API_ENDPOINT = `${WP_BASE_URL}/wp-json/ctm/v1/data/${PAGE_ID}`;


// ====================================================================
// 2. HAUPT-HOOK: API DATEN ABRUFEN (MIT CACHE-BUSTING)
// ====================================================================

export const useFetchAllData = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      // CORS-Problembehebung: Führt Fetch nur im Browser aus
      if (typeof window === 'undefined') {
        setLoading(false);
        return; 
      }
      
      setLoading(true);
      try {
        // Hängt einen zufälligen Parameter an, um den Browser-Cache zu umgehen
        const cacheBusterURL = `${API_ENDPOINT}?cache_buster=${Date.now()}`;
        
        const response = await fetch(cacheBusterURL); // <-- KORRIGIERT: Verwendet Cache-Buster-URL
        if (!response.ok) {
          throw new Error(`API Fehler: Status ${response.status} von ${API_ENDPOINT}`);
        }
        const jsonData = await response.json();
        // Die ACF-Daten sind nun im State gespeichert (z.B. { hero: {...}, services: {...} })
        setData(jsonData); 
      } catch (error) {
        console.error("Fehler beim Abrufen der WordPress-Daten:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []); 

  return { data, loading };
};

// ====================================================================
// 2B. VEREINFACHTER HOOK FÜR FLACHE DATENSTRUKTUR
// ====================================================================

export const useWordPressData = () => {
  const { data, loading } = useFetchAllData();

  useEffect(() => {
    if (data && Object.keys(data).length > 0) {
      console.log("🔍 WordPress Data received:", data);
      console.log("🔍 Values headline:", data.values_headline);
      console.log("🔍 All keys:", Object.keys(data));
    }
  }, [data]);

  return { data, loading };
};