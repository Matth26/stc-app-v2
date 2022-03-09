import { useState } from 'react';
import { FaChevronRight, FaTrash, FaPlus } from 'react-icons/fa';

import DayPickerInput from 'react-day-picker/DayPickerInput';
import { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import dateFnsFormat from 'date-fns/format';
import dateFnsParse from 'date-fns/parse';

import { useAppSelector, useAppDispatch } from '../hooks/reduxHooks';
import {
  updateChartCurrent,
  updateChartGoal,
  updateChartName,
  updateChart,
  addStepToChart,
  removeStepToChart,
  updateStepText,
} from '../features/chart/chartSlice';
import Loader from '../components/Loader';

function parseDate(str: string, format: any, locale: any) {
  const parsed = dateFnsParse(str, format, new Date(), { locale });
  if (DateUtils.isDate(parsed)) {
    return parsed;
  }
  return undefined;
}

function formatDate(date: Date, format: any, locale: any) {
  return dateFnsFormat(date, format, { locale });
}

const styles = {
  placeholder: `mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 
  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
  disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
  invalid:border-pink-500 invalid:text-pink-600
  focus:invalid:border-pink-500 focus:invalid:ring-pink-500`,
};

const EditChart = () => {
  const { chart } = useAppSelector((state) => state.chart);

  const dispatch = useAppDispatch();

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

  if (!chart) {
    return <Loader />;
  } else
    return (
      <div className="grid place-items-center">
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

          <div className=" mb-6">
            <span className="block text-sm font-medium text-slate-700">
              Steps
            </span>
            <div className="ml-2">
              {chart.steps.map((s, index) => (
                <div key={index} className="flex space-x-2 items-center mt-2">
                  <FaChevronRight className="text-slate-600" />
                  <div className="border border-slate-300 rounded-md text-sm px-3 py-2 w-48">
                    <DayPickerInput
                      value={s.date}
                      onDayChange={(day) => setNewStepDate(day)}
                      formatDate={formatDate}
                      format={'dd/MM/yyyy'}
                      parseDate={parseDate}
                      keepFocus={false}
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
                    formatDate={formatDate}
                    format={'dd/MM/yyyy'}
                    parseDate={parseDate}
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
                  className="flex items-center justify-center bg-indigo-600 shadow-xl hover:bg-indigo-500 text-white space-x-2 tracking-wider rounded-full p-2"
                >
                  <FaPlus />
                </button>
              </div>
            </div>
          </div>

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
        </form>
      </div>
    );
};

export default EditChart;
