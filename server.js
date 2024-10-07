const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Expense = require('./models/Expense');

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());



mongoose.connect('mongodb://localhost:27017/expense-tracker')
.then(() => console.log('MongoDB Connected'))
.catch((err) => console.error('MongoDB connection error:', err));


// Routes CRUD


// Créer une nouvelle dépense
app.post('/api/expenses', async (req, res) => {
    const { title, amount, date } = req.body;
    try {
      const newExpense = new Expense({ title, amount, date });
      const savedExpense = await newExpense.save();
      res.status(201).json(savedExpense);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });



// Lire toutes les dépenses
app.get('/api/expenses', async (req, res) => {
    try {
      const expenses = await Expense.find();
      res.json(expenses);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  


  // Mettre à jour une dépense
  app.put('/api/expenses/:id', async (req, res) => {
    const { title, amount, date } = req.body;
    try {
      const updatedExpense = await Expense.findByIdAndUpdate(
        req.params.id,
        { title, amount, date },
        { new: true } // Renvoie l'objet mis à jour
      );
      res.json(updatedExpense);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  

  // Supprimer une dépense
  app.delete('/api/expenses/:id', async (req, res) => {
    try {
      await Expense.findByIdAndDelete(req.params.id);
      res.json({ message: 'Expense deleted' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });


  
  // Démarrer le serveur
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });