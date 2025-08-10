import { useQuery } from '@tanstack/react-query';
import { useParams, Link } from 'react-router-dom';
import { verifyEmail } from '../lib/api';
import { ArrowLeft } from 'lucide-react';

export const VerifyEmail = () => {
  const { code } = useParams();
  const { isPending, isSuccess, isError } = useQuery({
    queryKey: ['emailVerification', code],
    queryFn: () => verifyEmail(code),
  });
  return (
    <div className='form__wrapper'>
      {isPending ? (
        <p>spinning...</p>
      ) : (
        <div>
          <div className={`alert alert-${isSuccess ? 'success' : 'danger'}`}>
            {/* TODO: Add an icon for success or error */}
            {isSuccess ? 'Email Verified' : 'Invalid Link'}
          </div>

          {isError && (
            <div className='error-message'>
              The link is either invalid or expired.{' '}
              <Link
                to='/forgot-password'
                className='error-message-link'
                replace>
                Get a new link
              </Link>
            </div>
          )}
        </div>
      )}
      <div className='form__footer text-center'>
        <Link to={'/login'} className='form__footer-link'>
          <ArrowLeft className='form__footer-icon' /> Back to Login
        </Link>
      </div>
    </div>
  );
};
