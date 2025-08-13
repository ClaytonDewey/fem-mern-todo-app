import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import { getTasks, deleteTask } from '../lib/api';

export const TASKS = 'tasks';

export const useTasks = (opts = {}) => {
  const { data: tasks = [], ...rest } = useQuery({
    queryKey: [TASKS],
    queryFn: getTasks,
    ...opts,
  });

  return { tasks, ...rest };
};

export const useDeleteTask = (taskId) => {
  const queryClient = useQueryClient();
  const { mutate, ...rest } = useMutation({
    mutationFn: () => deleteTask(taskId),
    onSuccess: () => {
      queryClient.setQueryData([TASKS], (cache) =>
        cache.filter((task) => task._id !== taskId)
      );
    },
  });

  return { deleteTask: mutate, ...rest };
};
