import { Toaster } from 'react-hot-toast';
import { AddTodo, TogglerButton, Footer, Header, TodoList } from './components';
import './sass/style.scss';

function App() {
  return (
    <div className='container'>
      <Toaster position='top-center' />
      <Header>
        <TogglerButton />
      </Header>
      <AddTodo />
      <TodoList />
      <Footer />
    </div>
  );
}

export default App;
