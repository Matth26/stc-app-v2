import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FaRegListAlt, FaChevronRight } from 'react-icons/fa';

import { useAppSelector, useAppDispatch } from '../hooks/reduxHooks';
import { getUserCharts, reset } from '../features/chart/chartSlice';

const ChartList = () => {
  const { isLoading, isSuccess, charts } = useAppSelector(
    (state) => state.chart
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      if (isSuccess) dispatch(reset());
    };
  }, [dispatch, isSuccess]);

  useEffect(() => {
    dispatch(getUserCharts());
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <section className="grid place-items-center mb-6">
        <h1 className="flex text-4xl text-slate-800 font-bold items-center mb-2">
          <FaRegListAlt className="mx-2" />
          Your charts
        </h1>
      </section>
      <section className="grid place-items-center w-3/4 mx-auto">
        {charts.map((chart) => {
          const link = `/charts/${chart._id.toString()}`;
          return (
            <div className="flex items-center space-x-4">
              <FaChevronRight className="text-slate-600 w-2" />
              <NavLink className="text-slate-700 text-xl" key={link} to={link}>
                Test
              </NavLink>
              <NavLink
                to={link}
                className="flex items-center justify-center my-1 bg-green-600 shadow-xl hover:bg-green-500 text-white tracking-wider rounded-md p-2"
              >
                Open
              </NavLink>
              <NavLink
                to={link + '/edit'}
                className="flex items-center justify-center my-1 bg-indigo-600 shadow-xl hover:bg-indigo-500 text-white tracking-wider rounded-md p-2"
              >
                Edit
              </NavLink>
              <NavLink
                to={link}
                className="flex items-center justify-center my-1 bg-red-600 shadow-xl hover:bg-red-500 text-white tracking-wider rounded-md p-2"
              >
                Delete
              </NavLink>
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default ChartList;
