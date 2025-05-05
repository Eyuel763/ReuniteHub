import React, { forwardRef, useImperativeHandle } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const customIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30],
});

const ethiopiaBounds = {
  north: 15.0,
  south: 3.3,
  west: 33.0,
  east: 48.0,
};

// 🧭 Helper for map centering
const InnerMap = forwardRef(({ markers }, ref) => {
  const map = useMap();

  useImperativeHandle(ref, () => ({
    centerMapTo: (coords) => {
      map.setView(coords, 15); // Zoom level
    },
  }));

  return null;
});

// 🌍 Main Map Component (read-only)
const ControlledMap = forwardRef(({ markers }, ref) => (
  <section className="w-full h-[500px] md:h-[600px]">
    <MapContainer
      center={[9.145, 40.4897]}
      zoom={6}
      minZoom={5}
      maxBounds={[
        [ethiopiaBounds.south, ethiopiaBounds.west],
        [ethiopiaBounds.north, ethiopiaBounds.east],
      ]}
      maxBoundsViscosity={1.0}
      scrollWheelZoom={false}
      className="w-full h-full rounded shadow"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a>'
      />

      {markers.map(marker => (
        <Marker key={marker.id} position={marker.position} icon={customIcon}>
          <Popup>
            <strong>{marker.name}</strong><br />
            Status: {marker.status === 'verified' ? '✅ Verified' : '⚠️ Unverified'}
          </Popup>
        </Marker>
      ))}

      <InnerMap ref={ref} markers={markers} />
    </MapContainer>
  </section>
));

export default ControlledMap;
