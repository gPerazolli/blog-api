require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose'); 

const postRoutes = require('./routes/postRoutes.js');
const teacherRoutes = require('./routes/teacherRoutes.js');

const mongoURI = process.env.MONGO_URI 

const app = express();
const PORT = 3000;

app.use(express.json());

app.use((req, res, next) => {
    console.log(`Requisição recebida: ${req.method} ${req.url}`);
    next();
});

mongoose.connect(mongoURI)
  .then(() => console.log('Conectado ao MongoDB'))
  .catch(err => console.error('Erro ao conectar no MongoDB', err));

app.use('/posts', postRoutes);
app.use('/teacher', teacherRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
