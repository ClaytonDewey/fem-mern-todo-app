import { Link } from 'react-router-dom';

export const Header = ({ children }) => {
  return (
    <header className='todo__header'>
      <h1>
        <Link to='/'>todo</Link>
      </h1>
      {children}
    </header>
  );
};
