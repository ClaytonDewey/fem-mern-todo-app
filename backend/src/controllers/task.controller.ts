import catchErrors from '../utils/catchErrors';
import { createTask } from '../services/task.service';
import { BAD_REQUEST, CREATED, NOT_FOUND, OK } from '../constants/http';
import TaskModel from '../models/task.model';
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
