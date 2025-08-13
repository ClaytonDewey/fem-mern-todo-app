import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Button, Input } from '../components';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft } from 'lucide-react';
import { sendPasswordResetEmail } from '../lib/api';

export const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');

  const {
    mutate: sendPasswordReset,
    // isPending,
    isSuccess,
    isError,
    error,
  } = useMutation({
    mutationFn: sendPasswordResetEmail,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    sendPasswordReset(email);
  };

  return (
    <div className='form__wrapper'>
      <h2>Forgot Password</h2>
      {isSuccess ? (
        <div className='alert alert-success'>
          Email sent! Check your inbox for further instructions.
        </div>
      ) : isError ? (
        <div className='alert alert-danger'>
          {error.message || 'An error occurred'}
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className='form__message'>
            <p className='text-center'>
              Enter your email address and we'll send you a link to reset your
              password.
            </p>
          </div>

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

          <Button onSubmit={handleSubmit} type='submit' className='form__btn'>
            Sign In
          </Button>
        </form>
      )}

      <div className='form__footer text-center'>
        <Link to={'/login'} className='form__footer-link'>
          <ArrowLeft className='form__footer-icon' /> Back to Login
        </Link>
      </div>
    </div>
  );
};
