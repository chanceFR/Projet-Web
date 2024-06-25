import React, { useState } from 'react';
import { Navbar, Nav, Button, Form, FormControl, NavDropdown } from 'react-bootstrap';
import { Container, Row, Col, Card } from 'react-bootstrap';
import MapContainer from './MapContainer'; // Importez le composant de la carte
import OfferCard from './OfferCard';
import SkillCard from './SkillCard'; // Importez le composant de l'offre
import 'leaflet/dist/leaflet.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import logo from './logo.svg';
import { Carousel } from 'react-bootstrap';
import MyRentalsPage from './MyRentalsPage';
import axios from 'axios';


const initialSkills = [
  {
    id: 1,
    title: 'Plombier',
    description: 'Réparation des installations sanitaires',
    imageUrl:'https://images.unsplash.com/photo-1517646287270-a5a9ca602e5c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGxvbWJpZXJ8ZW58MHx8MHx8fDA%3D',
    location: { latitude: 43.9289, longitude: 2.1466 } // Albi
  },
  {
    id: 2,
    title: 'Cuisinier',
    description: 'Préparation des repas',
    imageUrl:'https://images.unsplash.com/photo-1607615764542-c591aecb2222?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y3Vpc2luaWVyfGVufDB8fDB8fHww',
    location: { latitude: 43.9312, longitude: 2.1475 } // Albi
  },
  {
    id: 3,
    title: 'Mécanicien automobile',
    description: 'Réparation des voitures',
    imageUrl:'https://images.unsplash.com/photo-1504222490345-c075b6008014?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bSVDMyVBOWNhbmljaWVufGVufDB8fDB8fHww',
    location: { latitude: 43.9309, longitude: 2.1419 } // Albi
  },
  {
    id: 4,
    title: 'Infirmier',
    description: 'Soins médicaux aux patients',
    imageUrl:'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8aW5maXJtaWVyfGVufDB8fDB8fHww',
    location: { latitude: 43.9321, longitude: 2.1410 } // Albi
  },
  {
    id: 5,
    title: 'Electricien',
    description: 'Installation et maintenance électrique',
    imageUrl:'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZWxlY3RyaWNpZW58ZW58MHx8MHx8fDA%3D',
    location: { latitude: 43.9295, longitude: 2.1460 } // Albi
  },
  {
    id: 6,
    title: 'Menuisier',
    description: 'Travail du bois et fabrication de meubles',
    imageUrl:'https://images.unsplash.com/photo-1561297331-a9c00b9c2c44?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bWVudWlzaWVyfGVufDB8fDB8fHww',
    location: { latitude: 43.9315, longitude: 2.1467 } // Albi
  },
  {
    id: 7,
    title: 'Secrétaire',
    description: 'Gestion administrative et organisation de documents',
    imageUrl:'https://images.unsplash.com/photo-1558949623-35b2e2649754?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2VjcmV0YWlyZXxlbnwwfHwwfHx8MA%3D%3D',
    location: { latitude: 43.9310, longitude: 2.1440 } // Albi
  },
  {
    id: 8,
    title: 'Professeur',
    description: 'Enseignement et transmission de connaissances',
    imageUrl:'https://images.unsplash.com/photo-1590402494682-cd3fb53b1f70?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cHJvZmVzc2V1cnxlbnwwfHwwfHx8MA%3D%3D',
    location: { latitude: 43.9302, longitude: 2.1452 } // Albi
  },
  {
    id: 9,
    title: 'Artisan boulanger',
    description: 'Fabrication de pains et pâtisseries',
    imageUrl:'https://images.unsplash.com/photo-1560427183-4efd29c38997?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Ym91bGFuZ2VyfGVufDB8fDB8fHww',
    location: { latitude: 43.9318, longitude: 2.1485 } // Albi
  },
  {
    id: 10,
    title: 'Développeur web',
    description: 'Création et développement de sites web',
    imageUrl:'https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGV2ZWxvcHBldXIlMjB3ZWJ8ZW58MHx8MHx8fDA%3D',
    location: { latitude: 43.9301, longitude: 2.1489 } // Albi
  },
  {
    id: 11,
    title: 'Photographe',
    description: 'Prise de photos professionnelles',
    imageUrl:'https://images.unsplash.com/photo-1493863641943-9b68992a8d07?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGhvdG9ncmFwaGV8ZW58MHx8MHx8fDA%3D',
    location: { latitude: 43.9297, longitude: 2.1446 } // Albi
  },
  {
    id: 12,
    title: 'Journaliste',
    description: 'Collecte et diffusion de l\'information',
    imageUrl:'https://images.unsplash.com/photo-1596801129861-8592c97db6ad?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGpvdXJuYWxpc3RlfGVufDB8fDB8fHww',
    location: { latitude: 43.9313, longitude: 2.1435 } // Albi
  },
  {
    id: 13,
    title: 'Pompier',
    description: 'Intervention en cas d\'incendie ou de secours',
    imageUrl:'https://images.unsplash.com/photo-1563062067-7700e1d9ae1d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cG9tcGllcnxlbnwwfHwwfHx8MA%3D%3D',
    location: { latitude: 43.9300, longitude: 2.1422 } // Albi
  },
  {
    id: 14,
    title: 'Avocat',
    description: 'Représentation et défense des clients en justice',
    imageUrl:'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YXZvY2F0fGVufDB8fDB8fHww',
    location: { latitude: 43.9312, longitude: 2.1459 } // Albi
  },
  {
    id: 15,
    title: 'Architecte',
    description: 'Conception et réalisation de projets architecturaux',
    imageUrl:'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXJjaGl0ZWN0ZXxlbnwwfHwwfHx8MA%3D%3D',
    location: { latitude: 43.9293, longitude: 2.1442 } // Albi
  },
  {
    id: 16,
    title: 'Comptable',
    description: 'Gestion des finances et comptabilité',
    imageUrl:'https://plus.unsplash.com/premium_photo-1661761077411-d50cba031848?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Y29tcHRhYmxlfGVufDB8fDB8fHww',
    location: { latitude: 43.9320, longitude: 2.1476 } // Albi
  },
  {
    id: 17,
    title: 'Chauffeur de taxi',
    description: 'Transport de passagers en taxi',
    imageUrl:'https://images.unsplash.com/photo-1556122071-e404eaedb77f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dGF4aXxlbnwwfHwwfHx8MA%3D%3D',
    location: { latitude: 43.9311, longitude: 2.1450 } // Albi
  },
  {
    id: 18,
    title: 'Jardinier',
    description: 'Entretien et aménagement des espaces verts',
    imageUrl:'https://images.unsplash.com/photo-1657664042448-c955b411d9d0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8amFyZGluaWVyfGVufDB8fDB8fHww',
    location: { latitude: 43.9298, longitude: 2.1415 } // Albi
  },
  {
    id: 19,
    title: 'Esthéticienne',
    description: 'Soins esthétiques et massages',
    imageUrl:'https://images.unsplash.com/photo-1677091508089-2958f18244fe?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZXN0aGV0aWNpZW5uZXxlbnwwfHwwfHx8MA%3D%3D',
    location: { latitude: 43.9305, longitude: 2.1428 } // Albi
  },
  {
    id: 20,
    title: 'Agent immobilier',
    description: 'Transaction et gestion de biens immobiliers',
    imageUrl:'https://images.unsplash.com/flagged/photo-1564767609342-620cb19b2357?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2wlQzMlQTlzfGVufDB8fDB8fHww',
    location: { latitude: 43.9296, longitude: 2.1468 } // Albi
  },
];

