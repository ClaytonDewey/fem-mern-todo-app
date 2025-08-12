import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Input } from '.';
import toast from 'react-hot-toast';
import { createTask } from '../lib/api';

export const AddTodo = () => {
  const [task, setTask] = useState('');
  const queryClient = useQueryClient();

  const { mutate: createNewTask, isPending } = useMutation({
    mutationFn: createTask,
    onMutate: async (newTask) => {
      // Cancel any outgoing refetches to avoid overwriting optimistic update
      await queryClient.cancelQueries({ queryKey: ['tasks'] });

      // Snapshot previous tasks
      const previousTasks = queryClient.getQueryData(['tasks']);

      // Optimistically add the new task
      queryClient.setQueryData(['tasks'], (old = []) => [
        ...old,
        {
          _id: Math.random().toString(36).substr(2, 9), // temp ID
          task: newTask.task,
          completed: false,
          optimistic: true,
        },
      ]);

      setTask(''); // Clear the input right away

      // Return snapshot so we can roll back on error
      return { previousTasks };
    },
    onError: (err, newTask, context) => {
      // Roll back to previous tasks
      queryClient.setQueryData(['tasks'], context.previousTasks);
      toast.error(err.message || 'Something went wrong');
    },
    onSettled: () => {
      // Always refetch after mutation to sync with server
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
    onSuccess: () => {
      toast.success('Todo item added successfully!');
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task === '') {
      toast.error('Please enter a todo item');
      return;
    }
    createNewTask({ task });
  };

  return (
    <>
      <div className='todo todo__add'>
        <div className='todo__toggle'></div>
        <form onSubmit={handleSubmit}>
          <label htmlFor='todo' className='sr-only'>
            New Todo
          </label>
          <Input
            type='text'
            id='todo'
            name='todo'
            placeholder='Create a new todo...'
            value={task}
            onChange={(e) => setTask(e.target.value)}
            disabled={isPending}
          />
        </form>
      </div>
    </>
  );
};
