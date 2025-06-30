const Task = require('../models/tachesModel');

exports.create = async (req, res) => {
  try {
    const newTask = await Task.create(req.body.name);
    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAll = async (_req, res) => {
  try {
    const tasks = await Task.getAll();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const task = await Task.getById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Tâche non trouvée' });
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const updated = await Task.update(
      req.params.id,
      req.body.name,
      req.body.completed
    );
    if (!updated) return res.status(404).json({ message: 'Tâche non trouvée' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const deleted = await Task.remove(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Tâche non trouvée' });
    res.json({ message: 'Tâche supprimée', tache: deleted });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
