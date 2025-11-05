import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import Header from '@/components/Header';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

// Centros de hemoterapia en Formosa Capital
const centers = [
  {
    id: 1,
    name: 'Centro Provincial de Hemoterapia',
    coordinates: [-58.1756, -26.1849],
    status: 'urgente',
    statusText: 'Necesita donantes urgente',
  },
  {
    id: 2,
    name: 'Hospital de Alta Complejidad (HAC)',
    coordinates: [-58.1726, -26.1900],
    status: 'bajo',
    statusText: 'Stock bajo',
  },
  {
    id: 3,
    name: 'Banco de Sangre del Hospital Central',
    coordinates: [-58.1800, -26.1780],
    status: 'completo',
    statusText: 'Stock completo',
  },
];

/**
 * @param {object} props
 * @param {any} props.user
 * @param {() => void} props.onLogout
 */
export default function MapPage({ user, onLogout }) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [tokenSaved, setTokenSaved] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    if (!tokenSaved || !mapContainer.current) return;

    // @ts-ignore
    mapboxgl.accessToken = mapboxToken;
    
    // Formosa Capital coordinates
    const formosaCenter = [-58.1756, -26.1849];

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: userLocation || formosaCenter,
      zoom: 13,
    });

    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Get user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userCoords = [position.coords.longitude, position.coords.latitude];
          setUserLocation(userCoords);
          
          if (map.current) {
            // Add user location marker
            new mapboxgl.Marker({ color: '#3b82f6' })
              .setLngLat(userCoords)
              .setPopup(new mapboxgl.Popup().setHTML('<strong>Tu ubicación</strong>'))
              .addTo(map.current);

            // Add 50m radius circle
            map.current.on('load', () => {
              if (!map.current) return;
              
              map.current.addSource('radius', {
                type: 'geojson',
                data: {
                  type: 'Feature',
                  properties: {},
                  geometry: {
                    type: 'Point',
                    coordinates: userCoords
                  }
                }
              });

              map.current.addLayer({
                id: 'radius',
                type: 'circle',
                source: 'radius',
                paint: {
                  'circle-radius': {
                    stops: [
                      [0, 0],
                      [20, 50 * 3.28084 / 0.3048] // 50m to pixels approximation
                    ],
                    base: 2
                  },
                  'circle-color': '#3b82f6',
                  'circle-opacity': 0.1,
                  'circle-stroke-color': '#3b82f6',
                  'circle-stroke-width': 2,
                  'circle-stroke-opacity': 0.5
                }
              });
            });

            map.current.flyTo({ center: userCoords, zoom: 14 });
          }
        },
        (error) => {
          console.error('Error getting location:', error);
          toast({
            title: "Error de ubicación",
            description: "No se pudo obtener tu ubicación",
            variant: "destructive",
          });
        }
      );
    }

    // Add center markers
    centers.forEach((center) => {
      const markerColor = center.status === 'urgente' ? '#ef4444' : 
                          center.status === 'bajo' ? '#f59e0b' : 
                          '#22c55e';

      const el = document.createElement('div');
      el.className = 'custom-marker';
      el.style.width = '40px';
      el.style.height = '40px';
      el.style.borderRadius = '50%';
      el.style.backgroundColor = markerColor;
      el.style.border = '3px solid white';
      el.style.boxShadow = '0 2px 8px rgba(0,0,0,0.3)';
      el.style.display = 'flex';
      el.style.alignItems = 'center';
      el.style.justifyContent = 'center';
      el.style.cursor = 'pointer';
      el.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>';

      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
        `<div style="padding: 8px;">
          <h3 style="margin: 0 0 8px 0; font-weight: bold; color: #8B1538;">${center.name}</h3>
          <p style="margin: 0; font-size: 14px; color: ${markerColor}; font-weight: 600;">${center.statusText}</p>
        </div>`
      );

      if (map.current) {
        new mapboxgl.Marker(el)
          .setLngLat(center.coordinates)
          .setPopup(popup)
          .addTo(map.current);
      }
    });

    return () => {
      map.current?.remove();
    };
  }, [tokenSaved, mapboxToken, userLocation, toast]);

  const handleSaveToken = () => {
    if (mapboxToken.trim()) {
      setTokenSaved(true);
      toast({
        title: "Token guardado",
        description: "El mapa se cargará en un momento",
      });
    } else {
      toast({
        title: "Error",
        description: "Por favor ingresa un token válido",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header user={user} onLogout={onLogout} />
      
      <div className="container mx-auto py-8 px-6">
        <h1 className="text-4xl font-bold text-primary mb-2 text-center">
          Centros de Donación - Formosa Capital
        </h1>
        <p className="text-muted-foreground mb-8 text-center">
          Encuentra el centro de hemoterapia más cercano
        </p>

        {!tokenSaved ? (
          <Card className="max-w-2xl mx-auto p-8">
            <h2 className="text-2xl font-bold text-primary mb-4">Configura el mapa</h2>
            <p className="text-muted-foreground mb-4">
              Para mostrar el mapa, necesitas un token de Mapbox. Puedes obtenerlo gratis en{' '}
              <a href="https://mapbox.com" target="_blank" rel="noopener noreferrer" className="text-accent underline">
                mapbox.com
              </a>
            </p>
            <div className="space-y-4">
              <Input
                type="text"
                placeholder="pk.eyJ1IjoiZXhhbX..."
                value={mapboxToken}
                onChange={(e) => setMapboxToken(e.target.value)}
              />
              <Button onClick={handleSaveToken} className="w-full">
                Guardar token y cargar mapa
              </Button>
            </div>
          </Card>
        ) : (
          <div className="relative">
            <div ref={mapContainer} className="w-full h-[600px] rounded-lg shadow-lg" />
            
            {/* Legend */}
            <Card className="absolute bottom-6 left-6 p-4 space-y-2 bg-card/95 backdrop-blur">
              <h3 className="font-bold text-sm mb-2">Estado de los centros:</h3>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-4 h-4 rounded-full bg-destructive"></div>
                <span>Urgente</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
                <span>Stock bajo</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-4 h-4 rounded-full bg-green-500"></div>
                <span>Stock completo</span>
              </div>
              <div className="flex items-center gap-2 text-sm pt-2 border-t">
                <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                <span>Tu ubicación</span>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}