const sharp = require('sharp');
const path = require('path');
const fs = require('fs').promises;

module.exports = async function processImage(buffer, originalName) {
    try {

        // Crée un nom unique avec le timestamp et l'extension .webp
        const uniqueName = originalName.split('.').slice(0, -1).join('_') + '_' + Date.now()+ 'sec' + '.webp';
        const outputFilePath = path.join(__dirname, '../images', uniqueName);

        // Traite et compresse l'image en mémoire, puis l'enregistre en .webp
        await sharp(buffer)
            .webp({ quality: 40 })
            .toFile(outputFilePath);

        return outputFilePath; // Retourne le chemin complet de l'image traitée
    } catch (error) {
        console.error("Erreur lors du traitement de l'image avec Sharp:", error);
        throw error;
    }
};



