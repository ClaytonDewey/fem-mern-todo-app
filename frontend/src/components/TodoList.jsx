import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { TodoItem, Button } from '.';
import { useTasks } from '../hooks/useTasks';
import { clearCompletedTasks } from '../lib/api';

export const TodoList = () => {
  const { tasks, isPending, isSuccess, isError } = useTasks();
  const [filter, setFilter] = useState('all'); // all | active | completed
  const queryClient = useQueryClient();

  // Mutation for clearing completed tasks
  const { mutate: clearCompleted, isPending: isClearing } = useMutation({
    mutationFn: clearCompletedTasks,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  const activeItemCount = tasks.filter((task) => !task.completed).length;

  // Filter tasks based on current filter
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true; // display all
  });

  if (!tasks.length) {
    return (
      <div className='todo__list'>
        <div className='todo todo__empty'>
          <h2>You have nothing to do!</h2>
          <blockquote>
            &ldquo;Wherever you are is the entry point.&rdquo;
            <cite>Kabir</cite>
          </blockquote>
        </div>
      </div>
    );
  }

  return (
    <div className='todo__list'>
      {isPending && <p>Loading...</p>}
      {isError && <div className='alert alert-danger'>Failed to get tasks</div>}
      {isSuccess && (
        <>
          {tasks.length === 0 ? (
            <p>No tasks</p>
          ) : (
            <>
              {filteredTasks.map((task) => (
                <TodoItem key={task._id} task={task} />
              ))}
            </>
          )}
        </>
      )}

      <footer className='todo todo__footer'>
        <span className='todo__count'>
          {activeItemCount === 1
            ? '1 item left'
            : `${activeItemCount} items left`}
        </span>
        <div className='todo__toggle-container'>
          <Button
            className={`btn btn-text ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}>
            All
          </Button>
          <Button
            className={`btn btn-text ${filter === 'active' ? 'active' : ''}`}
            onClick={() => setFilter('active')}>
            Active
          </Button>
          <Button
            className={`btn btn-text ${
              filter === 'completed' ? 'active' : ''
            } '`}
            onClick={() => setFilter('completed')}>
            Completed
          </Button>
        </div>
        <Button className='btn btn-text' onClick={() => clearCompleted}>
          {isClearing ? 'Clearing...' : 'Clear Completed'}
        </Button>
      </footer>
    </div>
  );
};
