import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export const AppContainer = () => {
  const { user, isLoading } = useAuth();

  return isLoading ? (
    <p>Loading</p>
  ) : user ? (
    <>
      <Outlet />
    </>
  ) : (
    <Navigate
      to='/login'
      replace
      state={{
        redirectUrl: window.location.pathname,
      }}
    />
  );
};
