const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();

const bookRoutes = require('./routes/book');

// pour se connecter à MongoBD Atlas
mongoose.connect(process.env.MONGO_URL,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


// pour pouvoir lire le contenue de la requette rentrante donc d'une requette  POST vers notre serveur
app.use(express.json());

// un middleWare pour gerer la securité CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use('/api/books', bookRoutes);

app.use((req, res, next) => {
    res.status(202);
    next();
});

app.use((req, res, next) => {
    res.json({ message : 'Votre Requête a bien été reçue! '})
    next();
});

app.use((req, res) => {
    console.log('Reponse envoyée avec succès!')
});



module.exports = app;