const initialOffers = [
  {
    id: 1,
    title: 'Balai',
    description: 'Nettoyage des sols',
    imageUrl:'https://images.unsplash.com/photo-1587027768084-c3a9076c0a43?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGJhbGFpfGVufDB8fDB8fHww',
    location: { latitude: 43.9289, longitude: 2.1466 } // Albi
  },
  {
    id: 2,
    title: 'Couteau de cuisine',
    description: 'Découpe des aliments',
    imageUrl: 'https://images.unsplash.com/photo-1544965838-54ef8406f868?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    location: { latitude: 43.9312, longitude: 2.1475 } // Albi
  },
  {
    id: 3,
    title: 'Téléphone portable',
    description: 'Communication à distance',
    imageUrl: 'https://plus.unsplash.com/premium_photo-1680985551009-05107cd2752c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8dGVsZXBob25lJTIwcG9ydGFibGV8ZW58MHx8MHx8fDA%3D',
    location: { latitude: 43.9309, longitude: 2.1419 } // Albi
  },
  {
    id: 4,
    title: 'Ordinateur portable',
    description: 'Travail et divertissement informatique',
    imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8b3JkaW5hdGV1ciUyMHBvcnRhYmxlfGVufDB8fDB8fHww',
    location: { latitude: 43.9295, longitude: 2.1460 } // Albi
  },
  {
    id: 5,
    title: 'Baladeur MP3',
    description: 'Écoute de musique portable',
    imageUrl: 'https://images.unsplash.com/photo-1515010137531-66995c7f40e6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmFsYWRldXIlMjBtcDN8ZW58MHx8MHx8fDA%3D',
    location: { latitude: 43.9315, longitude: 2.1467 } // Albi
  },
  {
    id: 6,
    title: 'Livre',
    description: 'Lecture et culture',
    imageUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGxpdnJlfGVufDB8fDB8fHww',
    location: { latitude: 43.9310, longitude: 2.1440 } // Albi
  },
  {
    id: 7,
    title: 'Vélo',
    description: 'Pratique pour les petits trajets',
    imageUrl: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8VmVsb3xlbnwwfHwwfHx8MA%3D%3D',
    location: { latitude: 43.9302, longitude: 2.1452 } // Albi
  },
  {
    id: 8,
    title: 'Marteau',
    description: 'Travail du bois et bricolage',
    imageUrl: 'https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bWFydGVhdXxlbnwwfHwwfHx8MA%3D%3D',
    location: { latitude: 43.9318, longitude: 2.1485 } // Albi
  },
  {
    id: 9,
    title: 'Appareil photo',
    description: 'Prendre de jolies photos avec une bonne résolution',
    imageUrl: 'https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YXBwYXJlaWwlMjBwaG90b3xlbnwwfHwwfHx8MA%3D%3D',
    location: { latitude: 43.9301, longitude: 2.1489 } // Albi
  },
  {
    id: 10,
    title: 'Tondeuse à gazon',
    description: 'Entretien des pelouses',
    imageUrl: 'https://images.unsplash.com/photo-1629335493470-f22db7852d39?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHRvbmRldXNlJTIwYSUyMGdhem9ufGVufDB8fDB8fHww',
    location: { latitude: 43.9297, longitude: 2.1446 } // Albi
  },
  {
    id: 11,
    title: 'Aspirateur',
    description: 'Nettoyage de la poussière et des saletés',
    imageUrl: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YXNwaXJhdGV1cnxlbnwwfHwwfHx8MA%3D%3D',
    location: { latitude: 43.9313, longitude: 2.1435 } // Albi
  },
  {
    id: 12,
    title: 'Cafetière',
    description: 'Préparation de café',
    imageUrl: 'https://images.unsplash.com/photo-1608354580875-30bd4168b351?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FmZXRpZXJlfGVufDB8fDB8fHww',
    location: { latitude: 43.9300, longitude: 2.1422 } // Albi
  },
  {
    id: 13,
    title: 'Stylo',
    description: 'Écriture et dessin',
    imageUrl: 'https://images.unsplash.com/photo-1585336261022-680e295ce3fe?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8c3R5bG98ZW58MHx8MHx8fDA%3D',
    location: { latitude: 43.9312, longitude: 2.1459 } // Albi
  },
  {
    id: 14,
    title: 'Lampe de poche',
    description: 'Éclairage portable',
    imageUrl: 'https://images.unsplash.com/photo-1561916960-dea3b9b0355a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bGFtcGUlMjBkZSUyMHBvY2hlfGVufDB8fDB8fHww',
    location: { latitude: 43.9293, longitude: 2.1442 } // Albi
  },
  {
    id: 15,
    title: 'Parapluie',
    description: 'Protection contre la pluie',
    imageUrl: 'https://images.unsplash.com/photo-1541697183324-e15d407c91cf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cGFyYXBsdWllfGVufDB8fDB8fHww',
    location: { latitude: 43.9320, longitude: 2.1476 } // Albi
  },
  {
    id: 16,
    title: 'Gants de jardinage',
    description: 'Protection des mains pendant le jardinage',
    imageUrl: 'https://images.unsplash.com/photo-1599778150914-88e98e0c3a3e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Z2FudHMlMjBqYXJkaW5hZ2V8ZW58MHx8MHx8fDA%3D',
    location: { latitude: 43.9311, longitude: 2.1450 } // Albi
  },
  {
    id: 17,
    title: 'Sac à dos',
    description: 'Transport d\'affaires et d\'objets',
    imageUrl: 'https://images.unsplash.com/photo-1622260614153-03223fb72052?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHNhYyUyMGElMjBkb3N8ZW58MHx8MHx8fDA%3D',
    location: { latitude: 43.9298, longitude: 2.1415 } // Albi
  },
];

