import { TodoItem, TodoFooter } from '.';

export const TodoList = () => {
  return (
    <div className='todo__list'>
      <TodoItem
        todo={{ text: 'Feed the cat', status: 'completed', id: 1 }}
        key={1}
      />
      <TodoItem
        todo={{ text: 'Feed the dog', status: 'undone', id: 2 }}
        key={2}
      />
      <TodoItem
        todo={{ text: 'Do laundry', status: 'undone', id: 3 }}
        key={3}
      />
      <TodoItem
        todo={{ text: 'Clean the kitchen', status: 'completed', id: 4 }}
        key={4}
      />

      <TodoFooter />
    </div>
  );
};
