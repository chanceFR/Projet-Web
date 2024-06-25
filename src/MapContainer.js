import React from 'react';
import { MapContainer as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';


function MapContainer({ offers, mapPosition }) {
  const position = [43.9289, 2.1466]; // Position d'Albi
  const zoom = 13;

  // Fonction pour générer des valeurs aléatoires dans une plage spécifique
  const generateRandomInRange = (min, max) => {
    return Math.random() * (max - min) + min;
  };

  return (
    <LeafletMap center={mapPosition || position} zoom={zoom} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {/* Ajoutez les marqueurs pour chaque offre */}
      {offers &&
        offers.map((offer) => {
          const latitude =
            offer.location && offer.location.latitude !== null ? offer.location.latitude : generateRandomInRange(43.92, 43.94);
          const longitude =
            offer.location && offer.location.longitude !== null ? offer.location.longitude : generateRandomInRange(2.14, 2.16);

          return (
            <Marker position={[latitude, longitude]} key={offer.id}>
              <Popup>
                <h3>{offer.title}</h3>
                <p>{offer.description}</p>
              </Popup>
            </Marker>
          );
        })}
    </LeafletMap>
  );
}

export default MapContainer;
