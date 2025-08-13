import catchErrors from '../utils/catchErrors';
import { createTask } from '../services/task.service';
import {
  BAD_REQUEST,
  CREATED,
  FORBIDDEN,
  NOT_FOUND,
  OK,
} from '../constants/http';
import TaskModel, { TaskDocument } from '../models/task.model';
import appAssert from '../utils/appAssert';

export const createTaskHandler = catchErrors(async (req, res) => {
  const task = await TaskModel.create({
    task: req.body.task,
    userId: req.userId,
  });
  res.status(OK).json({ task });
});

export const getTasksHandler = catchErrors(async (req, res) => {
  const tasks = await TaskModel.find({ userId: req.userId });
  appAssert(tasks, NOT_FOUND, 'Todo items not found');

  res.status(OK).json(tasks);
});

interface UpdateTaskBody {
  userId: string;
  task?: string;
  completed?: boolean;
}

export const updateTaskHandler = catchErrors(async (req, res) => {
  const taskId = req.params.id;
  const userId = req.userId;
  const { task, completed } = req.body;

  appAssert(userId, FORBIDDEN, 'Cannot edit this todo item');

  const updateFields: Partial<Pick<TaskDocument, 'task' | 'completed'>> = {};
  if (task !== undefined) updateFields.task = task;
  if (completed !== undefined) updateFields.completed = completed;

  const updatedTask = await TaskModel.findOneAndUpdate(
    { _id: taskId, userId },
    updateFields,
    { new: true }
  );
  appAssert(
    updatedTask,
    NOT_FOUND,
    'Todo item not found or user not authorized'
  );
  return res.status(OK).json(updatedTask);
});

export const deleteTaskHandler = catchErrors(async (req, res) => {
  const taskId = req.params.id;
  const userId = req.userId;
  const deleted = await TaskModel.findOneAndDelete({
    _id: taskId,
    userId,
  });
  appAssert(deleted, NOT_FOUND, 'Task not found');
  return res.status(OK).json({ message: 'Todo item deleted' });
});

export const deleteCompletedHandler = catchErrors(async (req, res) => {
  const deleted = await TaskModel.deleteMany({ completed: true });
  appAssert(deleted, BAD_REQUEST, 'Failed to delete tasks');
  res.status(OK).json({ message: 'Completed tasks cleared' });
});
