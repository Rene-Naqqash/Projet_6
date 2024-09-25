const express = require('express')

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use((req, res, next) => {
    console.log('Requête reçu avec succès!!');
    next();
})

app.use((req, res, next) => {
    res.status(202);
    next();
})

app.use((req, res, next) => {
    res.json({ message : 'Votre Requête a bien été reçue! '})
    next();
})

app.use((req, res) => {
    console.log('Reponse envoyée avec succès!')
})



module.exports = app;