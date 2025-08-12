import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteTask } from '../lib/api';
import { TASKS } from './useTasks';

const useDeleteTask = (taskId) => {
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

export default useDeleteTask;