export { initialSkills, initialOffers };


function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [offers, setOffers] = useState(initialOffers);
  const [mapPosition, setMapPosition] = useState(null); // Ajout de l'état pour la position de la carte
  const [skills, setSkills] = useState(initialSkills);
  const [searchTerm, setSearchTerm] = useState('');
  const [rentals, setRentals] = useState([]);
  const [users, setUsers] = useState([]);


  const handleRent = (offer) => {
    setRentals([...rentals, offer]); // Ajoute l'offre à la liste des locations
  };


  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleShowMap = (position) => { // Déplacement de la fonction et ajout d'un paramètre pour la position
    setShowMap(!showMap);
    setMapPosition(position);
  };

  const handleSearchChange = (event) => {
   setSearchTerm(event.target.value);
 };



  window.addEventListener('scroll', function() {
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    var height = document.documentElement.scrollHeight - window.innerHeight;
    var scrollPercentage = (scrollTop / height) * 100;
    var backgroundOpacity = 1 - (scrollPercentage * 0.0001 / 100); /* Réduire l'opacité à mesure que l'utilisateur fait défiler */

    document.querySelector('.gradient-background').style.background = `linear-gradient(to bottom, rgba(0, 0, 0, ${backgroundOpacity}),rgba(0, 0, 0, 0.8) )`;
  });


  return (
    <Router>
      <div className={`app-container ${darkMode ? 'dark-mode' : ''}`}>
      <Navbar bg="dark" expand="lg">
               <Container>
                 <Navbar.Brand>
                 <img
         src="https://i.gyazo.com/c902d9a3309a935226e6081ea85fa9af.png"
         width="50"
         height="50"
         className="d-inline-block align-top"
         alt="Logo"
       />
                 </Navbar.Brand>
                 <Navbar.Toggle aria-controls="basic-navbar-nav" />
                 <Navbar.Collapse id="basic-navbar-nav">
                   <Nav className="me-auto">
                     <Nav.Link as={Link} to="/">
                       Menu
                     </Nav.Link>
                     <Nav.Link as={Link} to="/skills">
                       Compétences
                     </Nav.Link>
                     <Nav.Link as={Link} to="/objects">
                       Offres
                     </Nav.Link>
                   </Nav>
                   <Form className="d-flex">
                     <FormControl
                       type="search"
                       placeholder="Search"
                       className="mr-2"
                       aria-label="Search"
                       value={searchTerm}
                       onChange={handleSearchChange}
                     />
                     <Button variant="outline-secondary">Search</Button>
                   </Form>
                 </Navbar.Collapse>
               </Container>
             </Navbar>
        <div className="gradient-background">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/objects" element={<ObjectsPage offers={offers.filter(offer => offer.title.toLowerCase().includes(searchTerm.toLowerCase()))} toggleShowMap={toggleShowMap} handleRent={handleRent} />} />
            <Route path="/skills" element={<SkillsPage skills={skills.filter(skills => skills.title.toLowerCase().includes(searchTerm.toLowerCase()))} />} />
            <Route path="/myRentals" element={<MyRentalsPage rentals={rentals} />} />
          </Routes>
        </div>
      </div>
    </Router>

  );
}

