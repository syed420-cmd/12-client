import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import api, { setAuthorizationHeader } from '../../api/config.js';
import OAuth from '../../components/common/OAuth.jsx';
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from '../../redux/user/userSlice';
const Login = () => {
  const [formData, setFormData] = useState({});
  const {
    loading,
    error: errorMessage,
    currentUser,
  } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure('Please fill all the fields'));
    }
    try {
      dispatch(signInStart());
      const res = await api.post('/auth/signin', formData);
      const data = res.data;
      if (data.status !== 200) {
        dispatch(signInFailure(data.message));
      }

      if (res.status == 200) {
        localStorage.setItem('token', data.token);
        setAuthorizationHeader(data.token); // Set the Authorization header
        dispatch(signInSuccess(data.user));
        navigate('/');
      }
    } catch (error) {
      console.log('error', error);
      dispatch(
        signInFailure(error?.response?.data?.message || 'Somethid is wrong'),
      );
    }
  };

  useEffect(() => {
    if (currentUser) {
      navigate(-1);
    }
  }, [currentUser]);

  return (
    <section className="">
      <div className="container max-w-full">
        <div className="row">
          <div className="min-h-[980px] bg-white py-10 lg:col-12 lg:py-[114px]">
            <div className="mx-auto w-full max-w-[480px]">
              <h1 className="mb-4">Sign In</h1>
              <div className="signin-options mt-10 flex flex-col gap-2">
                <OAuth text="Sign In" providerName="google" />
                <OAuth text="Sign In" providerName="github" />
              </div>
              <div className="relative my-8 text-center after:absolute after:left-0 after:top-1/2 after:z-[0] after:w-full after:border-b after:border-border after:content-['']">
                <span className="relative z-[1] inline-block bg-white px-2">
                  Or Sign In With Email
                </span>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    Email Adrdess
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-control"
                    placeholder="Your Email Address"
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group mt-4">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Your Password"
                  />
                </div>
                {errorMessage && (
                  <div
                    className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                    role="alert"
                  >
                    <span className="block sm:inline">{errorMessage}</span>
                  </div>
                )}
                <button
                  className="btn btn-primary mt-10 block w-full"
                  type="submit"
                >
                  {loading ? (
                    <>
                      <span className="pl-3">Loading...</span>
                    </>
                  ) : (
                    'Sign In'
                  )}
                </button>
                <p className="mt-6 text-center">
                  {/* eslint-disable-next-line react/no-unescaped-entities */}
                  Don't have an account?{' '}
                  <Link className="text-dark" to="/sign-up">
                    Sign up
                  </Link>{' '}
                  for create account
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
