import { useState } from 'react';
import { Button, Input, PasswordStrengthMeter } from '../components';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, Mail, User } from 'lucide-react';
import { register } from '../lib/api';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

export const SignUpPage = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const {
    mutate: createAccount,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: register,
    onSuccess: () => {
      navigate('/', {
        replace: true,
      });
    },
  });

  const passwordMatch =
    password && confirmPassword && password === confirmPassword;

  const handleSubmit = (e) => {
    e.preventDefault();
    createAccount({ name: userName, email, password, confirmPassword });
  };

  return (
    <div className='form__wrapper'>
      <h2>Create an Account</h2>
      {isError && toast.error(error?.message || 'An error occured')}
      <form onSubmit={handleSubmit}>
        <div className='form__group'>
          <label htmlFor='name' className='sr-only'>
            Name
          </label>
          <Input
            type='text'
            icon={User}
            id='name'
            placeholder='Name'
            value={userName}
            autoComplete='name'
            onChange={(e) => setUserName(e.target.value)}
            error={!userName && 'Name is required'}
          />
        </div>

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
            onChange={(e) => setEmail(e.target.value)}
            error={!email && 'Email is required'}
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
            onChange={(e) => setPassword(e.target.value)}
            error={
              password && password.length < 8
                ? 'Password must be at least 8 characters'
                : ''
            }
          />
        </div>

        <PasswordStrengthMeter password={password} />

        <div className='form__group'>
          <label htmlFor='confirmPassword' className='sr-only'>
            Confirm Password
          </label>
          <Input
            type='password'
            icon={Lock}
            id='confirmPassword'
            placeholder='Confirm Password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={
              confirmPassword && password !== confirmPassword
                ? 'Passwords do not match'
                : ''
            }
            success={passwordMatch}
          />
        </div>
        {/* TODO: Show success indicator if password/confirmpassword match */}
        <Button
          disabled={
            !email || password.length < 8 || password !== confirmPassword
          }
          onSubmit={handleSubmit}
          type='submit'
          className='form__btn'>
          {isPending ? 'Please wait...' : 'Create Account'}
        </Button>

        <footer className='form__footer'>
          <p>
            Already have an account?{' '}
            <Link to='/login' className='form__footer-link'>
              Sign in
            </Link>
          </p>
        </footer>
      </form>
    </div>
  );
};
