const express = require('express');
const router = express.Router();

let commandes = [];
let currentId = 1;

// Créer une commande
router.post('/', (req, res) => {
  const { nomClient, pizza, quantite } = req.body;
  const nouvelleCommande = { id: currentId++, nomClient, pizza, quantite };
  commandes.push(nouvelleCommande);
  res.status(201).json(nouvelleCommande);
});

// Obtenir toutes les commandes
router.get('/', (req, res) => {
  res.json(commandes);
});

// Modifier une commande
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = commandes.findIndex(c => c.id === id);
  if (index === -1) return res.status(404).json({ message: 'Commande non trouvée' });

  const { nomClient, pizza, quantite } = req.body;
  commandes[index] = { id, nomClient, pizza, quantite };
  res.json(commandes[index]);
});

// Supprimer une commande
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  commandes = commandes.filter(c => c.id !== id);
  res.status(204).end();
});

module.exports = router;
