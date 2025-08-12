import { Button } from '.';
import { IconCross } from '../icons';

export const TodoItem = (props) => {
  const { task } = props;
  console.log(task.task);
  return (
    <div className='todo'>
      <Button className={`todo__toggle ${task.completed ? 'done' : 'undone'}`}>
        {task.completed ? (
          <span className='sr-only'>mark undone</span>
        ) : (
          <span className='sr-only'>mark completed</span>
        )}
      </Button>
      <div>
        <p
          style={{
            textDecoration: task.completed ? 'line-through' : 'none',
          }}>
          {task.task}
        </p>
      </div>
      <Button className='btn btn-del'>
        <IconCross />
        <span className='sr-only'>Delete Todo</span>
      </Button>
    </div>
  );
};
