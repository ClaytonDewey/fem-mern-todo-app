import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import {
  getTasks,
  deleteTask,
  updateTask,
  clearCompletedTasks,
} from '../lib/api';

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

export const useClearCompletedTasks = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: clearCompletedTasks,
    onMutate: async () => {
      // Cancel ongoing queries
      await queryClient.cancelQueries({ queryKey: [TASKS] });

      // snapshot previous data
      const previousTasks = queryClient.getQueryData([TASKS]);

      // Optimistically update: remove completed tasks from cache
      queryClient.setQueryData([TASKS], (old) =>
        old ? old.filter((task) => !task.completed) : []
      );

      return { previousTasks };
    },
    onError: (err, _, context) => {
      if (context?.previousTasks) {
        queryClient.setQueryData([TASKS], context.previousTasks);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [TASKS] });
    },
  });
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => deleteTask(id),
    onMutate: async (id) => {
      // cancel any ongoing fetches to prevent overwriting
      await queryClient.cancelQueries({ queryKey: ['tasks'] });

      // snapshot current tasks
      const previousTasks = queryClient.getQueryData(['tasks']);

      // remove the task from cache immediately
      queryClient.setQueryData(['tasks'], (old) =>
        old ? old.filter((task) => task._id !== id) : []
      );

      // return rollback data
      return { previousTasks };
    },
    onError: (err, id, context) => {
      // rollback if the request failed
      if (context?.previousTasks) {
        queryClient.setQueryData(['tasks'], context.previousTasks);
      }
    },
    onSettled: () => {
      // ensure data is in sync
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
};
