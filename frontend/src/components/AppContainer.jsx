import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { Loader } from '.';

export const AppContainer = () => {
  const { user, isLoading } = useAuth();

  return isLoading ? (
    <Loader />
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
