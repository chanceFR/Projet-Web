import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import './Accueil.css'; // Fichier de style CSS pour la page d'accueil

function Accueil() {
  return (
    <div className="accueil">
      <header>
        <h1>Échangez vos objets et compétences</h1>
        <nav>
          {/* Liens vers d'autres sections de votre site web */}
          <a href="#apropos">À propos</a>
          <a href="#offres">Offres</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>
      <section id="presentation">
        <p>Bienvenue sur notre site d'échange. Trouvez des objets ou des compétences à échanger avec d'autres utilisateurs.</p>
      </section>
      <section id="carte">
        <h2>Carte interactive</h2>
        <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '400px' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[51.505, -0.09]}>
            <Popup>
              Un marqueur de position.
            </Popup>
          </Marker>
        </MapContainer>
      </section>
      <section id="miseenavant">
        <h2>Mise en avant</h2>
        {/* Section pour mettre en avant des offres ou des compétences */}
        <div className="offre">
          <h3>Offre 1</h3>
          <p>Description de l'offre 1.</p>
        </div>
        <div className="offre">
          <h3>Offre 2</h3>
          <p>Description de l'offre 2.</p>
        </div>
      </section>
      <section id="action">
        <h2>Commencez maintenant</h2>
        <a href="#inscription" className="cta">Inscrivez-vous</a>
      </section>
    </div>
  );
}

export default Accueil;
