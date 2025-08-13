import TaskModel from '../models/task.model';

type CreateAccountParams = {
  userId: string;
  task: string;
  completed: boolean;
};
export const createTask = async (data: CreateAccountParams) => {
  const newTask = await TaskModel.create({
    userId: data.userId,
    task: data.task,
    completed: false,
  });

  return { newTask };
};
