const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

module.exports = async function processImage(filePath) {
    try {
        const outputFilePath = filePath.replace(/\.[^.]+$/, '.webp'); // Remplace l'extension par .webp
        await sharp(filePath)
            .webp({ quality: 20 })
            .toFile(outputFilePath); // Enregistre la version compressée

        // Supprime le fichier original
        fs.unlinkSync(filePath);

        // Retourne le chemin de l'image compressée
        return outputFilePath;
    } catch (error) {
        console.error('Erreur lors du traitement de l\'image avec sharp:', error);
        throw error;
    }
};
