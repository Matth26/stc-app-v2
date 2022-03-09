import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../hooks/reduxHooks';

const Home = () => {
  const { user } = useAppSelector((state) => state.auth);
  return (
    <div className="grid place-items-center">
      <h1 className="text-3xl text-slate-800 font-bold items-center mb-6">
        Welcome to the Structural Tension Chart App
      </h1>
      {!user ? (
        <h2 className="text-xl text-slate-500 font-bold items-center">
          Please log in to see your charts
        </h2>
      ) : (
        <NavLink
          to="/charts"
          className="flex items-center space-x-2 justify-center bg-indigo-600 shadow-xl hover:bg-indigo-500 text-white font-normal tracking-wider rounded-md p-2 w-36"
        >
          See my charts
        </NavLink>
      )}
    </div>
  );
};

export default Home;
