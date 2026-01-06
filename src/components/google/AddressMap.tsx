'use client';

import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

export function AddressMap({ lat, lng }: { lat?: number; lng?: number }) {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY!,
    libraries: ['places'],
  });

  if (loadError) return <div className="min-h-[500px] flex items-center justify-center text-red-400">Erreur de chargement de la carte Google Maps.</div>;

  if (!isLoaded) return <div className="min-h-[500px] flex items-center justify-center">Chargement…</div>;

  if (typeof lat !== 'number' || typeof lng !== 'number' || isNaN(lat) || isNaN(lng)) {
    return <div className="min-h-[500px] flex items-center justify-center text-gray-500">Coordonnées non valides ou inconnues.</div>;
  }

  return (
    <div aria-label="Carte de localisation du partenaire">
      <GoogleMap
        mapContainerStyle={{
          width: '100%',
          height: '300px',
          borderRadius: '1rem',
        }}
        center={{ lat, lng }}
        zoom={15}>
        <Marker position={{ lat, lng }} />
      </GoogleMap>
    </div>
  );
}
