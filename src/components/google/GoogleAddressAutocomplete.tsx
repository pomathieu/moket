'use client';

import { useEffect, useRef, useState } from 'react';
import { MapPin } from 'lucide-react';
import { Input } from '../ui/input';
import { useJsApiLoader } from '@react-google-maps/api';

type OnAddressSelected = (address: string, lat: number, lng: number, placeId?: string, addressComponents?: google.maps.GeocoderAddressComponent[]) => void;

type Props = {
  value?: string;
  onAddressSelected: OnAddressSelected;
  label?: string;
  description?: string;
  error?: string;
  disabled?: boolean;
  placeholder?: string;
};

const libraries: 'places'[] = ['places'];

export function GoogleAddressAutocomplete({ value, onAddressSelected, label = 'Adresse', error, disabled = false, placeholder = 'Ex : 13 avenue de la gare, Paris' }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const [inputValue, setInputValue] = useState(value || '');

  // Utilise le hook de @react-google-maps/api au lieu de charger manuellement
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries,
  });

  // Initialiser l'autocomplete quand Google Maps est chargé
  useEffect(() => {
    if (!isLoaded || !inputRef.current || autocompleteRef.current) return;

    try {
      const autocomplete = new google.maps.places.Autocomplete(inputRef.current, {
        fields: ['formatted_address', 'geometry', 'place_id', 'address_components'],
        types: ['geocode'],
        componentRestrictions: undefined, // Permet tous les pays
      });

      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();

        if (place && place.formatted_address && place.geometry?.location) {
          const address = place.formatted_address;
          const lat = place.geometry.location.lat();
          const lng = place.geometry.location.lng();
          const placeId = place.place_id;

          setInputValue(address);
          onAddressSelected(address, lat, lng, placeId, place.address_components);
        }
      });

      autocompleteRef.current = autocomplete;
    } catch (error) {
      console.error("Erreur lors de l'initialisation de l'autocomplete:", error);
    }

    // Cleanup
    return () => {
      if (autocompleteRef.current) {
        google.maps.event.clearInstanceListeners(autocompleteRef.current);
        autocompleteRef.current = null;
      }
    };
  }, [isLoaded, onAddressSelected]);

  // Mettre à jour la valeur quand la prop value change
  useEffect(() => {
    if (value !== undefined) {
      setInputValue(value);
    }
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  if (loadError) {
    return (
      <div className="space-y-1">
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <MapPin className="w-5 h-5 text-red-400" />
          </span>
          <Input
            className="pl-10 border-red-500 bg-red-50"
            placeholder="Erreur de chargement Google Maps"
            disabled
          />
        </div>
        <p className="text-xs text-red-600">Impossible de charger Google Maps. Vérifiez votre clé API.</p>
      </div>
    );
  }

  return (
    <div className="space-y-1">
      <div className="relative">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <MapPin className="w-5 h-5 text-muted-foreground" />
        </span>

        <Input
          ref={inputRef}
          value={inputValue}
          onChange={handleInputChange}
          disabled={!isLoaded || disabled}
          className={`
            pl-10 transition-all duration-200
            ${error ? 'border-destructive focus-visible:ring-destructive' : ''}
            ${!isLoaded ? 'animate-pulse' : ''}
          `}
          placeholder={!isLoaded ? 'Chargement...' : placeholder}
        />

        {!isLoaded && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <div className="animate-spin w-4 h-4 border-2 border-muted-foreground border-t-transparent rounded-full" />
          </div>
        )}
      </div>

      {error && (
        <p className="text-xs text-destructive flex items-center gap-1">
          <span className="w-1 h-1 bg-destructive rounded-full" />
          {error}
        </p>
      )}
    </div>
  );
}
