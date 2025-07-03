const pgp = require('pg-promise')();
require('dotenv').config();

const db = pgp({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10), // convertir en nombre
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD
});

db.connect()
  .then(obj => {
    console.log('✅ Connexion à PostgreSQL réussie');
    obj.done();
  })
  .catch(error => {
    console.error('❌ Erreur de connexion à PostgreSQL :', error.message || error);
  });


module.exports = db;
