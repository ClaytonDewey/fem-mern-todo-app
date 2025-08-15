import { Button } from '.';
import { useClearCompletedTasks } from '../hooks/useTasks';

export const TodoFooter = ({
  activeItemCount,
  completedItemCount,
  filter,
  setFilter,
}) => {
  const { mutate: clearCompleted } = useClearCompletedTasks();

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
        onClick={() => clearCompleted()}
        title={
          completedItemCount === 0
            ? 'No completed tasks to clear'
            : 'Remove all completed tasks'
        }>
        Clear Completed
      </Button>
    </footer>
  );
};
