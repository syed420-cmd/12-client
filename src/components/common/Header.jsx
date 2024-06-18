import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { signoutSuccess } from '../../redux/user/userSlice';
const Header = () => {
  const { pathname } = useLocation();
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSignOut = async () => {
    try {
      localStorage.removeItem('token');
      dispatch(signoutSuccess());
      toast.success('Sign out successfully');
      window.location.href = '/';
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Something went wrong');
      console.log('error', error);
    }
  };

  useEffect(() => {
    if (!currentUser) {
      navigate('/');
    }
  }, [currentUser]);

  return (
    <header className="header">
      <nav className="navbar container">
        {/* logo */}
        <div className="order-0">
          <Link to="/">
            {/* <img src="images/logo.svg" height="30" width="147" alt="logo" /> */}
            <h1 className="text-2xl font-bold">StudyPortal</h1>
          </Link>
        </div>
        {/* navbar toggler */}
        <input id="nav-toggle" type="checkbox" className="hidden" />
        <label
          id="show-button"
          htmlFor="nav-toggle"
          className="order-1 flex cursor-pointer items-center lg:order-1 lg:hidden"
        >
          <svg className="h-6 fill-current" viewBox="0 0 20 20">
            <title>Menu Open</title>
            <path d="M0 3h20v2H0V3z m0 6h20v2H0V9z m0 6h20v2H0V0z" />
          </svg>
        </label>
        <label
          id="hide-button"
          htmlFor="nav-toggle"
          className="order-2 hidden cursor-pointer items-center lg:order-1"
        >
          <svg className="h-6 fill-current" viewBox="0 0 20 20">
            <title>Menu Close</title>
            <polygon
              points="11 9 22 9 22 11 11 11 11 22 9 22 9 11 -2 11 -2 9 9 9 9 -2 11 -2"
              transform="rotate(45 10 10)"
            />
          </svg>
        </label>
        {/* /navbar toggler */}
        <ul
          id="nav-menu"
          className="navbar-nav order-2 hidden w-full flex-[0_0_100%] lg:order-1 lg:flex lg:w-auto lg:flex-auto lg:justify-center lg:space-x-5"
        >
          <li className="nav-item">
            <Link
              to="/"
              className={`nav-link ${pathname === '/' ? 'active' : ''}`}
            >
              Home
            </Link>
          </li>
          {!currentUser && (
            <>
              <li className="nav-item">
                <Link
                  to="/sign-in"
                  className={`nav-link ${pathname === '/sign-in' ? 'active' : ''}`}
                >
                  SIgn In
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/sign-up"
                  className={`nav-link ${pathname === '/sign-up' ? 'active' : ''}`}
                >
                  Sign Up
                </Link>
              </li>
            </>
          )}
          {currentUser && (
            <>
              <li className="nav-item">
                <Link
                  to={`/${currentUser.role}/dashboard`}
                  className={`nav-link ${pathname === '/my-profile' ? 'active' : ''}`}
                >
                  Dashboard
                </Link>
              </li>
              <li className="nav-item cursor-pointer">
                <a className={`nav-link `} onClick={handleSignOut}>
                  Sign Out
                </a>
              </li>
            </>
          )}
          <li className="nav-item">
            <Link
              to="/announcement"
              className={`nav-link ${pathname === '/announcement' ? 'active' : ''}`}
            >
              Announcement
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
