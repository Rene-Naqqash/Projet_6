const Book = require('../models/Book');
const fs = require('fs');
const processImage = require('../middleware/sharp-config');

// controleur pour gérer les requêtes POST de creation de livre
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
      // On met à jour l'URL de l'image compressée en .webp et voila
      imageUrl: `${req.protocol}://${req.get('host')}/${processedImagePath}`
    });

    // Sauvegarde du livre dans la base de données
    await book.save();
    res.status(201).json({ message: 'Book saved!' });
  } catch (error) {
    res.status(400).json({ error });
  }
};

// controleur pour gérer les requêtes PUT donc pour les modifications de livres avec le bon ID
exports.modifyBook = async (req, res, next) => {
  try {
    const bookObject = req.file
      ? { ...JSON.parse(req.body.book) }
      : { ...JSON.parse(req.body.book), imageUrl: req.body.imageUrl };

    delete bookObject._userId;

    const book = await Book.findOne({ _id: req.params.id });
    if (!book) {
      return res.status(404).json({ message: 'Livre non trouvé' });
    }

    if (book.userId !== req.auth.userId) {
      return res.status(401).json({ message: 'Non autorisé' });
    }

    if (req.file) {
      const imageFilePath = `images/${req.file.filename}`;
      const processedImagePath = await processImage(imageFilePath);
      bookObject.imageUrl = `${req.protocol}://${req.get('host')}/${processedImagePath}`;
    }

    await Book.updateOne({ _id: req.params.id }, { ...bookObject, _id: req.params.id });
    res.status(200).json({ message: 'Livre mis à jour avec succès' });

  } catch (error) {
    res.status(400).json({ error });
  }
};


// controleur pour gérer les requêtes delete d'un livre précis avec le bon ID
exports.deleteBook = (req,res,next) => {
  Book.findOne({_id: req.params.id})
  .then(book => {
    if (book.userId != req.auth.userId){
      res.status(401).json({ message: 'not authorized'});
    } else {
      const filename = book.imageUrl.split('images')[1];
      fs.unlink(`images/${filename}`, () => {
        Book.deleteOne({_id: req.params.id})
        .then( () => {res.status(200).json({message: 'Book Deleted!'})})
        .catch(error => res.status(401).json({error}));
      });

    }

  })
  .catch(error => res.status(500).json({ error}));

};

// Controleur de note pour les livres
exports.rateBook = (req, res) => {
    Book.findOne({ _id: req.params.id })
      .then((book) => {
        if (!book) {
          return res.status(404).json({ error: 'Book not found!' });
        }

        // Vérifiez si l'utilisateur a déjà noté le livre
        const existingRating = book.ratings.find(r => r.userId === req.auth.userId);
        if (existingRating) {
          return res.status(400).json({ error: 'User has already rated this book' });
        }
        
        const rating = { userId: req.auth.userId, grade: req.body.rating };
        book.ratings.push(rating);

        book.averageRating =
          book.ratings.reduce((acc, curr) => acc + curr.grade, 0) /
          book.ratings.length;
        book.save()
          .then(() => res.status(200).json(book))
          .catch((error) => res.status(400).json({ error }));
      })
      .catch((error) => res.status(400).json({ error }));
};
  
// controleur get all books
exports.getAllBooks = (req, res, next) => {
    Book.find()
    .then(books => res.status(200).json(books))
    .catch(error => res.status(400).json({ error }));
};

// controleur pour gérer les requêtes GET d'un seul livre précis avec le bon ID
exports.getOneBook = (req,res, next) => {
    Book.findOne({ _id: req.params.id })
    .then(book => res.status(200).json(book))
    .catch(error => res.status(404).json({ error }));
 }; 

 // controleur pour les best rating
 exports.getBestRating = (req, res) => {
  Book.find()
    .sort({ averageRating: -1 })
    .limit(3)
    .then(books => res.status(200).json(books))
    .catch(error => res.status(400).json({ error }));
};