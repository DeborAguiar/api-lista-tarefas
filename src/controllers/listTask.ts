import { Task } from '../models/task'; // Importando o modelo 'Task'

export async function listTasks(): Promise<Task[]> {
  const tasks = await Task.find();
  return tasks;
}