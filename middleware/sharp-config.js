const fs = require('fs').promises; // Utilisation des promesses de fs
const sharp = require('sharp');

module.exports = async function processImage(filePath) {
    try {
        const outputFilePath = filePath.replace(/\.[^.]+$/, '.webp'); // Remplace l'extension par .webp

        await sharp(filePath)
            .webp({ quality: 20 })
            .toFile(outputFilePath); // Enregistre la version compressée

        // // Supprime le fichier original de manière asynchrone
        // setTimeout(async () => {
        //     try {
        //         await fs.unlink(filePath);
        //     } catch (error) {
        //         console.error("Erreur lors de la suppression du fichier avec fs.promises.unlink:", error);
        //     }
        // }, 100); // Délai de 100 ms avant la suppression

        return outputFilePath; // Retourne le chemin de l'image compressée
    } catch (error) {
        console.error("Erreur lors du traitement de l'image avec sharp:", error);
        throw error;
    }
};
