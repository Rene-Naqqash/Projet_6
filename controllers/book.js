const Book = require('../models/Book');
const fs = require('fs');
const processImage = require('../middleware/sharp-config');

// controleur pour gérer les requêtes POST de creation de livre
exports.createBook = async (req, res, next) => {
    try {
        const bookObject = JSON.parse(req.body.book);
        delete bookObject._id;
        delete bookObject._userId;

        // Traite l'image téléchargée à partir du buffer de mémoire
        const processedImagePath = await processImage(req.file.buffer, req.file.originalname);

        const book = new Book({
            ...bookObject,
            userId: req.auth.userId,
            imageUrl: `${req.protocol}://${req.get('host')}/images/${processedImagePath.split("\\images\\")[1]}`
        });

        await book.save();
        res.status(201).json({ message: 'Livre enregistré avec succès !' });
    } catch (error) {
        res.status(400).json({ error });
    }
};

// controleur pour gérer les requêtes PUT donc pour les modifications de livres avec le bon ID
exports.modifyBook = async (req, res, next) => {
  try {
      // Définition de bookObject en fonction de la présence de req.file
      const bookObject = req.file
          ? { ...JSON.parse(req.body.book) } // Si un fichier est fourni
          : { ...req.body }; // Si aucun fichier, les données sont directement dans req.body

      delete bookObject._userId;

      const book = await Book.findOne({ _id: req.params.id });
      if (!book) {
          return res.status(404).json({ message: 'Livre non trouvé' });
      }
      const bookUserId = book.userId.toString();
      if (bookUserId !== req.auth.userId) {
          return res.status(401).json({ message: 'Non autorisé' });
      }

      // Si une nouvelle image est fournie, la traiter
      if (req.file) {
          const processedImagePath = await processImage(req.file.buffer, req.file.originalname);
          bookObject.imageUrl = `${req.protocol}://${req.get('host')}/images/${processedImagePath.split("\\images\\")[1]}`;
      }

      // Mise à jour du livre avec les nouvelles données
      await Book.updateOne({ _id: req.params.id }, { ...bookObject, _id: req.params.id });
      res.status(200).json({ message: 'Livre mis à jour avec succès' });

  } catch (error) {
      console.error("Erreur dans modifyBook :", error); // Log pour debug
      res.status(400).json({ error });
  }
};


// controleur pour gérer les requêtes delete d'un livre précis avec le bon ID
exports.deleteBook = (req,res,next) => {
  Book.findOne({_id: req.params.id})
  .then(book => {
    const bookUserId = book.userId.toString();
    if (bookUserId != req.auth.userId){
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