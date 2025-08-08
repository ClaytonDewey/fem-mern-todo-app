import { useRef, useState } from 'react';
import { Input } from '.';
import toast from 'react-hot-toast';

export const AddTodo = () => {
  const [input, setInput] = useState('');
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() !== '') {
      setInput('');
      toast.success('Todo added successfully!');
    } else {
      toast.error('Todo field cannot be empty!');
    }
  };

  return (
    <div className='todo todo__add'>
      <div className='todo__toggle'></div>
      <form onSubmit={handleSubmit}>
        <label htmlFor='todo' className='sr-only'>
          New Todo
        </label>
        <Input
          ref={inputRef}
          type='text'
          id='todo'
          name='todo'
          placeholder='Create a new todo...'
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </form>
    </div>
  );
};
