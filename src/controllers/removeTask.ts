import { Task } from '../models/task'; // Importando o modelo 'Task'

export async function removeTask(taskId: string): Promise<void> {
  await Task.findByIdAndDelete(taskId);
}