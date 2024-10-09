const multer = require('multer');
const fs = require('fs');
const path = require('path');


const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
}; 

// la fonction qui créer le dossier images si nécessaire donc s'il est pas deja là
const ensureImagesDirectoryExists = () => {
    const imagesDir = path.join(__dirname, '../images'); // Chemin vers le dossier images
    if (!fs.existsSync(imagesDir)) {
        fs.mkdirSync(imagesDir); // Créer le dossier s'il n'existe pas
        console.log('Dossier images créé !');
    }
};
// lancer la fonction de verif
ensureImagesDirectoryExists();

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images')
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        callback(null,name + Date.now() + '.' + extension);

    }
});

module.exports = multer({ storage: storage }).single('image');