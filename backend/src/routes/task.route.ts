import { Router } from 'express';
import { createTaskHandler } from '../controllers/task.controller';

const taskRoutes = Router();

// prefix: /tasks
taskRoutes.post('/create-task', createTaskHandler);

export default taskRoutes;
