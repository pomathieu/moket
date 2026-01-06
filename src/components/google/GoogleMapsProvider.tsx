'use client';

import { ReactNode, useEffect, useState, createContext, useContext, useRef } from 'react';

type Libraries = ('places' | 'geometry' | 'drawing' | 'visualization')[];

interface GoogleMapsProviderProps {
  children: ReactNode;
  fallback?: ReactNode;
  libraries?: Libraries;
}

interface GoogleMapsContextValue {
  isLoaded: boolean;
  isLoading: boolean;
  error: string | null;
}

// Context pour partager l'état de chargement
const GoogleMapsContext = createContext<GoogleMapsContextValue>({
  isLoaded: false,
  isLoading: true,
  error: null,
});

// Hook pour accéder à l'état de Google Maps
export const useGoogleMaps = () => useContext(GoogleMapsContext);

// Singleton pour gérer le chargement
class GoogleMapsLoader {
  private static instance: GoogleMapsLoader;
  private loadPromise: Promise<void> | null = null;
  private isLoaded = false;
  private listeners: Set<(success: boolean, error?: Error) => void> = new Set();

  static getInstance(): GoogleMapsLoader {
    if (!GoogleMapsLoader.instance) {
      GoogleMapsLoader.instance = new GoogleMapsLoader();
    }
    return GoogleMapsLoader.instance;
  }

  isGoogleMapsLoaded(): boolean {
    return this.isLoaded || (typeof window !== 'undefined' && window.google?.maps !== undefined);
  }

  async load(libraries: Libraries = ['places']): Promise<void> {
    // Si déjà chargé
    if (this.isGoogleMapsLoaded()) {
      this.isLoaded = true;
      return Promise.resolve();
    }

    // Si en cours de chargement
    if (this.loadPromise) {
      return this.loadPromise;
    }

    // Créer la promesse de chargement
    this.loadPromise = new Promise((resolve, reject) => {
      // Vérifier s'il y a déjà un script
      const existingScript = document.querySelector('script[src*="maps.googleapis.com"]');

      if (existingScript) {
        // Attendre que le script existant soit chargé
        const checkInterval = setInterval(() => {
          if (window.google?.maps) {
            clearInterval(checkInterval);
            this.isLoaded = true;
            this.notifyListeners(true);
            resolve();
          }
        }, 100);

        // Timeout après 10 secondes
        setTimeout(() => {
          clearInterval(checkInterval);
          const error = new Error('Timeout loading Google Maps');
          this.notifyListeners(false, error);
          reject(error);
        }, 10000);

        return;
      }

      // Créer un nouveau script
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=${libraries.join(',')}`;
      script.async = true;
      script.defer = true;

      script.onload = () => {
        this.isLoaded = true;
        this.notifyListeners(true);
        resolve();
      };

      script.onerror = () => {
        const error = new Error('Failed to load Google Maps');
        this.notifyListeners(false, error);
        reject(error);
      };

      document.head.appendChild(script);
    });

    return this.loadPromise;
  }

  subscribe(callback: (success: boolean, error?: Error) => void): () => void {
    this.listeners.add(callback);

    // Si déjà chargé, notifier immédiatement
    if (this.isGoogleMapsLoaded()) {
      callback(true);
    }

    // Retourner une fonction de désinscription
    return () => {
      this.listeners.delete(callback);
    };
  }

  private notifyListeners(success: boolean, error?: Error) {
    this.listeners.forEach((callback) => callback(success, error));
  }
}

export default function GoogleMapsProvider({ children, fallback, libraries = ['places'] }: GoogleMapsProviderProps) {
  const [state, setState] = useState<GoogleMapsContextValue>(() => {
    const loader = GoogleMapsLoader.getInstance();
    return {
      isLoaded: loader.isGoogleMapsLoaded(),
      isLoading: !loader.isGoogleMapsLoaded(),
      error: null,
    };
  });

  const librariesRef = useRef(libraries);

  useEffect(() => {
    const loader = GoogleMapsLoader.getInstance();

    // Si déjà chargé, pas besoin de faire quoi que ce soit
    if (loader.isGoogleMapsLoaded()) {
      return;
    }

    // S'abonner aux changements
    const unsubscribe = loader.subscribe((success, error) => {
      setState({
        isLoaded: success,
        isLoading: false,
        error: error?.message || null,
      });
    });

    // Lancer le chargement
    loader.load(librariesRef.current).catch((error) => {
      setState({
        isLoaded: false,
        isLoading: false,
        error: error.message,
      });
    });

    return unsubscribe;
  }, []); // Pas de dépendances pour éviter les re-renders

  return (
    <GoogleMapsContext.Provider value={state}>
      {children}
      {state.isLoading && fallback}
    </GoogleMapsContext.Provider>
  );
}

// Composant helper pour afficher du contenu conditionnel
export function GoogleMapsLoaded({ children, fallback }: { children: ReactNode; fallback?: ReactNode }) {
  const { isLoaded, isLoading, error } = useGoogleMaps();

  if (error) {
    return <div className="text-red-500 text-sm p-2">Erreur: {error}</div>;
  }

  if (isLoading || !isLoaded) {
    return <>{fallback || null}</>;
  }

  return <>{children}</>;
}

// Hook pour charger Google Maps à la demande
export function useLoadGoogleMaps(libraries?: Libraries) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    try {
      setLoading(true);
      setError(null);
      const loader = GoogleMapsLoader.getInstance();
      await loader.load(libraries);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  return { load, loading, error };
}
