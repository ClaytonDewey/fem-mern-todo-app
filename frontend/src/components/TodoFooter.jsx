import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '.';
import { clearCompletedTasks } from '../lib/api';

export const TodoFooter = ({
  activeItemCount,
  completedItemCount,
  filter,
  setFilter,
}) => {
  const queryClient = useQueryClient();

  const { mutate: clearCompleted, isPending: isClearing } = useMutation({
    mutationFn: clearCompletedTasks,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  return (
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
          className={`btn btn-text ${filter === 'completed' ? 'active' : ''} '`}
          onClick={() => setFilter('completed')}>
          Completed
        </Button>
      </div>
      <Button
        className='btn btn-text'
        onClick={() => clearCompleted}
        title={
          completedItemCount === 0
            ? 'No completed tasks to clear'
            : 'Remove all completed tasks'
        }
        disabled={isClearing || completedItemCount === 0}>
        {isClearing ? 'Clearing...' : 'Clear Completed'}
      </Button>
    </footer>
  );
};
