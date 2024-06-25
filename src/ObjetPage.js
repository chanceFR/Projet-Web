import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

function OfferCard({ title, description, imageUrl }) {
  return (
    <Col md={4}>
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={imageUrl} />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>{description}</Card.Text>
          <Button variant="primary">Voir plus</Button>
        </Card.Body>
      </Card>
    </Col>
  );
}

function ObjetPage() {
  // Supposez que vous ayez une liste d'offres d'objets
  const offers = [
    {
      title: 'Offre 1',
      description: 'Description de l\'offre 1',
      imageUrl: 'url_image_offre_1.jpg',
    },
    {
      title: 'Offre 2',
      description: 'Description de l\'offre 2',
      imageUrl: 'url_image_offre_2.jpg',
    },
    {
      title: 'Offre 3',
      description: 'Description de l\'offre 3',
      imageUrl: 'url_image_offre_3.jpg',
    },
    // Ajoutez d'autres offres si nécessaire
  ];

  return (
    <Container>
      <h1>Offres d'objets disponibles</h1>
      <Row>
        {offers.map((offer, index) => (
          <OfferCard
            key={index}
            title={offer.title}
            description={offer.description}
            imageUrl={offer.imageUrl}
          />
        ))}
      </Row>
    </Container>
  );
}

export default ObjetPage;
