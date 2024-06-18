import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../api/config';
import OAuth from '../../components/common/OAuth';
const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const validatePassword = (password) => {
    const errors = [];
    if (password.length < 6)
      errors.push('Password must be at least 6 characters long.');
    if (!/[A-Z]/.test(password))
      errors.push('Password must contain at least one capital letter.');
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password))
      errors.push('Password must contain at least one special character.');
    if (!/[0-9]/.test(password))
      errors.push('Password must contain at least one numeric character.');
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.c_password ||
      !formData.role
    ) {
      return setErrorMessage('Please fill out all fields.');
    }

    if (formData.password !== formData.c_password) {
      return setErrorMessage('Password and Confirm Password must be the same.');
    }

    const passwordErrors = validatePassword(formData.password);
    if (passwordErrors.length > 0) {
      return setErrorMessage(passwordErrors.join(' '));
    }

    try {
      setLoading(true);
      setErrorMessage(null);
      console.log('formData', formData);
      const res = await api.post('/auth/signup', formData);
      setLoading(false);
      if (res.status === 200) {
        toast.success('Account created successfully');
        navigate('/sign-in');
      }
    } catch (error) {
      console.log('error', error);
      setErrorMessage(error?.response?.data?.message || 'Something went wrong');
      setLoading(false);
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
              <h1 className="mb-4">Sign Up</h1>
              <div className="signin-options mt-10 flex flex-col gap-2">
                <OAuth text="Sign In" providerName="google" />
                <OAuth text="Sign In" providerName="github" />
              </div>
              <div className="relative my-8 text-center after:absolute after:left-0 after:top-1/2 after:z-[0] after:w-full after:border-b after:border-border after:content-['']">
                <span className="relative z-[1] inline-block bg-white px-2">
                  Or Sign Up With Email
                </span>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name" className="form-label">
                    Name Address
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="form-control"
                    placeholder="Your Name"
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group mt-4">
                  <label htmlFor="email" className="form-label">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="form-control"
                    placeholder="Your Email Address"
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group mt-4">
                  <label htmlFor="role" className="form-label">
                    Role
                  </label>
                  <select
                    id="role"
                    className="form-control"
                    onChange={handleChange}
                  >
                    <option value="">Select a role</option>
                    <option value="student">Student</option>
                    <option value="tutor">Tutor</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <div className="form-group mt-4">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="form-control"
                    placeholder="Your Password"
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group mt-4">
                  <label htmlFor="c_password" className="form-label">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="c_password"
                    className="form-control"
                    placeholder="Confirm Password"
                    onChange={handleChange}
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
                  {loading ? 'Loading' : 'Sign Up'}
                </button>
                <p className="mt-6 text-center">
                  Already have an account?
                  <Link className="text-dark" to="/sign-in">
                    Sign In
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
