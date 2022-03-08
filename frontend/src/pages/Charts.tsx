import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FaRegListAlt, FaChevronRight, FaPlusCircle } from 'react-icons/fa';

import { useAppSelector, useAppDispatch } from '../hooks/reduxHooks';
import { getUserCharts } from '../features/chart/chartSlice';

const ChartList = () => {
  const { isLoading, charts } = useAppSelector((state) => state.chart);

  const dispatch = useAppDispatch();

  /*useEffect(() => {
    return () => {
      console.log('onComponentUnmount');
      console.log(isSuccess);
      if (isSuccess) {
        console.log('dispatch(reset()');
        dispatch(reset());
      }
    };
  }, [dispatch, isSuccess]);*/

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
      <section className="grid place-items-left w-3/4 mx-auto mb-8">
        {charts.map((chart) => {
          const link = `/charts/${chart._id.toString()}`;
          return (
            <div
              key={chart._id.toString()}
              className="flex items-center justify-between space-x-4"
            >
              <div className="flex items-center space-x-4">
                <FaChevronRight className="text-slate-600 w-2" />
                <NavLink
                  className="text-slate-700 text-xl"
                  key={link}
                  to={link}
                >
                  {chart.name}
                </NavLink>
              </div>

              <div className="flex items-center space-x-4">
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
                <button
                  onClick={() => console.log(`delete ${chart._id}`)}
                  className="flex items-center justify-center my-1 bg-red-600 shadow-xl hover:bg-red-500 text-white tracking-wider rounded-md p-2"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </section>
      <section className="grid place-items-end mb-6  w-10/12 mx-auto">
        <NavLink
          to="/new-chart"
          className="flex items-center space-x-4 justify-center bg-indigo-600 shadow-xl hover:bg-indigo-500 text-white font-bold tracking-wider rounded-md p-2 w-48"
        >
          <FaPlusCircle />
          <span>Add New Chart</span>
        </NavLink>
      </section>
    </div>
  );
};

export default ChartList;
