import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'
import './mapa.css'
import iconUrl from '../../images/icons/round-pushpin.svg';

const MapComponent = ({ onLocationSelect }) => {
  const [position, setPosition] = useState(null);

  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        setPosition(e.latlng);
        onLocationSelect(e.latlng);
      },
    });

    return position === null ? null : (
      <Marker position={position} icon={L.icon({
        iconUrl: iconUrl,
        iconSize: [38, 95], 
        iconAnchor: [20, 65], 
        popupAnchor: [-3, -76] 
      })}>
        <Popup>
          Lat: {position.lat}, Lng: {position.lng}
        </Popup>
      </Marker>
    );
  };

  return (
    <MapContainer className= "mapa1" center={[40.030502, -3.604053]} zoom={13} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <LocationMarker />
    </MapContainer>
  );
};

export default MapComponent;