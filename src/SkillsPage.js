import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

function SkillCard({ title, description, imageUrl }) {
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

function SkillPage() {
  // Supposez que vous ayez une liste de compétences
  const skills = [
    {
      title: 'Compétence 1',
      description: 'Description de la compétence 1',
      imageUrl: 'url_image_competence_1.jpg',
    },
    {
      title: 'Compétence 2',
      description: 'Description de la compétence 2',
      imageUrl: 'url_image_competence_2.jpg',
    },
    {
      title: 'Compétence 3',
      description: 'Description de la compétence 3',
      imageUrl: 'url_image_competence_3.jpg',
    },
    // Ajoutez d'autres compétences si nécessaire
  ];

  return (
    <Container>
      <h1>Compétences disponibles</h1>
      <Row>
        {skills.map((skill, index) => (
          <SkillCard
            key={index}
            title={skill.title}
            description={skill.description}
            imageUrl={skill.imageUrl}
          />
        ))}
      </Row>
    </Container>
  );
}

export default SkillPage;
