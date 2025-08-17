import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Button, Input, Loader } from '../components';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Lock, Mail } from 'lucide-react';
import { login } from '../lib/api';

export const LoginPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const redirectUrl = location.state?.redirectUrl || '/';

  const {
    mutate: signIn,
    // TODO: work on loading spinner
    isPending,
    isError,
  } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      navigate(redirectUrl, {
        replace: true,
      });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    signIn({ email, password });
  };

  if (isPending) {
    return <Loader />;
  }

  return (
    <div className='form__wrapper'>
      <h2>Sign in to your account</h2>
      {isError && (
        <div className='alert alert-danger'>Invalid email or password</div>
      )}
      <form onSubmit={handleSubmit}>
        <div className='form__group'>
          <label htmlFor='email' className='sr-only'>
            Email Address
          </label>
          <Input
            type='email'
            icon={Mail}
            id='email'
            placeholder='Email Address'
            value={email}
            autoComplete='email'
            error={!email && 'Email is required'}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className='form__group'>
          <label htmlFor='password' className='sr-only'>
            Password
          </label>
          <Input
            type='password'
            icon={Lock}
            id='password'
            placeholder='Password'
            value={password}
            error={!email && 'Password is required'}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className='form__message'>
          <p>
            <Link to='/forgot-password' className='form__message-link'>
              Forgot password?
            </Link>
          </p>
        </div>
        <Button
          onSubmit={handleSubmit}
          disabled={!email || password.length < 8}
          type='submit'
          className='form__btn'>
          Sign In
        </Button>
      </form>
      <div className='form__footer text-center'>
        Don't have an account?{' '}
        <Link to={'/signup'} className='form__footer-link'>
          Sign up
        </Link>
      </div>
    </div>
  );
};
