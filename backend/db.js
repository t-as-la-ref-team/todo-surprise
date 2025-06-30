const pgp = require('pg-promise')();

const db = pgp({
  host:'db',
  port: 5432,
  database: 'mydb',
  user: 'user',
  password: 'password'
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
