import { IconCheck, IconCross, IconMoon, IconSun } from './index';

const Icon = ({ name }) => {
  switch (name) {
    case 'Check':
      return <IconCheck />;
    case 'Cross':
      return <IconCross />;
    case 'Moon':
      return <IconMoon />;
    case 'Sun':
      return <IconSun />;
    default:
      return <IconCheck />;
  }
};
export default Icon;
