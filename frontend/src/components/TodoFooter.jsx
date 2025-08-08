import { Button } from '.';
export const TodoFooter = (props) => {
  return (
    <footer className='todo todo__footer'>
      <span className='todo__count'>4 items left</span>
      <div className='todo__toggle-container'>
        <Button className='btn btn-text'>All</Button>
        <Button className='btn btn-text'>Active</Button>
        <Button className='btn btn-text'>Completed</Button>
      </div>
      <Button className='btn btn-text'>Clear Completed</Button>
    </footer>
  );
};
