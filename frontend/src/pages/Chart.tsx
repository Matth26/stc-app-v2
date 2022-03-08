import { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import {
  FaRegListAlt,
  FaChevronLeft,
  FaPen,
  FaChevronRight,
  FaTrash,
  FaPlusCircle,
} from 'react-icons/fa';

import { useAppSelector, useAppDispatch } from '../hooks/reduxHooks';
import {
  getChart,
  reset,
  updateChartCurrent,
  updateChartGoal,
  updateChartName,
  updateChart,
  addStepToChart,
  removeStepToChart,
  updateStepText,
  updateStepDate,
} from '../features/chart/chartSlice';

const styles = {
  placeholder: `mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 
  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
  disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
  invalid:border-pink-500 invalid:text-pink-600
  focus:invalid:border-pink-500 focus:invalid:ring-pink-500`,
};

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
    if (id) dispatch(getChart(id));
  }, [dispatch, id]);

  // New step
  const [newStepDate, setNewStepDate] = useState<Date>(new Date());
  const [newStepText, setNewStepText] = useState<string>('');

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (chart) {
      const { _id, name, current, goal, steps } = chart;
      dispatch(updateChart({ _id, name, goal, current, steps }));
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  } else if (!chart) {
    return <div>Chart not found</div>;
  }

  return (
    <div>
      <section className="grid place-items-center mb-6">
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
          <NavLink
            to="/new-chart"
            className="w-24 flex items-center space-x-2 justify-center bg-slate-600 shadow-xl hover:bg-indigo-500 text-white font-bold tracking-wider rounded-md p-2 "
          >
            <FaPen />
            <span>Edit</span>
          </NavLink>
        </div>
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
              value={chart.name}
              onChange={(e) => dispatch(updateChartName(e.target.value))}
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
              value={chart.goal}
              onChange={(e) => dispatch(updateChartGoal(e.target.value))}
              placeholder="Enter your goal"
              className={styles.placeholder}
            ></textarea>
          </label>

          <label className="block mb-6">
            <span className="block text-sm font-medium text-slate-700">
              Steps
            </span>
            {chart.steps.map((s, index) => (
              <div key={index} className="flex space-x-2 items-center mt-2">
                <FaChevronRight className="text-slate-600" />
                <div className="border border-slate-300 rounded-md text-sm px-3 py-2 w-48">
                  <DayPickerInput
                    value={s.date}
                    onDayChange={(day) =>
                      dispatch(updateStepDate({ index, newDate: day }))
                    }
                  />
                </div>
                <input
                  type="text"
                  id={`step_${index}`}
                  name={`step_${index}`}
                  value={s.text}
                  onChange={(e) => {
                    e.preventDefault();
                    dispatch(
                      updateStepText({ index, newText: e.target.value })
                    );
                  }}
                  className={styles.placeholder + ' mt-0'}
                />
                <button
                  id="button"
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(removeStepToChart({ index }));
                  }}
                  className="flex items-center justify-center bg-slate-500 shadow-xl hover:bg-red-500 text-white space-x-2 tracking-wider rounded-full p-2"
                >
                  <FaTrash />
                </button>
              </div>
            ))}
            <div className="flex space-x-2 items-center mt-2">
              <FaChevronRight className="text-slate-600" />
              <div className="border border-slate-300 rounded-md text-sm px-3 py-2 w-48">
                <DayPickerInput
                  value={newStepDate}
                  onDayChange={(day) => setNewStepDate(day)}
                />
              </div>
              <input
                type="text"
                id="step"
                name="step"
                value={newStepText}
                onChange={(e) => setNewStepText(e.target.value)}
                placeholder="Enter the step text"
                className={styles.placeholder + ' mt-0'}
              ></input>
              <button
                id="button"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(
                    addStepToChart({ date: newStepDate, text: newStepText })
                  );
                  setNewStepDate(new Date());
                  setNewStepText('');
                }}
                className="flex items-center justify-center bg-indigo-600 shadow-xl hover:bg-indigo-500 text-white space-x-2 tracking-wider rounded-md py-1.5 w-52"
              >
                <FaPlusCircle />
                <span>Add Step</span>
              </button>
            </div>
          </label>

          <label className="block mb-6">
            <span className="block text-sm font-medium text-slate-700">
              Current
            </span>
            <textarea
              id="current"
              name="current"
              value={chart.current}
              onChange={(e) => dispatch(updateChartCurrent(e.target.value))}
              placeholder="Enter your current reality"
              className={styles.placeholder}
            ></textarea>
          </label>
          <label className="flex justify-end">
            <button
              id="button"
              type="submit"
              className="flex items-center justify-center bg-green-600 shadow-xl hover:bg-green-500 text-white font-bold tracking-wider rounded-md p-2 w-32"
            >
              Save
            </button>
          </label>
        </form>
      </section>
    </div>
  );
};

export default ChartList;
