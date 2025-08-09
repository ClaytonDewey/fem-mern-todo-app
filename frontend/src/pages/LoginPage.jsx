import { useState } from 'react';
import { Button, Input } from '../components';
import { Link } from 'react-router-dom';
import { Lock, Mail } from 'lucide-react';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className='form__wrapper'>
      <h2>Welcome Back</h2>
      <form onSubmit={handleSubmit}>
        <div className='form__group'>
          <label htmlFor='email' className='sr-only'>
            Email Address
          </label>
          <div className='form__icon-container'>
            <Mail className='form__icon' />
          </div>
          <Input
            // ref={inputRef}
            type='email'
            id='email'
            placeholder='Email Address'
            value={email}
            autoComplete='email'
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className='form__group'>
          <label htmlFor='password' className='sr-only'>
            Password
          </label>
          <div className='form__icon-container'>
            <Lock className='form__icon' />
          </div>
          <Input
            // ref={inputRef}
            type='password'
            id='password'
            placeholder='Password'
            value={password}
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
        <Button onSubmit={handleSubmit} type='submit' className='form__btn'>
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