function HomePage() {
  return (
    <Carousel style={{ maxHeight: '1000px', margin: 'auto', paddingTop:"75px" }}>
     <Carousel.Item interval={5000}>
       <img
         className="d-block w-100"
         src="https://images.unsplash.com/photo-1511988617509-a57c8a288659?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
         alt="First slide"
       />
       <Carousel.Caption style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold', fontSize: '120px', color: '#000', textAlign: 'center', top: '0px', textStroke: '2px white' }}>
       <div style={{ backgroundColor: 'rgba(0, 0, 0, 0)', padding: '10px' }}>
         <img src="https://i.gyazo.com/c902d9a3309a935226e6081ea85fa9af.png"/>
       </div>
         <div style={{ backgroundColor: 'rgba(0, 0, 0, 0)', padding: '10px' }}>
           ALBI READY
         </div>
         <div style={{fontFamily: 'Arial, sans-serif', fontWeight: 'bold', fontSize: '60px', color: '#000', textAlign: 'center', marginTop: '0px' }}>
            ALL BE READY TO SHARE
          </div>
          <div style={{fontFamily: 'Arial, sans-serif', fontWeight: 'bold', fontSize: '30px', color: '#000', textAlign: 'center', marginTop: '0px' }}>
                    (SOYEZ TOUS PRÊTS À PARTAGER)
           </div>
            <Button variant="dark" size="lg" className="mt-4" style={{ fontSize: '30px', padding: '20px 40px' }}>S'inscrire</Button>
       </Carousel.Caption>
     </Carousel.Item>
     <Carousel.Item interval={5000}>
       <img
         className="d-block w-100"
         src="https://www.lesguidesdutarn.com/website/medias/cathe-et-pont-vieux-by-night-1-1440x1080.jpg"
         alt="Second slide"
       />
       <Carousel.Caption style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold', fontSize: '54px', color: '#fff', textAlign: 'center', top: '200px' }}>
       <div style={{ backgroundColor: 'rgba(0, 0, 0, 0)', padding: '10px', borderRadius: '5px' }}>
         PARTAGEZ DANS TOUT ALBI
       </div>
       </Carousel.Caption>
     </Carousel.Item>
     <Carousel.Item interval={5000}>
       <img
         className="d-block w-100"
         src="https://www.albi-tourisme.fr/app/uploads/iris-images/5566/sortir-ce-soir1-1920x1080-f50_50.jpg"
         alt="Third slide"
       />
       <Carousel.Caption style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold', fontSize: '34px', color: '#fff', textAlign: 'center', top: '200px' }}>
       <div style={{ backgroundColor: 'rgba(0, 0, 0, 0)', padding: '10px', borderRadius: '5px' }}>
         VOS VOISINS VOUS PRETENT UN COUP DE MAIN
       </div>
       </Carousel.Caption>
     </Carousel.Item>
   </Carousel>
 );
}

