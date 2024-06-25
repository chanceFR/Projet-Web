import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

function SignUpForm() {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    motDePasse: '',
    verificationMotDePasse: '',
    age: '',
    metier: '',
    mail: '',
    adresse: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ajoutez ici la logique pour soumettre le formulaire
    console.log(formData);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formNom">
        <Form.Label>Nom</Form.Label>
        <Form.Control type="text" placeholder="Entrez votre nom" name="nom" value={formData.nom} onChange={handleChange} />
      </Form.Group>

      {/* Ajoutez les autres champs de formulaire de la même manière */}

      <Button variant="primary" type="submit">
        S'inscrire
      </Button>
    </Form>
  );
}

export default SignUpForm;
