import { useState, useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { FaRegListAlt, FaChevronLeft, FaPen, FaSave } from 'react-icons/fa';

import { useAppSelector, useAppDispatch } from '../hooks/reduxHooks';

import { getChart, updateChart } from '../features/chart/chartSlice';

import Loader from '../components/Loader';
import EditChart from '../components/EditChart';
import ReadChart from '../components/ReadChart';

const ChartList = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const { isLoading, chart } = useAppSelector((state) => state.chart);

  const [mode, setMode] = useState<'read' | 'edit'>('read');

  /*useEffect(() => {
    return () => {
      if (isSuccess) dispatch(reset());
    };
  });*/

  useEffect(() => {
    if (id) dispatch(getChart(id));
  }, [dispatch, id]);

  if (!id) return <div>Error: missing id</div>;
  else if (!chart) return <div>Chart not found</div>;
  else if (isLoading) return <Loader />;
  else
    return (
      <div>
        <div className="grid place-items-center mb-6">
          <div className="flex items-center justify-between w-full">
            <NavLink
              to="/new-chart"
              className="w-24 flex items-center space-x-2 justify-center bg-slate-600 shadow-xl hover:bg-indigo-500 text-white font-bold tracking-wider rounded-md p-2 "
            >
              <FaChevronLeft />
              <span>Back</span>
            </NavLink>
            <h1 className="flex text-4xl text-slate-800 font-bold items-center">
              <FaRegListAlt className="mx-2" />
              Chart
            </h1>
            <button
              onClick={() => {
                if (mode === 'edit')
                  // let's save
                  dispatch(
                    updateChart({
                      _id: chart._id,
                      name: chart.name,
                      current: chart.current,
                      goal: chart.goal,
                      steps: chart.steps,
                    })
                  );
                mode === 'read' ? setMode('edit') : setMode('read');
              }}
              className="w-24 flex items-center space-x-2 justify-center bg-green-600 shadow-xl hover:bg-green-500 text-white font-bold tracking-wider rounded-md p-2 "
            >
              {mode === 'read' ? <FaPen /> : <FaSave />}
              {mode === 'read' ? <span>Edit</span> : <span>Save</span>}
            </button>
          </div>
        </div>

        {mode === 'read' ? <ReadChart /> : <EditChart />}
      </div>
    );
};

export default ChartList;
