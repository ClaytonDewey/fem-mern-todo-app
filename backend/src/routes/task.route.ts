import { Router } from 'express';
import {
  createTaskHandler,
  deleteTaskHandler,
  getTasksHandler,
  updateTaskHandler,
} from '../controllers/task.controller';

const taskRoutes = Router();

// prefix: /tasks
taskRoutes.post('/create-task', createTaskHandler);
taskRoutes.get('/', getTasksHandler);
taskRoutes.patch('/:id', updateTaskHandler);
taskRoutes.delete('/:id', deleteTaskHandler);

export default taskRoutes;
