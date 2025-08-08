import { Button } from '.';
import { IconCross } from '../icons';

export const TodoItem = (props) => {
  const { todo } = props;
  console.log(todo);
  return (
    <div className='todo'>
      <Button
        className={`todo__toggle ${todo.status === 'undone' ? '' : 'done'}`}>
        {todo.status === 'undone' ? (
          <span className='sr-only'>mark completed</span>
        ) : (
          <span className='sr-only'>mark undone</span>
        )}
      </Button>
      <div>
        <p
          style={{
            textDecoration:
              todo.status === 'completed' ? 'line-through' : 'none',
          }}>
          {todo.text}
        </p>
      </div>
      <Button className='btn btn-del'>
        <IconCross />
        <span className='sr-only'>Delete Todo</span>
      </Button>
    </div>
  );
};
