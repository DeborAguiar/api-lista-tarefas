
export async function updateTask(taskId: string, taskData: { title?: string, description?: string }): Promise<Task | null> {
  const updatedTask = await Task.findByIdAndUpdate(taskId, taskData, { new: true });
  return updatedTask;
}