// server.js

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./db');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/api', require('./routes/users')); // Utilisez vos propres routes API

// Route par défaut
app.get('/', (req, res) => {
  res.send('Welcome to the backend server');
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
