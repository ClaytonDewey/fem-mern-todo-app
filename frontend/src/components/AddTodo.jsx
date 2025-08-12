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
    onSuccess: () => {
      toast.success('Todo item added successfully!');
      queryClient.invalidateQueries({ queryKey: ['tasks'] }); // Refresh task list
      setTask(''); // Clear input after success
    },
    onError: (error) => {
      toast.error(error.message || 'Something went wrong');
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
