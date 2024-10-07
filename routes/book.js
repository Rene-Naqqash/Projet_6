const express = require('express');
const router = express.Router();
const bookCtrl = require('../controllers/book');


router.post('/', bookCtrl.createBook);
router.get( '/', bookCtrl.getAllBooks);
router.put('/:id', bookCtrl.modifyBook);
router.get('/:id', bookCtrl.getOneBook);
router.delete('/:id', bookCtrl.deleteBook);


module.exports = router;


