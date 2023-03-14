import React, { useState, useEffect } from 'react';
import { MapContainer, Polyline, TileLayer } from 'react-leaflet'

export default function MapComponent({ gpx }) {
  const [polyline, setPolyline] = useState(null)

  useEffect(() => {
    async function getPolyline() {
      const positions = await gpx.map(p => [p.lat, p.long])
      const polyline = <Polyline pathOptions={{ fillColor: 'red', color: 'blue' }} positions={positions} />
      setPolyline(polyline)
    }

    getPolyline()
  }, [gpx])

  if (!polyline) {
    return null
  }

  const centerIndex = Math.floor(gpx.length / 15)
  const center = [gpx[centerIndex].lat, gpx[centerIndex].long]

  return (
    <MapContainer
      zoom={10}
      style={{ height: '400px', width: '600px' }}
      center={center}
      scrollWheelZoom={true}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Polyline
        pathOptions={{ fillColor: 'red', color: 'blue' }}
        positions={polyline.props.positions}
      />
    </MapContainer>
  )
}

// style={{height: '300px', width: '500px'}}
