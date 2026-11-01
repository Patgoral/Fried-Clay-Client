import 'leaflet/dist/leaflet.css'
import './MapComponent.css'
import React, { useState, useEffect, useMemo } from 'react'
import { MapContainer, Polyline, TileLayer } from 'react-leaflet'
import { routePolyline } from '../../utils/routePolyline'
import { routePolylineOld } from '../../utils/routePolylineOld'

const decodePolyline = require('decode-google-map-polyline')

export default function MapComponent({ gpx, year }) {
  const [polyline, setPolyline] = useState(null)
  const [basePolyline, setBasePolyline] = useState(null)

  const baseRoute = useMemo(() => {
    return year < 2026 ? routePolylineOld : routePolyline
  }, [year])

  useEffect(() => {
    const decoded = decodePolyline(gpx)
    const positions = decoded.map((p) => ({
      lat: p.lat,
      lng: p.lng,
    }))
    setPolyline(positions)
  }, [gpx])

  useEffect(() => {
    const decoded = decodePolyline(baseRoute)
    const positions = decoded.map((p) => ({
      lat: p.lat,
      lng: p.lng,
    }))
    setBasePolyline(positions)
  }, [baseRoute])

  if (!polyline || !basePolyline) {
    return null
  }

  const bounds = [...basePolyline, ...polyline].map((p) => [p.lat, p.lng])

  return (
    <MapContainer
      bounds={bounds}
      boundsOptions={{ padding: [16, 16] }}
      scrollWheelZoom={true}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Polyline pathOptions={{ color: 'red' }} positions={basePolyline} />
      <Polyline pathOptions={{ color: 'blue' }} positions={polyline} />
    </MapContainer>
  )
}