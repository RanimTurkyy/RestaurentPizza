const express = require('express');
const router = express.Router();

let utilisateurs = [];
let currentId = 1;

router.post('/', (req, res) => {
  const { nom, email } = req.body;
  const nouvelUtilisateur = { id: currentId++, nom, email };
  utilisateurs.push(nouvelUtilisateur);
  res.status(201).json(nouvelUtilisateur);
});

router.get('/', (req, res) => {
  res.json(utilisateurs);
});

router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = utilisateurs.findIndex(u => u.id === id);
  if (index === -1) return res.status(404).json({ message: 'Utilisateur non trouvé' });

  const { nom, email } = req.body;
  utilisateurs[index] = { id, nom, email };
  res.json(utilisateurs[index]);
});

router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  utilisateurs = utilisateurs.filter(u => u.id !== id);
  res.status(204).end();
});

module.exports = router;
