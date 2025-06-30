const express = require('express');
const router = express.Router();
const db = require('../db');

// POST - ajouter une tâche
router.post('/', async (req, res) => {
  const { name } = req.body;
  try {
    const newTask = await db.one(
      'INSERT INTO tasks(name) VALUES($1) RETURNING *',
      [name]
    );
    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET - récupérer toutes les tâches
router.get('/', async (req, res) => {
  try {
    const tasks = await db.any('SELECT * FROM tasks ORDER BY id');
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET - récupérer une tâche par ID
router.get('/:id', async (req, res) => {
  try {
    const task = await db.oneOrNone('SELECT * FROM tasks WHERE id = $1', [req.params.id]);
    if (!task) return res.status(404).json({ message: 'Tâche non trouvée' });
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT - modifier une tâche
router.put('/:id', async (req, res) => {
  const { name, completed } = req.body;
  try {
    const updated = await db.oneOrNone(
      `UPDATE tasks
       SET name = $1, completed = $2
       WHERE id = $3
       RETURNING *`,
      [name, completed, req.params.id]
    );
    if (!updated) return res.status(404).json({ message: 'Tâche non trouvée' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE - supprimer une tâche
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await db.oneOrNone('DELETE FROM tasks WHERE id = $1 RETURNING *', [req.params.id]);
    if (!deleted) return res.status(404).json({ message: 'Tâche non trouvée' });
    res.json({ message: 'Tâche supprimée', tache: deleted });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
