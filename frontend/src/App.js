import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [commandes, setCommandes] = useState([]);
  const [nomClient, setNomClient] = useState('');
  const [pizza, setPizza] = useState('');
  const [quantite, setQuantite] = useState(1);

  const [pizzas, setPizzas] = useState([]);
  const [nomPizza, setNomPizza] = useState('');
  const [prixPizza, setPrixPizza] = useState('');

  const [utilisateurs, setUtilisateurs] = useState([]);
  const [nomUtilisateur, setNomUtilisateur] = useState('');
  const [emailUtilisateur, setEmailUtilisateur] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/commandes')
      .then(res => res.json())
      .then(data => setCommandes(data));

    fetch('http://localhost:5000/pizzas')
      .then(res => res.json())
      .then(data => setPizzas(data));

    fetch('http://localhost:5000/utilisateurs')
      .then(res => res.json())
      .then(data => setUtilisateurs(data));
  }, []);

  const envoyerCommande = async () => {
    const nouvelleCommande = { nomClient, pizza, quantite: Number(quantite) };
    const res = await fetch('http://localhost:5000/commandes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nouvelleCommande),
    });
    const data = await res.json();
    setCommandes([...commandes, data]);
    setNomClient('');
    setPizza('');
    setQuantite(1);
  };

  const supprimerCommande = async (id) => {
    await fetch(`http://localhost:5000/commandes/${id}`, {
      method: 'DELETE',
    });
    setCommandes(commandes.filter(c => c.id !== id));
  };

  const ajouterPizza = async () => {
    const res = await fetch('http://localhost:5000/pizzas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nom: nomPizza, prix: parseFloat(prixPizza) })
    });
    const data = await res.json();
    setPizzas([...pizzas, data]);
    setNomPizza('');
    setPrixPizza('');
  };

  const supprimerPizza = async (id) => {
    await fetch(`http://localhost:5000/pizzas/${id}`, { method: 'DELETE' });
    setPizzas(pizzas.filter(p => p.id !== id));
  };

  const ajouterUtilisateur = async () => {
    const res = await fetch('http://localhost:5000/utilisateurs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nom: nomUtilisateur, email: emailUtilisateur })
    });
    const data = await res.json();
    setUtilisateurs([...utilisateurs, data]);
    setNomUtilisateur('');
    setEmailUtilisateur('');
  };

  const supprimerUtilisateur = async (id) => {
    await fetch(`http://localhost:5000/utilisateurs/${id}`, { method: 'DELETE' });
    setUtilisateurs(utilisateurs.filter(u => u.id !== id));
  };

  return (
    <div className="container">
      <h1>🍕 Commandes PizzaTech</h1>
      <input placeholder="Nom du client" value={nomClient} onChange={(e) => setNomClient(e.target.value)} />
      <input placeholder="Type de pizza" value={pizza} onChange={(e) => setPizza(e.target.value)} />
      <input type="number" placeholder="Quantité" value={quantite} onChange={(e) => setQuantite(e.target.value)} />
      <button onClick={envoyerCommande}>Commander</button>

      <h2>📋 Commandes en cours</h2>
      <ul>
        {commandes.map(c => (
          <li key={c.id}>
            {c.nomClient} a commandé {c.quantite} {c.pizza}
            <button onClick={() => supprimerCommande(c.id)}>🗑️</button>
          </li>
        ))}
      </ul>

      <h2>🍕 Pizzas disponibles</h2>
      <input placeholder="Nom de pizza" value={nomPizza} onChange={e => setNomPizza(e.target.value)} />
      <input type="number" placeholder="Prix" value={prixPizza} onChange={e => setPrixPizza(e.target.value)} />
      <button onClick={ajouterPizza}>Ajouter</button>

      <ul>
        {pizzas.map(p => (
          <li key={p.id}>
            {p.nom} – {p.prix} €
            <button onClick={() => supprimerPizza(p.id)}>🗑️</button>
          </li>
        ))}
      </ul>

      <h2>👤 Utilisateurs enregistrés</h2>
      <input placeholder="Nom" value={nomUtilisateur} onChange={e => setNomUtilisateur(e.target.value)} />
      <input placeholder="Email" value={emailUtilisateur} onChange={e => setEmailUtilisateur(e.target.value)} />
      <button onClick={ajouterUtilisateur}>Ajouter</button>

      <ul>
        {utilisateurs.map(u => (
          <li key={u.id}>
            {u.nom} – {u.email}
            <button onClick={() => supprimerUtilisateur(u.id)}>🗑️</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
