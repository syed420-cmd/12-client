import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

const PrivateRoute = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { pathname } = useLocation();
  if (currentUser && !pathname.startsWith(`/${currentUser.role}`)) {
    return toast.error('You are not authorized!');
  }
  return currentUser ? <Outlet /> : <Navigate to="/sign-in" />;
};

export default PrivateRoute;
