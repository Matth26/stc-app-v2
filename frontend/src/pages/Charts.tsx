import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import {
  FaRegListAlt,
  FaChevronRight,
  FaPlusCircle,
  FaTrash,
  FaRegFile,
} from 'react-icons/fa';

import { useAppSelector, useAppDispatch } from '../hooks/reduxHooks';
import { deleteChart, getUserCharts } from '../features/chart/chartSlice';

import Loader from '../components/Loader';

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
    return <Loader />;
  }

  return (
    <div className="w-4/5 mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div className="w-36"></div>
        <h1 className="flex text-4xl text-slate-800 font-bold items-center">
          <FaRegListAlt className="mx-2" />
          Your charts
        </h1>
        <NavLink
          to="/new-chart"
          className="flex items-center space-x-2 justify-center bg-indigo-600 shadow-xl hover:bg-indigo-500 text-white font-normal tracking-wider rounded-md p-2 w-36"
        >
          <FaPlusCircle />
          <span>Add New</span>
        </NavLink>
      </div>
      {charts.length > 0 ? (
        <div className="border rounded-md p-8 grid place-items-left w-3/4 mx-auto mb-8">
          {charts.map((chart) => {
            const id = chart._id.toString();
            const link = `/charts/${id}`;
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
                    className="flex items-center justify-center my-1 bg-indigo-600 shadow-xl hover:bg-indigo-500 text-white tracking-wider rounded-full p-2"
                  >
                    <FaRegFile />
                  </NavLink>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      dispatch(deleteChart(id));
                    }}
                    className="flex items-center justify-center my-1 bg-red-600 shadow-xl hover:bg-red-500 text-white tracking-wider rounded-full p-2"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

export default ChartList;
