import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header className="flex items-center justify-between border-b h-16 mb-4">
      <NavLink className="mx-2 flex items-center text-slate-800" to="/">
        Structural Tension Chart App
      </NavLink>
      <div className="flex">
        <NavLink className="mx-2 flex items-center text-slate-800" to="/login">
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
    </header>
  );
};

export default Header;
