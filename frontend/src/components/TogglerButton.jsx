import { Button } from '.';
import { IconSun, IconMoon } from '../icons';

export const TogglerButton = ({ themeToggler }) => {
  return (
    <div className='theme__container'>
      <Button onClick={themeToggler}>
        {window.localStorage.getItem('color-theme') !== 'light' ? (
          <>
            <IconSun />
            <span className='sr-only'>Set light mode</span>
          </>
        ) : (
          <>
            <IconMoon />
            <span className='sr-only'>Set dark mode</span>
          </>
        )}
      </Button>
    </div>
  );
};
