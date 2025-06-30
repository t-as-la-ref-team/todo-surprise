const db = require('../db');

const getAll = () => db.any('SELECT * FROM users');
const create = ({ firstname, lastname, email }) =>
  db.one('INSERT INTO users(firstname, lastname, email) VALUES($1, $2, $3) RETURNING *', [firstname, lastname, email]);
const update = (id, { firstname, lastname, email }) =>
  db.one('UPDATE users SET firstname = $1, lastname = $2, email = $3 WHERE id = $4 RETURNING *', [firstname, lastname, email, id]);
const remove = (id) =>
  db.result('DELETE FROM users WHERE id = $1', [id]);

module.exports = { getAll, create, update, remove };
