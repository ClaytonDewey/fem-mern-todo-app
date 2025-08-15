import { useState } from 'react';
import { TodoItem, TodoFooter } from '.';
import { useTasks } from '../hooks/useTasks';

export const TodoList = () => {
  const { tasks, isPending, isSuccess, isError } = useTasks();
  const [filter, setFilter] = useState('all'); // all | active | completed

  const activeItemCount = tasks.filter((task) => !task.completed).length;
  const completedItemCount = tasks.filter((task) => task.completed).length;

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
          {filteredTasks.map((task) => (
            <TodoItem key={task._id} task={task} />
          ))}
        </>
      )}

      <TodoFooter
        activeItemCount={activeItemCount}
        completedItemCount={completedItemCount}
        filter={filter}
        setFilter={setFilter}
      />
    </div>
  );
};
