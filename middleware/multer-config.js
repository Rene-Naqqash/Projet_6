const multer = require('multer');
const path = require('path');
const fs = require('fs');

// la fonction qui créer le dossier images si nécessaire donc s'il est pas deja là 
const ensureImagesDirectoryExists = () => {
    const imagesDir = path.join(__dirname, '../images'); // Chemin vers le dossier images
    if (!fs.existsSync(imagesDir)) {
        fs.mkdirSync(imagesDir); // Créer le dossier s'il n'existe pas
        console.log('Dossier images créé !');
    }
};
ensureImagesDirectoryExists();

const storage = multer.memoryStorage();

module.exports = multer({ storage: storage }).single('image');
