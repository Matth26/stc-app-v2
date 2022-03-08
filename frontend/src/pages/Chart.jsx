import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaRegListAlt } from 'react-icons/fa';

import { useAppSelector, useAppDispatch } from '../hooks/reduxHooks';
import { getChart, reset } from '../features/chart/chartSlice';

const ChartList = () => {
  const { id } = useParams();

  const { isLoading, isSuccess, chart } = useAppSelector(
    (state) => state.chart
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      if (isSuccess) dispatch(reset());
    };
  }, [dispatch, isSuccess]);

  useEffect(() => {
    dispatch(getChart(id));
  }, [dispatch, id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <section className="grid place-items-center mb-6">
        <h1 className="flex text-4xl text-slate-800 font-bold items-center mb-2">
          <FaRegListAlt className="mx-2" />
          Chart
        </h1>
      </section>
      <section className="grid place-items-center w-3/4 mx-auto">
        <div className="flex space-x-4">
          <h2>Name</h2> <div>{chart.name}</div>
        </div>
        <div className="flex space-x-4">
          <h2>Goal</h2> <div>{chart.goal}</div>
        </div>
        <div className="flex space-x-4">
          <h2>Current</h2> <div>{chart.current}</div>
        </div>
        <div className="">
          <h2>Steps</h2>
          <div>
            {chart?.steps ? (
              chart.steps.map((s) => (
                <div key={s._id} className="flex space-x-4">
                  <span>{s.text}</span>
                  <span>{s.date}</span>
                </div>
              ))
            ) : (
              <></>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ChartList;
