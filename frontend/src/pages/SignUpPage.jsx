import { useState } from 'react';
import { Button, Input, PasswordStrengthMeter } from '../components';
import { Link } from 'react-router-dom';
import { Lock, Mail, User } from 'lucide-react';

export const SignUpPage = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className='form__wrapper'>
      <h2>Create an Account</h2>
      <form onSubmit={handleSubmit}>
        <div className='form__group'>
          <label htmlFor='name' className='sr-only'>
            Name
          </label>
          <div className='form__icon-container'>
            <User className='form__icon' />
          </div>
          <Input
            // ref={inputRef}
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

        <PasswordStrengthMeter password={password} />

        <div className='form__group'>
          <label htmlFor='confirmPassword' className='sr-only'>
            Confirm Password
          </label>
          <div className='form__icon-container'>
            <Lock className='form__icon' />
          </div>
          <Input
            // ref={inputRef}
            type='password'
            id='confirmPassword'
            placeholder='Confirm Password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        {/* TODO: Show success indicator if password/confirmpassword match */}
        <Button onSubmit={handleSubmit} type='submit' className='form__btn'>
          Create Account
        </Button>

        <footer className='form__footer'>
          <p>
            Already have an account?{' '}
            <Link to='/login' className='btn btn-text'>
              Sign in
            </Link>
          </p>
        </footer>
      </form>
    </div>
  );
};
