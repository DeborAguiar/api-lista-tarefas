
export async function addTask(taskData: { title: string, description?: string }): Promise<Task> {
  const newTask = new Task({
    title: taskData.title,
    description: taskData.description || '', // Set description to empty string if not provided
  });

  await newTask.save();
  return newTask;
}
