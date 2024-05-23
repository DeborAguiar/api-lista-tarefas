import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import { Task } from './models/task';

const app = express();
const port = process.env.PORT || 3000;

// Conexão ao banco de dados
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Middleware para parsear JSON no corpo da requisição
app.use(express.json());

// Rotas da API

// GET /tasks - Listar todas as tarefas
app.get('/tasks', async (req: Request, res: Response) => {
  const tasks = await Task.find();
  res.json(tasks);
});

// POST /tasks - Adicionar uma nova tarefa
app.post('/tasks', async (req: Request, res: Response) => {
  const newTask = new Task(req.body);
  await newTask.save();
  res.json(newTask);
});

// PUT /tasks/:id - Atualizar o status de uma tarefa
app.put('/tasks/:id', async (req: Request, res: Response) => {
  const taskId = req.params.id;
  const updatedTask = await Task.findByIdAndUpdate(taskId, req.body, { new: true });
  if (!updatedTask) {
    return res.status(404).json({ message: 'Task not found' });
  }
  res.json(updatedTask);
});

// DELETE /tasks/:id - Excluir uma tarefa
app.delete('/tasks/:id', async (req: Request, res: Response) => {
  const taskId = req.params.id;
  await Task.findByIdAndDelete(taskId);
  res.json({ message: 'Task deleted successfully' });
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
