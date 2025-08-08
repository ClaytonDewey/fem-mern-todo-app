export const Header = ({ children }) => {
  return (
    <header className='todo__header'>
      <h1>todo</h1>
      {children}
    </header>
  );
};
