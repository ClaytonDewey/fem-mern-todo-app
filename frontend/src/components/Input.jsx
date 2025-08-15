import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export const Input = ({
  type = 'text',
  icon: Icon,
  error = '',
  success = false,
  ...props
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [touched, setTouched] = useState(false);

  const isPassword = type === 'password';
  const showError = touched && !!error;
  const showSuccess = touched && !error && success;

  return (
    <>
      <div
        className={`input__wrapper ${showError ? 'has-error' : ''} ${
          showSuccess ? 'has-success' : ''
        }`}>
        {Icon && (
          <span className='input__icon'>
            <Icon size={18} />
          </span>
        )}

        <input
          {...props}
          type={isPassword ? (isVisible ? 'text' : 'password') : type}
          className={`input__field ${Icon ? 'with-icon' : ''}`}
          aria-invalid={showError}
          aria-describedby={showError ? `${props.id}-error` : undefined}
          onBlur={(e) => {
            setTouched(true);
            props.onBlur && props.onBlur(e);
          }}
        />

        {isPassword && (
          <button
            type='button'
            className='input__toggle'
            onClick={() => setIsVisible((prev) => !prev)}
            aria-label={isVisible ? 'Hide password' : 'Show password'}>
            {isVisible ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}

        {showError && (
          <p id={`${props.id}-error`} className='input__error-message'>
            {error}
          </p>
        )}
      </div>
    </>
  );
};
