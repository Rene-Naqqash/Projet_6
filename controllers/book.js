const Book = require('../models/Book');
const processImage = require('../middleware/sharp-config');

// Middleware pour gérer les requêtes POST
exports.createBook = async (req, res, next) => {
  try {
    const bookObject = JSON.parse(req.body.book);
    delete bookObject._id;
    delete bookObject._userId;

    // Chemin du fichier d'image téléchargé par Multer
    const imageFilePath = `images/${req.file.filename}`;

    // Traitement de l'image avec Sharp pour la convertir en .webp
    const processedImagePath = await processImage(imageFilePath);

    const book = new Book({
      ...bookObject,
      userId: req.auth.userId,
      // On met à jour l'URL de l'image compressée en .webp
      imageUrl: `${req.protocol}://${req.get('host')}/${processedImagePath}`
    });

    // Sauvegarde du livre dans la base de données
    await book.save();
    res.status(201).json({ message: 'Book saved!' });
  } catch (error) {
    console.error('Erreur lors de la création du livre:', error);
    res.status(400).json({ error });
  }
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
