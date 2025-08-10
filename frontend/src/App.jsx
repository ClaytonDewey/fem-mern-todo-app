import { ThemeProvider } from 'styled-components';
import GlobalStyle from './theme/global';
import ThemeContext from './context/ThemeContext';
import { lightTheme, darkTheme } from './theme/themes';
import useThemeMode from './hooks/useThemeMode';
import { Toaster } from 'react-hot-toast';
import { AppContainer, Header, TogglerButton } from './components';
import { Routes, Route, useNavigate } from 'react-router-dom';
import {
  HomePage,
  LoginPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  SignUpPage,
  VerifyEmail,
} from './pages/';
import './sass/style.scss';
import { setNavigate } from './lib/navigation';

const App = () => {
  const { theme, themeToggler } = useThemeMode();
  const themeMode = theme === 'light' ? lightTheme : darkTheme;
  const navigate = useNavigate();
  setNavigate(navigate);

  return (
    <ThemeContext>
      <ThemeProvider theme={themeMode}>
        <GlobalStyle />
        <div className='container'>
          <Toaster position='top-center' />
          <Header>
            <TogglerButton themeToggler={themeToggler} />
          </Header>
          <Routes>
            <Route path='/' element={<AppContainer />}>
              <Route index element={<HomePage />} />
            </Route>
            <Route path='/login' element={<LoginPage />} />
            <Route path='/verify-email/:code' element={<VerifyEmail />} />
            <Route path='/forgot-password' element={<ForgotPasswordPage />} />
            <Route path='/reset-password' element={<ResetPasswordPage />} />
            <Route path='/signup' element={<SignUpPage />} />
          </Routes>
          <footer>
            <div className='attribution'>
              Challenge by{' '}
              <a
                href='https://www.frontendmentor.io?ref=challenge'
                target='_blank'>
                Frontend Mentor
              </a>
              . Coded by{' '}
              <a href='https://www.claytondewey.com'>Clayton Dewey</a>.
            </div>
          </footer>
        </div>
      </ThemeProvider>
    </ThemeContext>
  );
};

export default App;
