import express, { Request, Response } from 'express';

const router = express.Router();

// GET /tasks - Listar todas as tarefas
router.get('/tasks', async (req: Request, res: Response) => {
  const tasks = await Task.find();
  res.json(tasks);
});

// POST /tasks - Adicionar uma nova tarefa
router.post('/tasks', async (req: Request, res: Response) => {
  const newTask = new Task(req.body);
  await newTask.save();
  res.json(newTask);
});

// PUT /tasks/:id - Atualizar o status de uma tarefa
router.put('/tasks/:id', async (req: Request, res: Response) => {
  const taskId = req.params.id;
  const updatedTask = await Task.findByIdAndUpdate(taskId, req.body, { new: true });
  if (!updatedTask) {
    return res.status(404).json({ message: 'Task not found' });
  }
  res.json(updatedTask);
});

// DELETE /tasks/:id - Excluir uma tarefa
router.delete('/tasks/:id', async (req: Request, res: Response) => {
  const taskId = req.params.id;
  await Task.findByIdAndDelete(taskId);
  res.json({ message: 'Task deleted successfully' });
});

export default router;
