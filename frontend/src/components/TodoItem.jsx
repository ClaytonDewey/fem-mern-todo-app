import { useState } from 'react';
import { Button } from '.';
import { IconCross } from '../icons';
import { useDeleteTask, useUpdateTask } from '../hooks/useTasks';

export const TodoItem = ({ task }) => {
  const { mutate: updateTaskMutation } = useUpdateTask();
  const { mutate: deleteTask } = useDeleteTask();

  const [isEditing, setIsEditing] = useState(false);
  const [draftText, setDraftText] = useState(task.task);

  // Toggle completed status (optimistic)
  const toggleCompleted = () => {
    updateTaskMutation({
      id: task._id,
      updates: { completed: !task.completed },
    });
  };

  // Save updated text (optimistic)
  const saveEdit = () => {
    const trimmed = draftText.trim();
    if (trimmed && trimmed !== task.task) {
      updateTaskMutation({
        id: task._id,
        updates: { task: trimmed },
      });
    }
    setIsEditing(false);
  };

  return (
    <div className='todo'>
      <Button
        className={`todo__toggle ${task.completed ? 'done' : 'undone'}`}
        onClick={toggleCompleted}>
        {task.completed ? (
          <span className='sr-only'>Mark undone</span>
        ) : (
          <span className='sr-only'>Mark completed</span>
        )}
      </Button>

      <div className='todo__edit' onClick={() => setIsEditing(true)}>
        {isEditing ? (
          <input
            type='text'
            className='input__field'
            value={draftText}
            onChange={(e) => setDraftText(e.target.value)}
            onBlur={saveEdit}
            onKeyDown={(e) => {
              if (e.key === 'Enter') saveEdit();
              if (e.key === 'Escape') {
                setDraftText(task.task);
                setIsEditing(false);
              }
            }}
          />
        ) : (
          <p
            style={{
              textDecoration: task.completed ? 'line-through' : 'none',
            }}>
            {task.task}
          </p>
        )}
      </div>

      <Button className='btn btn-del' onClick={() => deleteTask(task._id)}>
        <IconCross />
        <span className='sr-only'>Delete Todo</span>
      </Button>
    </div>
  );
};
