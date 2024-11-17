'use client'

import { useRef, useEffect, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { useRouter } from 'next/navigation';  // Changed from next/router to next/navigation
import {getServiceIncidents} from '@/lib/incident-utils';

function App() {
  const router = useRouter();
  const mapRef = useRef<mapboxgl.Map | null>(null)
  const mapContainerRef = useRef(null)
  const [mapLoaded, setMapLoaded] = useState(false)

  useEffect(() => {
    if (!mapboxgl.accessToken) {
      mapboxgl.accessToken = 'pk.eyJ1IjoicmNyb2NrZXIxMyIsImEiOiIxcWJvcnNvIn0.k2YpWuQ5oL8qpnoL5BQ0pg'
    }
    
    if (mapRef.current) return;

    if (!mapContainerRef.current) {
      console.error('Map container element not found');
      return;
    }

    try {
      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-90.0515, 35.1495],
        zoom: 9
      });
      
      mapRef.current = map;

      // Wait for map to load before adding markers
      map.on('load', () => {
        setMapLoaded(true)

        const points = getServiceIncidents();
        
        // Add markers
        points.forEach(point => {
          // Create a default marker
          const marker = new mapboxgl.Marker()
            .setLngLat([Number(point.Coordinates?.longitude), Number(point.Coordinates?.latitude)])
            .addTo(map);

          // Add click event to the marker element
          const markerElement = marker.getElement();
          markerElement.addEventListener('click', () => {
            router.push(`/submit/${point.INCIDENT_ID}`);
          });

          // Add a mouseenter event listener to show the tooltip 
          markerElement.addEventListener('mouseenter', () => { const popup = new mapboxgl.Popup({ closeButton: false, closeOnClick: false }) .setLngLat([Number(point.Coordinates?.longitude), Number(point.Coordinates?.latitude)]) 
            .setHTML(`<div><p>Status: ${point.Status}</p><p>Category: ${point.CATEGORY}</p><p>Incident ID: ${point.INCIDENT_ID}</p><p>Points: ${point.Points}</p></div>`) .addTo(map); 
          markerElement.addEventListener('mouseleave', () => { popup.remove(); }); });
        });
      });

    } catch (error) {
      console.error('Error initializing map:', error)
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [router])

  return (
    <div className="relative h-screen w-screen">
      <div 
        ref={mapContainerRef}
        style={{ 
          height: '100%',
          width: '100%'
        }}
      />
      {!mapLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50">
          Loading map...
        </div>
      )}
    </div>
  )
}

export default App