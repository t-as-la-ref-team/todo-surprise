const express = require('express');
const router = express.Router();
const membresController = require('../controllers/membresController');

router.get('/', membresController.getAll);
router.post('/', membresController.create);
router.put('/:id', membresController.update);
router.delete('/:id', membresController.remove);

module.exports = router;
