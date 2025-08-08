import { ThemeProvider } from 'styled-components';
import GlobalStyle from './theme/global';
import ThemeContext from './context/ThemeContext';
import { lightTheme, darkTheme } from './theme/themes';
import useThemeMode from './hooks/useThemeMode';
import { Toaster } from 'react-hot-toast';
import { AddTodo, Footer, Header, TogglerButton, TodoList } from './components';
import './sass/style.scss';

const App = () => {
  const { theme, themeToggler } = useThemeMode();
  const themeMode = theme === 'light' ? lightTheme : darkTheme;

  return (
    <ThemeContext>
      <ThemeProvider theme={themeMode}>
        <GlobalStyle />
        <div className='container'>
          <Toaster position='top-center' />
          <Header>
            <TogglerButton themeToggler={themeToggler} />
          </Header>
          <AddTodo />
          <TodoList />
          <Footer />
        </div>
      </ThemeProvider>
    </ThemeContext>
  );
};

export default App;
