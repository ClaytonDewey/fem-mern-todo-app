import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import { getTasks, deleteTask, updateTask } from '../lib/api';

export const TASKS = 'tasks';

export const useTasks = (opts = {}) => {
  const { data: tasks = [], ...rest } = useQuery({
    queryKey: [TASKS],
    queryFn: getTasks,
    ...opts,
  });

  return { tasks, ...rest };
};

export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updates }) => updateTask(id, updates),
    onMutate: async ({ id, updates }) => {
      // Cancel any outgoing refetches to avoid overwriting our changes
      await queryClient.cancelQueries({ queryKey: ['tasks'] });

      // Snapshot previous value
      const previousTasks = queryClient.getQueryData(['tasks']);

      // Optimistically update cache
      queryClient.setQueryData(['tasks'], (old) =>
        old
          ? old.map((task) =>
              task._id === id ? { ...task, ...updates } : task
            )
          : []
      );

      // Return rollback context
      return { previousTasks };
    },
    onError: (err, variables, context) => {
      if (context?.previousTasks) {
        queryClient.setQueryData(['tasks'], context.previousTasks);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
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
