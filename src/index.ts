import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import routes from './routes'; // Importando as rotas da API

const app = express();
const port = process.env.PORT || 3000;

// Conexão ao banco de dados
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Middleware para parsear JSON no corpo da requisição
app.use(express.json());

// Configurando as rotas da API
app.use('/', routes); // Utilizando as rotas definidas em routes.ts

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor ouvindo na porta ${port}`);
});
