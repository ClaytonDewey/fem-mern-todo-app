import { Button } from '.';
import { IconSun, IconMoon } from '../icons';

export const TogglerButton = () => {
  const theme = 'light';

  return (
    <div className='theme__container'>
      <Button>
        {theme !== 'light' ? (
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
