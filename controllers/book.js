const Book = require('../models/Book');

// le middleware pour gerer les requettes POST
exports.createBook = (req,res,next) => {
    delete req.body._id;
    const book = new Book({
      ...req.body
    });
    book.save()
    .then(() => res.status(201).json({message: 'Post saved successfully!'}))
    .catch( error => res.status(400).json({ error }));
   };

// Le middleware pour gérer les requêtes PUT donc pour les modifications de livres avec le bon ID
exports.modifyBook = (req,res, next) => {
    Book.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({message:'Book updated successfully!'}))
    .catch(error => res.status(400).json({ error }));
 };

// Le middleware pour gérer les requêtes delete d'un livre précis avec le bon ID
exports.deleteBook = (req,res,next) => {
    Book.deleteOne({ _id: req.params.id })
    .then (() => res.status(200).json({ message: 'Book Deleted!'}))
    .catch( error => res.status(400).json({ error}));
  };

// get all books
exports.getAllBooks = (req, res, next) => {
    Book.find()
    .then(books => res.status(200).json(books))
    .catch(error => res.status(400).json({ error }));
};

// Le middleware pour gérer les requêtes GET d'un seul livre précis avec le bon ID
exports.getOneBook = (req,res, next) => {
    Book.findOne({ _id: req.params.id })
    .then(book => res.status(200).json(book))
    .catch(error => res.status(404).json({ error }));
 }; 
