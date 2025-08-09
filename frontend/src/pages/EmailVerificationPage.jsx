import { useRef, useState } from 'react';
import { Button } from '../components';

export const EmailVerificationPage = () => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef([]);

  const handleChange = (index, value) => {
    const newCode = [...code];

    // Handle pasted content
    if (value.length > 1) {
      const pastedCode = value.slice(0, 6).split('');
      for (let i = 0; i < 6; i++) {
        newCode[i] = pastedCode[i] || '';
      }
      setCode(newCode);
      // Focus on the last non-empty input or the first empty one
      const lastFilledIndex = newCode.findLastIndex((digit) => digit !== '');
      const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
      inputRefs.current[focusIndex].focus();
    } else {
      newCode[index] = value;
      setCode(newCode);

      // Move focus to the next input field if value is entered
      if (value && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className='form__wrapper'>
      <h2>Verify Your Email</h2>
      <p className='text-center'>
        Enter the 6-digit code sent to your email address
      </p>
      <form onSubmit={handleSubmit}>
        <div className='input__group'>
          {code.map((digit, index) => (
            <input
              id={index}
              key={index}
              type='number'
              ref={(el) => (inputRefs.current[index] = el)}
              maxLength='6'
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className='input__group-number'
            />
          ))}
        </div>
        <Button type='submit' className='form__btn'>
          Verify Email
        </Button>
      </form>
    </div>
  );
};
