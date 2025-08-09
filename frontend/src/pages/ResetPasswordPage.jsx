import { useState } from 'react';
import { Button, Input, PasswordStrengthMeter } from '../components';
import { Lock } from 'lucide-react';

export const ResetPasswordPage = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className='form__wrapper'>
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
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
          Set New Password
        </Button>
      </form>
    </div>
  );
};
