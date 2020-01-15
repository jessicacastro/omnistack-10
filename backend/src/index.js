const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();

// Conexão com o banco de dados.
mongoose.connect('mongodb+srv://userdev:userdev@2020@cluster0-21gmd.mongodb.net/omnistack10?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});

// Utilizando JSON -> Sempre antes das rotas. Express faz leitura linear.
app.use(express.json());

// Utilizando o arquivo de rotas.
app.use(routes);

// Rota de teste de funcionamento do server.
app.get('/', (req, res) => {
    res.status(200).json({ message: 'backend works!'});
})

// Definindo o localhost:numero
app.listen(3333);