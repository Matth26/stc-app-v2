import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { logout, reset } from '../features/auth/authSlice';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  };

  return (
    <header className="flex items-center justify-between border-b h-16 mb-4">
      <NavLink className="mx-2 flex items-center text-slate-800" to="/charts">
        Structural Tension Chart App
      </NavLink>

      {user ? (
        <div className="flex space-x-6 text-slate-700">
          <NavLink to="/charts">{user.name}</NavLink>
          <button
            className="mx-2 flex items-center text-slate-800"
            onClick={onLogout}
          >
            <FaSignOutAlt className="mr-1" />
            Logout
          </button>
        </div>
      ) : (
        <div className="flex">
          <NavLink
            className="mx-2 flex items-center text-slate-800"
            to="/login"
          >
            <FaSignInAlt className="mr-1" />
            Login
          </NavLink>
          <NavLink
            className="mx-2 flex items-center text-slate-800"
            to="/register"
          >
            <FaUser className="mr-1" />
            Register
          </NavLink>
        </div>
      )}
    </header>
  );
};

export default Header;
