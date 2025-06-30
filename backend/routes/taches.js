const express = require('express');
const router = express.Router();
const taskController = require('../controllers/tachesController');

router.post('/', taskController.create);
router.get('/', taskController.getAll);
router.get('/:id', taskController.getById);
router.put('/:id', taskController.update);
router.delete('/:id', taskController.remove);

module.exports = router;
