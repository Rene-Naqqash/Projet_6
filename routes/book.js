const express = require('express');
const bookCtrl = require('../controllers/book');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/',auth, bookCtrl.createBook);
router.get( '/', bookCtrl.getAllBooks);
router.put('/:id',auth, bookCtrl.modifyBook);
router.get('/:id', bookCtrl.getOneBook);
router.delete('/:id',auth, bookCtrl.deleteBook);


module.exports = router;


