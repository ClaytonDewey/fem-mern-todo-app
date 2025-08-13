import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components';
import { logout } from '../lib/api';
import { LogOut } from 'lucide-react';

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
      <Button className='btn form__footer-link' onClick={signOut}>
        <LogOut className='form__footer-icon' />
        Logout
      </Button>
    </footer>
  );
};
