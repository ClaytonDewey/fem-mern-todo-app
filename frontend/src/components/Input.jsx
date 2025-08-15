import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export const Input = ({ type = 'text', ...props }) => {
  const [isVisible, setIsVisible] = useState(false);
  const isPassword = type === 'password';

  return (
    <div className='input__wrapper'>
      <input
        {...props}
        type={isPassword ? (isVisible ? 'text' : 'password') : type}
        className='input__field'
      />
      {isPassword && (
        <button
          type='button'
          className='input__toggle'
          onClick={() => setIsVisible((prev) => !prev)}>
          {isVisible ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      )}
    </div>
  );
};
