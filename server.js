const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const moment = require('moment');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://Joao:123@tecweb.m4o4lak.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Conectado ao MongoDB Atlas');
  })
  .catch((error) => {
    console.error('Erro ao conectar ao MongoDB Atlas:', error);
  });

const transactionSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  description: { type: String, required: true },
  value: { type: Number, required: true },
  category: { type: String, required: true },
});

const Transaction = mongoose.model('Transaction', transactionSchema);

app.post('/transactions', async (req, res) => {
  try {
    const { date, description, value, category } = req.body;

    const transaction = new Transaction({
      date: moment(date, 'DD/MM/YYYY').toDate(),
      description,
      value,
      category,
    });

    await transaction.save();

    res.status(201).send(transaction);
  } catch (error) {
    console.error('Erro ao adicionar transação:', error);
    res.status(500).send('Erro ao adicionar transação');
  }
});

app.get('/transactions', async (req, res) => {
  try {
    const transactions = await Transaction.find();

    res.send(transactions);
  } catch (error) {
    console.error('Erro ao buscar transações:', error);
    res.status(500).send('Erro ao buscar transações');
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Servidor Express em execução na porta ${port}`);
});