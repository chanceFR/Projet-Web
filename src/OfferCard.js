import React, { useState } from 'react';
import { Card, Col, Button } from 'react-bootstrap';
import { MapContainer as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

function OfferCard({ offer }) {
  const [showMap, setShowMap] = useState(false);
    const [rentals, setRentals] = useState([]);
  const handleRent = (offer) => {
    setRentals([rentals, offer]); // Ajoute l'offre à la liste des locations
    console.log(offer);
  };

  const handleToggleShowMap = () => {
    setShowMap(!showMap);
  };

  // URL de l'icône personnalisée
const customIconUrl = 'https://static.vecteezy.com/system/resources/previews/000/571/524/non_2x/tool-icon-vector.jpg';

// Dimensions de l'icône personnalisée
const iconSize = [32, 32];
const iconAnchor = [16, 32];
const popupAnchor = [0, -32];

// Créer une icône personnalisée
const customIcon = L.icon({
  iconUrl: customIconUrl,
  iconSize: iconSize,
  iconAnchor: iconAnchor,
  popupAnchor: popupAnchor
});

  return (
    <Col md={4}>
      <Card style={{ width: '18rem' , marginTop:"20px"}}>
        <Card.Img variant="top" src={offer.imageUrl} className="custom-card-image" />
        <Card.Body>
          <Card.Title >{offer.title}</Card.Title>
          <Card.Text>{offer.description}</Card.Text>
          {showMap && (
            <div className="map-container">
              <LeafletMap center={[offer.location.latitude, offer.location.longitude]} zoom={13} style={{ height: '200px' }}>
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={[offer.location.latitude, offer.location.longitude]} icon={customIcon} >
                  <Popup>
                    <h3>{offer.title}</h3>
                    <p>{offer.description}</p>
                    <button onClick={() => handleRent(offer)}>Louer</button>
                  </Popup>
                </Marker>
              </LeafletMap>
            </div>
          )}
          <Button variant="secondary" onClick={handleToggleShowMap} className="mr-2">
            {showMap ? 'Masquer la carte' : 'Voir la carte'}
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default OfferCard;
