import 'leaflet/dist/leaflet.css'
import './MapComponent.css'
import React, { useState, useEffect } from 'react';
import { MapContainer, Polyline, TileLayer } from 'react-leaflet'
const decodePolyline = require('decode-google-map-polyline')



export default function MapComponent({ gpx }) {
  const [polyline, setPolyline] = useState(null)
  useEffect(() => {
    async function getPolyline() {
      const decoded = decodePolyline(gpx)
      const positions = decoded.map(p => {
        return { lat: p.lat, lng: p.lng }
      })
      setPolyline(positions)
    }

    getPolyline()

  }, [gpx])

  if (!polyline) {
    return null
  }

  const middleIndex = Math.floor(polyline.length / 25);


  return (
    <MapContainer
      zoom={10.4}
      center={polyline[middleIndex]}
      scrollWheelZoom={true}
      
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Polyline
        pathOptions={{ fillColor: 'red', color: 'red' }}
        positions={polyline}
      />
    </MapContainer>
  )
}

// style={{height: '300px', width: '500px'}}
