const express = require('express');
const app = express();
const PORT = 5000;

const commandesRouter = require('./routes/commandes');
const utilisateursRouter = require('./routes/utilisateurs');
const pizzasRouter = require('./routes/pizzas');

app.use(express.json());
app.use('/commandes', commandesRouter);
app.use('/utilisateurs', utilisateursRouter);
app.use('/pizzas', pizzasRouter);

app.get('/', (req, res) => {
  res.send('Bienvenue sur PizzaTech API !');
});

app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
