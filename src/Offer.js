const mongoose = require('mongoose');
const Offer = require('./models/Offer'); // Assurez-vous d'importer votre modèle d'offres

// Connexion à la base de données MongoDB
mongoose.connect('mongodb://92.88.170.100/Offres', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB connected');

  // Fonction pour générer des offres aléatoires
  const generateRandomOffers = (numOffers) => {
    const offers = [];
    for (let i = 0; i < numOffers; i++) {
      const offer = new Offer({
        title: `Offre ${i + 1}`,
        description: `Description de l'offre ${i + 1}`,
        imageUrl: `url_image_offre_${i + 1}.jpg`,
      });
      offers.push(offer);
    }
    return offers;
  };

  // Génération de 10 offres aléatoires
  const randomOffers = generateRandomOffers(10);

  // Enregistrement des offres dans la base de données
  Offer.insertMany(randomOffers)
    .then(() => {
      console.log('Offres ajoutées avec succès à la base de données');
      mongoose.disconnect(); // Déconnexion après l'ajout des offres
    })
    .catch((err) => {
      console.error('Erreur lors de l\'ajout des offres à la base de données :', err);
      mongoose.disconnect();
    });
})
.catch((err) => console.error(err));
