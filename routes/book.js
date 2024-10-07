const express = require('express');
const router = express.Router();

const Book = require('../models/Book');

// le middleware pour gerer les requettes POST
 router.post('/', (req,res,next) => {
  delete req.body._id;
  const book = new Book({
    ...req.body
  });
  book.save()
  .then(() => res.status(201).json({message: 'Objet enregistré dans la BD!'}))
  .catch( error => res.status(400).json({ error }));
 });

 // Le middleware pour gérer les requêtes PUT donc pour les modifications de livres avec le bon ID
 router.put('/:id', (req,res, next) => {
    Book.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({message:'Objet modifié !'}))
    .catch(error => res.status(400).json({ error }));
 });
// Le middleware pour gérer les requêtes delete d'un livre précis avec le bon ID
router.delete('/:id', (req,res,next) => {
  Book.deleteOne({ _id: req.params.id })
  .then (() => res.status(200).json({ message: 'Objet supprimé !'}))
  .catch( error => res.status(400).json({ error}));
});

// le middleware pour gerer les requettes GET 
router.get( '/',(req, res, next) => {
    Book.find()
    .then(books => res.status(200).json(books))
    .catch(error => res.status(400).json({ error }));
});

// Le middleware pour gérer les requêtes GET d'un livre précis avec le bon ID
router.get('/:id', (req,res, next) => {
    Book.findOne({ _id: req.params.id })
    .then(book => res.status(200).json(book))
    .catch(error => res.status(404).json({ error }));
 });
//

module.exports = router;


