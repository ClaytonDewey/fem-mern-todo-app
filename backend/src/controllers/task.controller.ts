import catchErrors from '../utils/catchErrors';
import { createTask } from '../services/task.service';
import { CREATED } from '../constants/http';

export const createTaskHandler = catchErrors(async (req, res) => {
  const userId = req.params.id;
  const request = { ...req.body, userId };
  const newTask = await createTask(request);

  return res.status(CREATED).json(newTask);
});
