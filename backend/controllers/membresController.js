const Membre = require('../models/membresModel');

exports.getAll = async (req, res) => {
  try {
    const membres = await Membre.getAll();
    res.json(membres);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const membre = await Membre.create(req.body);
    res.status(201).json(membre);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const membre = await Membre.update(req.params.id, req.body);
    res.json(membre);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const result = await Membre.remove(req.params.id);
    if (result.rowCount === 0) return res.status(404).json({ error: 'Membre non trouvé' });
    res.json({ message: 'Membre supprimé' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
