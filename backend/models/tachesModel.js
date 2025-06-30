const db = require('../db');

const create = (name) =>
  db.one('INSERT INTO tasks(name) VALUES($1) RETURNING *', [name]);

const getAll = () =>
  db.any('SELECT * FROM tasks ORDER BY id');

const getById = (id) =>
  db.oneOrNone('SELECT * FROM tasks WHERE id = $1', [id]);

const update = (id, name, completed) =>
  db.oneOrNone(
    `UPDATE tasks SET name = $1, completed = $2 WHERE id = $3 RETURNING *`,
    [name, completed, id]
  );

const remove = (id) =>
  db.oneOrNone('DELETE FROM tasks WHERE id = $1 RETURNING *', [id]);

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
};
