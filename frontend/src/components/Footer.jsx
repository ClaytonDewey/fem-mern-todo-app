import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components';
import { logout } from '../lib/api';

export const Footer = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: signOut } = useMutation({
    mutationFn: logout,
    onSettled: () => {
      queryClient.clear();
      navigate('/login', { replace: true });
    },
  });

  return (
    <footer className='footer__main'>
      <p>Drag and drop to reorder list</p>
      <Button onClick={signOut}>Logout</Button>
    </footer>
  );
};
