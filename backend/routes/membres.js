const express = require('express');
const router = express.Router();
const db = require('../db');

// POST - ajouter un membre
router.post('/', async (req, res) => {
  const { firstname, lastname, email } = req.body;
  try {
    const newMember = await db.one(
      'INSERT INTO users(firstname, lastname, email) VALUES($1, $2, $3) RETURNING *',
      [firstname, lastname, email]
    );
    res.status(201).json(newMember);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET - récupérer tous les membres
router.get('/', async (req, res) => {
  try {
    const members = await db.any('SELECT * FROM users ORDER BY id');
    res.json(members);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET - récupérer un membre par ID
router.get('/:id', async (req, res) => {
  try {
    const member = await db.oneOrNone('SELECT * FROM users WHERE id = $1', [req.params.id]);
    if (!member) return res.status(404).json({ message: 'Membre non trouvé' });
    res.json(member);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT - modifier un membre
router.put('/:id', async (req, res) => {
  const { firstname, lastname, email } = req.body;
  try {
    const updated = await db.oneOrNone(
      `UPDATE users
       SET firstname = $1, lastname = $2, email = $3
       WHERE id = $4
       RETURNING *`,
      [firstname, lastname, email, req.params.id]
    );
    if (!updated) return res.status(404).json({ message: 'Membre non trouvé' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE - supprimer un membre
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await db.oneOrNone('DELETE FROM users WHERE id = $1 RETURNING *', [req.params.id]);
    if (!deleted) return res.status(404).json({ message: 'Membre non trouvé' });
    res.json({ message: 'Membre supprimé', membre: deleted });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