function ObjectsPage({ offers, toggleShowMap, handleRent }) {
  return (
    <Container style={{paddingTop:"75px"}} className="mt-4">
      <div>
          <h1 style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold', fontSize: '24px', color: 'white', textAlign: 'center', top: '20px', borderBottom: '2px solid white',paddingBottom: '20px' }}>RECHERCHE D'OBJETS DISPONIBLES</h1>
          <Row>
            {offers.map((offer) => (
              <Col md={4} key={offer.id}>
              <OfferCard key={offer.id} offer={offer} toggleShowMap={toggleShowMap} onRent={handleRent} />
              </Col>
            ))}
          </Row>
        </div>
    </Container>
  );
}



function SkillsPage({ skills, toggleShowMap }) {
  return (
    <Container style={{paddingTop:"75px"}} className="mt-4">
      <div>
        <h1 style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold', fontSize: '24px', color: 'white', textAlign: 'center', top: '20px', borderBottom: '2px solid white',paddingBottom: '20px' }}>RECHERCHE DE COMPETENCES DISPONIBLES</h1>
        <Row>
          {skills.map((skill) => (
            <Col md={4} key={skill.id}>
              <SkillCard skill={skill} toggleShowMap={toggleShowMap} />
            </Col>
          ))}
        </Row>
      </div>
    </Container>
  );
}





export default App;
