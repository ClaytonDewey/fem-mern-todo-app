import { Button } from '.';
export const TodoFooter = (props) => {
  const { tasks } = props;
  const activeItemCount = tasks.filter(
    (task) => task.completed === false
  ).length;

  return (
    <footer className='todo todo__footer'>
      <span className='todo__count'>
        {activeItemCount === 1
          ? '1 item left'
          : `${activeItemCount} items left`}
      </span>
      <div className='todo__toggle-container'>
        <Button className='btn btn-text active'>All</Button>
        <Button className='btn btn-text'>Active</Button>
        <Button className='btn btn-text'>Completed</Button>
      </div>
      <Button className='btn btn-text'>Clear Completed</Button>
    </footer>
  );
};
