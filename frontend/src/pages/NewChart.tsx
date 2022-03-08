import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaRegListAlt } from 'react-icons/fa';
import { useAppSelector, useAppDispatch } from '../hooks/reduxHooks';
import { createChart, reset } from '../features/chart/chartSlice';

interface ChartForm {
  name: string;
  goal: string;
  current: string;
}

const styles = {
  placeholder: `mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 
  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
  disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
  invalid:border-pink-500 invalid:text-pink-600
  focus:invalid:border-pink-500 focus:invalid:ring-pink-500`,
};

const NewChart = () => {
  const { isLoading, isError, isSuccess, message } = useAppSelector(
    (state) => state.chart
  );

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      dispatch(reset());
      navigate('/charts');
    }

    dispatch(reset());
  }, [dispatch, isError, isSuccess, navigate, message]);

  const [chartData, setChartData] = useState<ChartForm>({
    name: '',
    goal: '',
    current: '',
  });

  const { name, goal, current } = chartData;

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(createChart({ name, goal, current }));
  };

  const onChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setChartData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <section className="grid place-items-center mb-6">
        <h1 className="flex text-4xl text-slate-800 font-bold items-center mb-2">
          <FaRegListAlt className="mx-2" />
          Create new Chart
        </h1>
      </section>
      <section className="grid place-items-center">
        <form onSubmit={onSubmit} className="w-3/4">
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
              placeholder="Enter the name of the chart"
              className={styles.placeholder}
            ></input>
          </label>
          <label className="block mb-6">
            <span className="block text-sm font-medium text-slate-700">
              Goal
            </span>
            <textarea
              id="goal"
              name="goal"
              value={goal}
              onChange={onChange}
              placeholder="Enter your goal"
              className={styles.placeholder}
            ></textarea>
          </label>
          <label className="block mb-6">
            <span className="block text-sm font-medium text-slate-700">
              Current
            </span>
            <textarea
              id="current"
              name="current"
              value={current}
              onChange={onChange}
              placeholder="Enter your current reality"
              className={styles.placeholder}
            ></textarea>
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

export default NewChart;
