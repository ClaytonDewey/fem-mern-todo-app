import { useQuery } from '@tanstack/react-query';
import { getTasks } from '../lib/api';

export const TASKS = 'tasks';

const useTasks = (opts = {}) => {
  const { data: tasks = [], ...rest } = useQuery({
    queryKey: [TASKS],
    queryFn: getTasks,
    ...opts,
  });

  return { tasks, ...rest };
};

export default useTasks;
