const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();
const path = require('path');

//mes routers livres et utilisaterus
const bookRoutes = require('./routes/book');
const userRoutes = require('./routes/user');

// pour se connecter à MongoBD Atlas
mongoose.connect(process.env.MONGO_URL,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


// middleware pour pouvoir lire le contenue de la requette rentrante donc d'une requette POST vers notre serveur
app.use(express.json());

// un middleWare pour gerer la securité CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// Middleware pour servir les fichiers statiques
app.use('/images', express.static(path.join(__dirname, 'images')));

//uilisation des routes 
app.use('/api/books', bookRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;