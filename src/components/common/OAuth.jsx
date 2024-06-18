import { GoogleAuthProvider, getAuth, signInWithPopup, GithubAuthProvider } from 'firebase/auth';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import api, { setAuthorizationHeader } from '../../api/config';
import RoleModal from '../../components/RoleModal'; // Adjust the import based on your file structure
import { signInFailure, signInSuccess } from '../../redux/user/userSlice';
import { app } from '../../utils/firebase';

export default function OAuth({ text, providerName }) {
  const auth = getAuth(app);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [googleResults, setGoogleResults] = useState(null);

  const handleProviderClick = async () => {
    let provider = null;
    if (providerName === 'google') {
      provider = new GoogleAuthProvider();
    } else {
      provider = new GithubAuthProvider();
    }
    provider.setCustomParameters({ prompt: 'select_account' });
    const resultsFromGoogle = await signInWithPopup(auth, provider);
    try {
      if (!resultsFromGoogle) return;
      const response = await api.post(`/user/single-user`, {
        email: resultsFromGoogle.user.email,
      });

      if (response.status == 200) {
        const payload = {
          name: resultsFromGoogle.user.displayName,
          email: resultsFromGoogle.user.email,
          googlePhotoUrl: resultsFromGoogle.user.photoURL,
          role: response.data.role,
        };
        const res = await api.post('/auth/google', payload);

        if (res.status !== 200) {
          dispatch(signInFailure(res.message));
        }
        if (res.status == 200) {
          localStorage.setItem('token', res.data.token);
          setAuthorizationHeader(res.data.token); // Set the Authorization header
          dispatch(signInSuccess(res.data.user));
          navigate('/');
        }
      }
    } catch (error) {
      console.log('error', error);
      if (error.response.status === 404) {
        setGoogleResults(resultsFromGoogle);
        setIsRoleModalOpen(true);
      } else {
        dispatch(signInFailure(error.response.message));
      }
    }
  };

  const handleRoleSelect = async (role) => {
    setIsRoleModalOpen(false);
    if (!googleResults || !role) return;

    console.log('googleResults', googleResults);

    try {
      const res = await api.post('/auth/google', {
        name: googleResults.user.displayName,
        email: googleResults.user.email,
        googlePhotoUrl: googleResults.user.photoURL,
        role: role,
      });

      if (res.status !== 200) {
        dispatch(signInFailure(res.message));
      }

      if (res.status == 200) {
        localStorage.setItem('token', res.data.token);
        setAuthorizationHeader(res.data.token); // Set the Authorization header
        dispatch(signInSuccess(res.data.user));
        navigate('/');
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const getIcon = () => {
    if (providerName === 'google') {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 48 48"
          width="25px"
          height="25px"
        >
          <path
            fill="#fbc02d"
            d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
          />
          <path
            fill="#e53935"
            d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
          />
          <path
            fill="#4caf50"
            d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
          />
          <path
            fill="#1565c0"
            d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
          />
        </svg>
      );
    } else if (providerName === 'github') {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          width="25px"
          height="25px"
          fill="currentColor"
        >
          <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.674 7.674 0 0 1 2-.27c.68 0 1.36.09 2 .27 1.53-1.03 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.19 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
        </svg>
      );
    }
    return null;
  };

  return (
    <div>
      <button
        className="btn btn-outline-white w-full text-dark align-middle flex justify-center items-center"
        onClick={handleProviderClick}
      >
        {getIcon()}
        <span className="ml-2"> {text} With {providerName.charAt(0).toUpperCase() + providerName.slice(1)} </span>
      </button>
      <RoleModal
        isOpen={isRoleModalOpen}
        onClose={() => setIsRoleModalOpen(false)}
        onSelectRole={handleRoleSelect}
      />
    </div>
  );
}
