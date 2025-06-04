const express = require('express');
const router = express.Router();

let pizzas = [];
let currentId = 1;

router.post('/', (req, res) => {
  const { nom, prix } = req.body;
  const nouvellePizza = { id: currentId++, nom, prix };
  pizzas.push(nouvellePizza);
  res.status(201).json(nouvellePizza);
});

router.get('/', (req, res) => {
  res.json(pizzas);
});

router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = pizzas.findIndex(p => p.id === id);
  if (index === -1) return res.status(404).json({ message: 'Pizza non trouvée' });

  const { nom, prix } = req.body;
  pizzas[index] = { id, nom, prix };
  res.json(pizzas[index]);
});

router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  pizzas = pizzas.filter(p => p.id !== id);
  res.status(204).end();
});

module.exports = router;
