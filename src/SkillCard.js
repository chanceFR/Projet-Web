import React, { useState } from 'react';
import { Card, Col, Button } from 'react-bootstrap';
import { MapContainer as LeafletMap, TileLayer, Circle, Popup } from 'react-leaflet';

function SkillCard({ skill }) {
  const [showMap, setShowMap] = useState(false);

  const handleToggleShowMap = () => {
    setShowMap(!showMap);
  };

  return (
    <Col md={4}>
      <Card style={{ width: '18rem', marginTop:"20px" }}>
        <Card.Img variant="top" src={skill.imageUrl} className="custom-card-image" />
        <Card.Body>
          <Card.Title>{skill.title}</Card.Title>
          <Card.Text>{skill.description}</Card.Text>
          {showMap && (
            <div className="map-container">
              <LeafletMap center={[skill.location.latitude, skill.location.longitude]} zoom={13} style={{ height: '200px' }}>
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Circle
                  center={[skill.location.latitude, skill.location.longitude]}
                  radius={1000} // Changez le rayon selon vos besoins
                >
                  <Popup>
                    <h3>{skill.title}</h3>
                    <p>{skill.description}</p>
                  </Popup>
                </Circle>
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

export default SkillCard;
