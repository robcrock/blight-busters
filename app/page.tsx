'use client'

import { useRef, useEffect, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

function App() {
  const mapRef = useRef(null)
  const mapContainerRef = useRef(null)
  const [mapLoaded, setMapLoaded] = useState(false)

  useEffect(() => {
    if (!mapboxgl.accessToken) {
      mapboxgl.accessToken = 'pk.eyJ1IjoicmNyb2NrZXIxMyIsImEiOiIxcWJvcnNvIn0.k2YpWuQ5oL8qpnoL5BQ0pg'
    }
    
    // Return early if map is already initialized
    if (mapRef.current) return;

    try {
      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-90.0515, 35.1495],
        zoom: 9
      });

      // Save map instance
      mapRef.current = map;

      // Handle both map load and style load
      map.on('style.load', () => {
        console.log('Style loaded')
        setMapLoaded(true)
      });

      map.on('error', (e) => {
        console.error('Mapbox error:', e)
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
  }, [])

  return (
    <div className="relative">
      <div 
        ref={mapContainerRef}
        style={{ 
          height: '500px',
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
