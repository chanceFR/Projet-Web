import React from 'react';
import { Container, Row } from 'react-bootstrap';
import OfferCard from './OfferCard'; // Importez le composant de carte d'offre

function MyRentalsPage({ rentals }) {
  return (
    <Container style={{paddingTop:"75px"}} className="mt-4">
      <div>
        <h1 style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold', fontSize: '24px', color: 'white', textAlign: 'center', top: '20px', borderBottom: '2px solid white',paddingBottom: '20px' }}>MES LOCATIONS</h1>
        <Row>
          {rentals.map((offer) => (
            <OfferCard key={offer.id} offer={offer} />
          ))}
        </Row>
      </div>
    </Container>
  );
}

export default MyRentalsPage;
