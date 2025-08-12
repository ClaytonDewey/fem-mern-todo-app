import { TodoItem, TodoFooter } from '.';
import useTasks from '../hooks/useTasks';

export const TodoList = () => {
  const { tasks, isPending, isSuccess, isError } = useTasks();

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
              {tasks.map((task, i) => (
                <TodoItem key={i} task={task} />
              ))}
            </>
          )}
        </>
      )}

      <TodoFooter />
    </div>
  );
};
