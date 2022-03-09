import 'react-day-picker/lib/style.css';
import { FaChevronRight } from 'react-icons/fa';

import { useAppSelector } from '../hooks/reduxHooks';
import Loader from '../components/Loader';

const ReadChart = () => {
  const { chart } = useAppSelector((state) => state.chart);

  console.log(chart);

  if (!chart) {
    return <Loader />;
  } else
    return (
      <div className=" grid place-items-center">
        <div className="border rounded-md p-6 px-8 w-3/4">
          <div className="flex justify-center">
            <h1 className="mb-6 text-3xl font-bold text-slate-800">
              {chart.name}
            </h1>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-medium text-slate-700 mb-2">Goal</h2>
            <div className="ml-4 text-slate-600">
              {chart.goal.split('\n').map((p: string, index: number) => (
                <p key={index} className="m-0">
                  {p}
                </p>
              ))}
            </div>
          </div>
          <div className="mb-6">
            <h2 className="text-xl font-medium text-slate-700">Steps</h2>
            {chart.steps.map((s, index) => (
              <div
                key={index}
                className="ml-8 flex space-x-4 items-center mt-2"
              >
                <FaChevronRight className="w-2 text-slate-600" />
                <div className="text-sm text-slate-600 px-3 py-2">
                  {s.date.toISOString().slice(0, 10).replaceAll('-', '/')}
                </div>
                <span className="text-slate-600">{s.text}</span>
              </div>
            ))}
          </div>
          <div className="mb-8">
            <h2 className="text-xl font-medium text-slate-700 mb-2">Current</h2>
            <div className="ml-4 text-slate-600">
              {chart.current.split('\n').map((p: string, index: number) => (
                <p key={index} className="m-0">
                  {p}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
};

export default ReadChart;
