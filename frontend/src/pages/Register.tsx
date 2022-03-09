import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaUser } from 'react-icons/fa';

import { useAppSelector, useAppDispatch } from '../hooks/reduxHooks';
import { register, reset } from '../features/auth/authSlice';
import Loader from '../components/Loader';

interface RegisterForm {
  name: string;
  email: string;
  password: string;
  password2: string;
}

const styles = {
  placeholder: `mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 
  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
  disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
  invalid:border-pink-500 invalid:text-pink-600
  focus:invalid:border-pink-500 focus:invalid:ring-pink-500`,
};

const Register = () => {
  const [formData, setFormData] = useState<RegisterForm>({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isSuccess, isError, message } = useAppSelector(
    (state) => state.auth
  );

  const { name, email, password, password2 } = formData;

  useEffect(() => {
    if (isError) toast.error(message);

    // Redirect when registered
    if (isSuccess || user) navigate('/');

    dispatch(reset());
  }, [isError, isSuccess, user, message, navigate, dispatch]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== password2) {
      toast.error('Passwords do not match');
    } else {
      const userData = { name, email, password };
      dispatch(register(userData));
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <section className="grid place-items-center mb-6">
        <h1 className="flex text-4xl text-slate-800 font-bold items-center mb-2">
          <FaUser className="mx-2" />
          Register
        </h1>
        <p className="text-2xl text-slate-700">Please create an Account</p>
      </section>
      <section className="grid place-items-center">
        <form onSubmit={onSubmit} className="w-96">
          <label className="block mb-4">
            <span className="block text-sm font-medium text-slate-700">
              Name
            </span>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={onChange}
              placeholder="Enter your name"
              className={styles.placeholder}
            ></input>
          </label>
          <label className="block mb-4">
            <span className="block text-sm font-medium text-slate-700">
              Email
            </span>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={onChange}
              placeholder="Enter your email"
              className={styles.placeholder}
            ></input>
          </label>
          <label className="block mb-2">
            <span className="block text-sm font-medium text-slate-700">
              Password
            </span>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={onChange}
              placeholder="Enter your password"
              className={styles.placeholder}
            ></input>
          </label>
          <label className="block mb-6">
            <input
              type="password"
              id="password2"
              name="password2"
              value={password2}
              onChange={onChange}
              placeholder="Confirm password"
              className={styles.placeholder}
            ></input>
          </label>
          <label className="text-center w-96">
            <button
              id="button"
              type="submit"
              className="flex items-center justify-center bg-indigo-600 shadow-xl hover:bg-indigo-500 text-white font-bold tracking-wider rounded-md p-2 w-full"
            >
              <svg
                className="hidden animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Submit
            </button>
          </label>
        </form>
      </section>
    </div>
  );
};

export default Register;
