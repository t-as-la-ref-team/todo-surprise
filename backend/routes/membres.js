const express = require('express');
const router = express.Router();

members = []

router.post('/', (req, res) => {
  const { nom,prenom, email } = req.body;
  const newMember = {
    id: members.length + 1,
    nom,
    prenom,
    email
  };
  members.push(newMember);
  res.status(201).json(newMember);
});

router.get('/', (req, res) => {
  res.json(members);
});

router.put('/:id', (req, res) => {
  const member = members.find(m => m.id === parseInt(req.params.id));
  if (!member) return res.status(404).json({ message: 'Membre non trouvé' });

  const { nom, prenom, email } = req.body;
  if (nom) member.nom = nom;
  if (prenom) member.prenom = prenom;
  if (email) member.email = email;

  res.json(member);
});

router.delete('/:id', (req, res) => {
  const index = members.findIndex(m => m.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: 'Membre non trouvé' });

  const deleted = members.splice(index, 1);
  res.json({ message: 'Membre supprimé', membre: deleted[0] });
});

module.exports = router;