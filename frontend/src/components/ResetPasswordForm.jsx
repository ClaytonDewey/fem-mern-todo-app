import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Input, Button, PasswordStrengthMeter } from '.';
import { Lock } from 'lucide-react';
import { resetPassword } from '../lib/api';

export const ResetPasswordForm = ({ code }) => {
  const [password, setPassword] = useState('');
  const {
    mutate: resetUserPassword,
    // isPending,
    isSuccess,
    isError,
    error,
  } = useMutation({
    mutationFn: resetPassword,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    resetUserPassword({ password, verificationCode: code });
  };
  return (
    <>
      <h2>Reset Password</h2>
      {isError && (
        <div className='alert alert-danger'>
          {error.message || 'An error occurred'}
        </div>
      )}
      {isSuccess ? (
        <>
          <div className='alert alert-success'>
            Password updated successfully!
          </div>
          <footer className='form__footer'>
            <p className='text-center'>
              <Link to='/login' className='form__footer-link'>
                Sign in
              </Link>
            </p>
          </footer>
        </>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className='form__group'>
            <label htmlFor='password' className='sr-only'>
              Password
            </label>
            <div className='form__icon-container'>
              <Lock className='form__icon' />
            </div>
            <Input
              type='password'
              id='password'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <PasswordStrengthMeter password={password} />

          {/* TODO: Show success indicator if password/confirmpassword match */}
          <Button
            disabled={password.length < 8}
            onSubmit={handleSubmit}
            type='submit'
            className='form__btn'>
            Set New Password
          </Button>
        </form>
      )}
    </>
  );
};
