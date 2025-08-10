import { useState } from 'react';
import { Button, Input, PasswordStrengthMeter } from '../components';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, Mail, User } from 'lucide-react';
import { register } from '../lib/api';
import { useMutation } from '@tanstack/react-query';

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

  const handleSubmit = (e) => {
    e.preventDefault();
    createAccount({ name: userName, email, password, confirmPassword });
  };

  return (
    <div className='form__wrapper'>
      <h2>Create an Account</h2>
      {isError && <p>{error?.message || 'An error occured'}</p>}
      <form onSubmit={handleSubmit}>
        <div className='form__group'>
          <label htmlFor='name' className='sr-only'>
            Name
          </label>
          <div className='form__icon-container'>
            <User className='form__icon' />
          </div>
          <Input
            type='text'
            id='name'
            placeholder='Name'
            value={userName}
            autoComplete='name'
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>

        <div className='form__group'>
          <label htmlFor='email' className='sr-only'>
            Email Address
          </label>
          <div className='form__icon-container'>
            <Mail className='form__icon' />
          </div>
          <Input
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
            type='password'
            id='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <PasswordStrengthMeter password={password} />

        <div className='form__group'>
          <label htmlFor='confirmPassword' className='sr-only'>
            Confirm Password
          </label>
          <div className='form__icon-container'>
            <Lock className='form__icon' />
          </div>
          <Input
            type='password'
            id='confirmPassword'
            placeholder='Confirm Password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
