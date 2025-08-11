import { Link, useSearchParams } from 'react-router-dom';
import { ResetPasswordForm } from '../components';

export const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');
  const exp = Number(searchParams.get('exp'));
  const now = Date.now();
  const linkIsValid = code && exp && exp > now;

  return (
    <div className='form__wrapper'>
      {linkIsValid ? (
        <ResetPasswordForm code={code} />
      ) : (
        <div className='alert alert-danger'>
          The link is either invalide or expired.{' '}
          <Link to='/forgot-password' replace>
            Request a new password reset link
          </Link>
        </div>
      )}
    </div>
  );
};
