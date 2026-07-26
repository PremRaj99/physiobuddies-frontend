import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPin, LocateFixed } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

// Fix Leaflet default icon paths in bundled applications
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
  iconUrl,
  iconRetinaUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

interface LocationPickerMapProps {
  coords: { lat: number; lng: number };
  onChange: (coords: { lat: number; lng: number }) => void;
}

export const LocationPickerMap: React.FC<LocationPickerMapProps> = ({ coords, onChange }) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const [isLocating, setIsLocating] = useState(false);

  // Initialize Leaflet map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current).setView([coords.lat, coords.lng], 13);

      // OpenStreetMap Free Tile Layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(map);

      // Add Draggable Marker
      const marker = L.marker([coords.lat, coords.lng], { draggable: true }).addTo(map);

      // Update coords on marker dragend
      marker.on('dragend', () => {
        const position = marker.getLatLng();
        const newLat = parseFloat(position.lat.toFixed(6));
        const newLng = parseFloat(position.lng.toFixed(6));
        onChange({ lat: newLat, lng: newLng });
      });

      // Update coords on map click
      map.on('click', (e: L.LeafletMouseEvent) => {
        const newLat = parseFloat(e.latlng.lat.toFixed(6));
        const newLng = parseFloat(e.latlng.lng.toFixed(6));
        marker.setLatLng([newLat, newLng]);
        onChange({ lat: newLat, lng: newLng });
      });

      mapInstanceRef.current = map;
      markerRef.current = marker;
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
        markerRef.current = null;
      }
    };
  }, []);

  // Pan map & update marker when external coords change
  useEffect(() => {
    if (mapInstanceRef.current && markerRef.current) {
      const currentPos = markerRef.current.getLatLng();
      if (currentPos.lat !== coords.lat || currentPos.lng !== coords.lng) {
        markerRef.current.setLatLng([coords.lat, coords.lng]);
        mapInstanceRef.current.panTo([coords.lat, coords.lng]);
      }
    }
  }, [coords.lat, coords.lng]);

  // Handle GPS location detection
  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      toast.error('Geolocation is not supported by your browser.');
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = parseFloat(position.coords.latitude.toFixed(6));
        const lng = parseFloat(position.coords.longitude.toFixed(6));
        onChange({ lat, lng });
        if (mapInstanceRef.current && markerRef.current) {
          markerRef.current.setLatLng([lat, lng]);
          mapInstanceRef.current.setView([lat, lng], 15);
        }
        setIsLocating(false);
        toast.success(`Location pinned: Lat ${lat}, Lng ${lng}`);
      },
      (error) => {
        setIsLocating(false);
        toast.error(`Unable to retrieve location: ${error.message}`);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  return (
    <div className="mt-4 space-y-3 rounded-lg border border-[#a9d6e5] bg-white p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-[#014f86]" />
          <span className="font-semibold text-sm text-[#012a4a]">Interactive Map Location Picker (Leaflet)</span>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="border-[#014f86] text-[#014f86] hover:bg-[#014f86]/10"
          onClick={handleDetectLocation}
          disabled={isLocating}
        >
          <LocateFixed className="mr-2 h-4 w-4" />
          {isLocating ? 'Locating...' : 'Use Current GPS Location'}
        </Button>
      </div>

      <div className="relative h-64 w-full overflow-hidden rounded-md border border-gray-200 shadow-inner">
        <div ref={mapContainerRef} className="h-full w-full z-0" />
        <div className="absolute top-2 right-2 z-[1000] rounded-md bg-white/90 px-3 py-1 text-xs font-mono shadow text-[#012a4a]">
          Click map or drag pin
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 pt-1">
        <div>
          <Label htmlFor="lat-input" className="text-xs text-muted-foreground">Latitude</Label>
          <Input
            id="lat-input"
            type="number"
            step="any"
            value={coords.lat}
            onChange={(e) => onChange({ ...coords, lat: parseFloat(e.target.value) || 0 })}
            className="h-8 text-xs font-mono"
          />
        </div>
        <div>
          <Label htmlFor="lng-input" className="text-xs text-muted-foreground">Longitude</Label>
          <Input
            id="lng-input"
            type="number"
            step="any"
            value={coords.lng}
            onChange={(e) => onChange({ ...coords, lng: parseFloat(e.target.value) || 0 })}
            className="h-8 text-xs font-mono"
          />
        </div>
      </div>
    </div>
  );
};
