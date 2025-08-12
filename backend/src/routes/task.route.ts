import { Router } from 'express';
import {
  createTaskHandler,
  deleteTaskHandler,
  getTasksHandler,
} from '../controllers/task.controller';

const taskRoutes = Router();

// prefix: /tasks
taskRoutes.post('/create-task', createTaskHandler);
taskRoutes.get('/', getTasksHandler);
taskRoutes.delete('/:id', deleteTaskHandler);

export default taskRoutes;
