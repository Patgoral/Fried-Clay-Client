// import 'leaflet/dist/leaflet.css'
import React, { useState, useEffect } from 'react';
import { MapContainer, Polyline, TileLayer } from 'react-leaflet'


export default function MapComponent({ gpx }) {
  const [positions, setPositions] = useState([])

  useEffect(() => {
    async function getPositions() {
      const positions = await gpx.tracks[0].points.map(p => [p.lat, p.lon])
      setPositions(positions)
    }

    getPositions()
  }, [gpx])

  if (positions.length === 0) {
    return null
  }

  return (
    <MapContainer
      zoom={10}
      style={{ height: '300px', width: '500px' }}
      center={positions[200]}
      scrollWheelZoom={true}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Polyline
        pathOptions={{ fillColor: 'red', color: 'blue' }}
        positions={positions}
      />
    </MapContainer>
  )
}

// style={{height: '300px', width: '500px'}}
