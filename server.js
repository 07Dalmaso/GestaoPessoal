const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const moment = require('moment');
const bodyParser = require('body-parser');
const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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

const financeSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  description: { type: String, required: true },
  value: { type: Number, required: true },
});

const Finance = mongoose.model('Finance', financeSchema);

const UserSchema = new mongoose.Schema({
  password: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  endereco: { type: String, required: true },
  telefone: { type: String, required: true },
});

const User = mongoose.model('User', UserSchema);


const CartoesSchema = new mongoose.Schema({

  cardType: { type: String, required: false },
  cardNumber: { type: String, required: true },
  cardName: { type: String, required: true },
  cardExpiry: { type: String, required: true },
  cardCVV: { type: String, required: false },
  cardSaldo: { type: String, required: false },
  cardTp: { type: String, required: false },
});

const Cartoes = mongoose.model('Cartoes', CartoesSchema);

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

app.post('/user', async (req, res) => {
  try {
    const { password, name, email, endereco, telefone } = req.body;

    const user = new User({
      password,
      name,
      email,
      endereco,
      telefone,
    });

    await user.save();

    res.status(201).send(user);
  } catch (error) {
    console.error('Erro ao adicionar usuário:', error);
    res.status(500).send('Erro ao adicionar usuário');
  }
});

app.post('/finances', async (req, res) => {
  try {
    const { date, description, value } = req.body;

    const finance = new Finance({
      date: moment(date, 'DD/MM/YYYY').toDate(),
      description,
      value,
    });

    await finance.save();

    res.status(201).send(finance);
  } catch (error) {
    console.error('Erro ao adicionar receita:', error);
    res.status(500).send('Erro ao adicionar receita');
  }
});

app.get('/finances', async (req, res) => {
  try {
    const finances = await Finance.find();

    res.send(finances);
  } catch (error) {
    console.error('Erro ao buscar receitas:', error);
    res.status(500).send('Erro ao buscar receitas');
  }
});

app.post('/verificar-login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ name : username });

    if (user && user.password === password) {
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  } catch (error) {
    console.error('Erro ao verificar login:', error);
    res.status(500).send('Erro ao verificar login');
  }
});


// Rota para adicionar um novo cartão ao banco de dados
app.post('/cartoes', async (req, res) => {
  try {
    const { cardType, cardNumber, cardName, cardExpiry, cardCVV, cardSaldo, cardTp} = req.body;

    const cartoes = new Cartoes({
      cardType,
      cardNumber,
      cardName,
      cardExpiry,
      cardCVV,
      cardSaldo, 
      cardTp
    });

    await cartoes.save();

    res.status(201).json({ success: true, cartoes });
    
  } catch (error) {
    console.error('Erro ao adicionar Cartão:', error);
    res.status(500).send('Erro ao adicionar Cartão');
  }
});

app.get('/cartoes', async (req, res) => {
  try {
    const cartoes = await Cartoes.find();
    console.log(cartoes);

    res.json({ success: true, cartoes });
  } catch (error) {
    console.error('Erro ao buscar cartoes:', error);
    res.status(500).send('Erro ao buscar cartoes');
  }
});
const port = 3000;
app.listen(port, () => {
  console.log(`Servidor Express em execução na porta ${port}`);
});
